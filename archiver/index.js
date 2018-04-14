const dotenv = require('dotenv');
const mongoose = require('mongoose');
const axios = require('axios');
const Laptop = require('./models/Laptop');

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

      var laptop = new Laptop({
        manufacturer: res.data.products[key].manufacturer,
        name: res.data.products[key].name,
        modelNumber: res.data.products[key].modelNumber,
        details: res.data.products[key].details,
        color: res.data.products[key].color,
        thumbnailImage: res.data.products[key].thumbnailImage,
        image: res.data.products[key].image
      });

      laptop.save(function(err, laptop){
        if (err) return console.error(err);
        console.log(laptop.name);
      });
    }

    if (currPage < res.data.totalPages) {
      currPage += 1;
      queryBB(res.data.nextCursorMark);
    }
  }); 
}

queryBB('*');