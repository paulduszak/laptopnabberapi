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
    .then((data) => {
      if (data.products.length) {
        return walkBBAPI(data.nextCursorMark)
          .then(nextData => data.products.concat(nextData)).catch(err => console.error(err));
      } else {
        return data.products;
      }

    }).catch(err => console.error(err));

      // for (key in data.products) {
      //   //console.log(data)
      //   let laptop = new Laptop({
      //     manufacturer: data.products[key].manufacturer,
      //     name: data.products[key].name,
      //     modelNumber: data.products[key].modelNumber,
      //     sku: data.products[key].sku,
      //     details: data.products[key].details,
      //     color: data.products[key].color,
      //     thumbnailImage: data.products[key].thumbnailImage,
      //     image: data.products[key].image
      //   });
        
      //   Laptop
      //     .update(
      //       {sku: data.products[key].sku},
      //       {$setOnInsert: laptop},
      //       {upsert: true})
      //     .then((doc) => {})
      //     .catch((err) => {
      //       return console.err(err);
      //     })
    
      //   LaptopPricing
      //     .findOneAndUpdate(
      //       { sku: data.products[key].sku },
      //       {
      //         $set: {
      //           sku: data.products[key].sku,
      //           BB_regularPriceDayAvg: data.products[key].regularPrice,
      //           BB_salePriceDayAvg: data.products[key].salePrice
      //         },
      //         $push: {
      //           BB_regularPriceHours: data.products[key].regularPrice,
      //           BB_salePriceHours: data.products[key].salePrice
      //         }
      //       }, 
      //       {
      //         upsert: true,
      //         setDefaultsOnInsert: true
      //       })
      //     .then((doc) => {})
      //     .catch((err) => {
      //       return console.error(err);
      //     })
      // }

      // if(data.products.length != 0){
      //   console.log(data.products.length)
      //   return walkBBAPI(data.nextCursorMark, 20);
      // }

    //});


walkBBAPI()
  .then(result => {
    console.log(result.length)
    process.exit()
  })