const dotenv = require('dotenv');
const mongoose = require('mongoose');
const axios = require('axios');
const Laptop = require('./models/Laptop');
const LaptopPricing = require('./models/LaptopPricing')
const Parsers = require('./parsers')

dotenv.load({ path: '../.env.local' });

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('error', (err) => {
  console.error(err);
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  process.exit();
});

const walkBBAPI = (cursor = '*') =>
  Parsers.bestbuy(cursor)
    .then(data => {
      if (data.products.length) {
        return walkBBAPI(data.nextCursorMark)
          .then(nextData => data.products.concat(nextData)).catch(err => console.error(err));
      } else {
        return data.products;
      }
    }).catch(err => console.error(err));

const updateBBDB = (products) => {
  let queries = [];
  for (key in products) {
    
    queries.push(Laptop
      .update(
        {sku: products[key].sku},
        {$setOnInsert: {
          manufacturer: products[key].manufacturer,
          name: products[key].name,
          modelNumber: products[key].modelNumber,
          sku: products[key].sku,
          details: products[key].details,
          color: products[key].color,
          thumbnailImage: products[key].thumbnailImage,
          image: products[key].image
        }},
        {upsert: true}).exec());

    queries.push(LaptopPricing
      .findOneAndUpdate(
        { sku: products[key].sku },
        {
          $set: {
            sku: products[key].sku,
            BB_regularPriceDayAvg: products[key].regularPrice,
            BB_salePriceDayAvg: products[key].salePrice
          },
          $push: {
            BB_regularPriceHours: products[key].regularPrice,
            BB_salePriceHours: products[key].salePrice
          }
        }, 
        {
          upsert: true,
          setDefaultsOnInsert: true
        }).exec());
  }
  return queries;
}

walkBBAPI()
.then(result => Promise.all(updateBBDB(result)))
.then((() => {process.exit()}))