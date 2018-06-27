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

var currPage = 1;

var successCallback = function(data, pageCount) {
	//console.log(data);
  for (key in data.products) {

    let laptop = new Laptop({
      manufacturer: data.products[key].manufacturer,
      name: data.products[key].name,
      modelNumber: data.products[key].modelNumber,
      sku: data.products[key].sku,
      details: data.products[key].details,
      color: data.products[key].color,
      thumbnailImage: data.products[key].thumbnailImage,
      image: data.products[key].image
    });

    let currentHour = new Date().getHours();

    let laptopPrice = new LaptopPricing({
      sku: data.products[key].sku,
      regularPrice: data.products[key].regularPrice,
      salePrice: data.products[key].salePrice,
      BB_regularPrice_hour: { currentHour : data.products[key].regularPrice },
      BB_salePrice_hour: { currentHour : data.products[key].salePrice }
    });

    laptop.save(function(err, laptop){
      if (err) return console.error(err);
    });

    LaptopPricing.findOneAndUpdate(
      { sku: data.products[key].sku },
      {
        $set: {
          sku: data.products[key].sku,
          BB_regularPriceDayAvg: data.products[key].regularPrice,
          BB_salePriceDayAvg: data.products[key].salePrice
        },
        $push: {
          BB_regularPriceHours: data.products[key].regularPrice,
          BB_salePriceHours: data.products[key].salePrice
        }
      }, 
      {
        upsert: true,
        setDefaultsOnInsert: true
      },
      function (err, doc) {
        if (err) return console.error(err);
        
      }
    );
  }

  if(data.products.length >= pageCount){
    Parsers.bestbuy(data.nextCursorMark, pageCount, successCallback);
  } else {
    process.exit();
  }
  
  // return {
	// 	'nextPage': data.nextCursorMark,
	// 	'totalPages': data.totalPages
	// }
}


Parsers.bestbuy('*', 20, successCallback);
