const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

const laptopApi = require('./laptops');

app.use('/api/laptops', laptopApi);

app.listen(port, () => console.log('Listening on port ${port}'));