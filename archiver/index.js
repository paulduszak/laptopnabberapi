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

  products.forEach(product => {
    queries.push(Laptop
      .update(
        {sku: product.sku},
        {$setOnInsert: {
          manufacturer: product.manufacturer,
          name: product.name,
          modelNumber: product.modelNumber,
          sku: product.sku,
          details: product.details,
          color: product.color,
          thumbnailImage: product.thumbnailImage,
          image: product.image
        }},
        {upsert: true}).exec());

    queries.push(LaptopPricing
      .findOneAndUpdate(
        { sku: product.sku },
        {
          $set: {
            sku: product.sku,
            BB_regularPriceDayAvg: product.regularPrice,
            BB_salePriceDayAvg: product.salePrice
          },
          $push: {
            BB_regularPriceHours: product.regularPrice,
            BB_salePriceHours: product.salePrice
          }
        }, 
        {
          upsert: true,
          setDefaultsOnInsert: true
        }).exec());
  });
  
  return queries;
}

walkBBAPI()
.then(result => Promise.all(updateBBDB(result)))
.then((() => {process.exit()}))