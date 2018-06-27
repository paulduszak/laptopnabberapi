const bby = require('bestbuy')('***REMOVED***');

const Parsers = {
    bestbuy: (offset, pageCount) => {
		return new Promise((resolve, reject) => {
			bby.products('condition=\"new\"&(categoryPath.id=abcat0502000)', {format: 'json', pageSize: pageCount, cursorMark: offset, show:'manufacturer,name,modelNumber,details.value,color,thumbnailImage,image,regularPrice,salePrice,sku'}, function(err, data) {
				if (err) {
					reject(err);
				}
				else {
					
					return resolve(data, pageCount);
				}
			});
		});
    } 
}

module.exports = Parsers;