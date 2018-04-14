const dotenv = require('dotenv');
const mongoose = require('mongoose');
const axios = require('axios');

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
    console.log(res.data.products);
    if (currPage < res.data.totalPages) {
      currPage += 1;
      queryBB(res.data.nextCursorMark);
    }
  }); 
}

queryBB('*');