const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

const bestbuyApi = require('./bestbuy');

app.use('/api/bestbuy', bestbuyApi);

app.get('/api/hello', (req, res) => {
    res.send({ express: 'Hello from express.' });
});

app.listen(port, () => console.log('Listening on port ${port}'));