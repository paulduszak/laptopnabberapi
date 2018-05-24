const dotenv = require('dotenv');
const mongoose = require('mongoose');
const axios = require('axios');
const Laptop = require('./models/Laptop');
const LaptopPricing = require('./models/LaptopPricing')

dotenv.load({ path: '../.env.local' });

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('error', (err) => {
  console.error(err);
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  process.exit();
});

var currPage = 1;

function queryBB(pageIn) {

  axios.get('http://localhost:3000/api/bestbuy', {
    params: {
        page: pageIn,
        pageSize: 20
    }
  })
  .then((res) => {

    for (key in res.data.products) {

      let laptop = new Laptop({
        manufacturer: res.data.products[key].manufacturer,
        name: res.data.products[key].name,
        modelNumber: res.data.products[key].modelNumber,
        sku: res.data.products[key].sku,
        details: res.data.products[key].details,
        color: res.data.products[key].color,
        thumbnailImage: res.data.products[key].thumbnailImage,
        image: res.data.products[key].image
      });

      let currentHour = new Date().getHours();

      let laptopPrice = new LaptopPricing({
        sku: res.data.products[key].sku,
        regularPrice: res.data.products[key].regularPrice,
        salePrice: res.data.products[key].salePrice,
        BB_regularPrice_hour: { currentHour : res.data.products[key].regularPrice },
        BB_salePrice_hour: { currentHour : res.data.products[key].salePrice }
      });

      laptop.save(function(err, laptop){
        if (err) return console.error(err);
      });

      LaptopPricing.findOneAndUpdate(
        { sku: res.data.products[key].sku },
        {
          $set: {
            sku: res.data.products[key].sku,
            BB_regularPriceDayAvg: res.data.products[key].regularPrice,
            BB_salePriceDayAvg: res.data.products[key].salePrice
          },
          $push: {
            BB_regularPriceHours: res.data.products[key].regularPrice,
            BB_salePriceHours: res.data.products[key].salePrice
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

    if (currPage < res.data.totalPages) {
      currPage += 1;
      queryBB(res.data.nextCursorMark);
    }
  }); 
}

queryBB('*');