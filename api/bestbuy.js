const express = require('express');
const router = express.Router();

var bby = require('bestbuy')('***REMOVED***');

router.get('/', function(req, res) {
    bby.products('(categoryPath.id=abcat0502000)', {show: 'name', format: 'json', pageSize: 10}, function(err, data) {
        if (err) console.warn(err);
        else if (data.total === 0) res.send('No products found');
        else res.json(data);
    });
});

module.exports = router;
