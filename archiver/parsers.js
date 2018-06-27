const bby = require('bestbuy')('***REMOVED***');

const Parsers = {
    bestbuy: function(offset, pageCount, callback) {
        bby.products('condition=\"new\"&(categoryPath.id=abcat0502000)', {format: 'json', pageSize: pageCount, cursorMark: offset, show:'manufacturer,name,modelNumber,details.value,color,thumbnailImage,image,regularPrice,salePrice,sku'}, function(err, data) {
            if (err) {
				console.warn(err);
				return err;
			}
            else if (data.total === 0) {
				console.warn('No products found.');
				return 'No products found.';
			}
            else {
				
				return callback(data, pageCount);
			}
        });
    } 
}

module.exports = Parsers;