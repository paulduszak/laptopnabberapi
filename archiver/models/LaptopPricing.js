const mongoose = require('mongoose');

const laptopPricingSchema = new mongoose.Schema({
    sku: {type: String, unique: true},
    timestampDay: { type: Date, default: new Date() },
    BB_regularPriceDayAvg: { type: Number },
    BB_salePriceDayAvg: { type: Number },
    BB_regularPriceHours: [ Number ],
    BB_salePriceHours: [ Number ]
});

const LaptopPricing = mongoose.model('LaptopPricing', laptopPricingSchema);

module.exports = LaptopPricing;