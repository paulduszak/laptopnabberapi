const mongoose = require('mongoose');
const DateOnly = require('mongoose-dateonly')(mongoose);

const laptopPricingSchema = new mongoose.Schema({
    sku: {type: String, required: true },
    date: { type: DateOnly },
    BB_regularPriceDay: { type: Number, required: true },
    BB_salePriceDay: { type: Number, required: true },
    BB_regularPriceHours: [ Number ],
    BB_salePriceHours: [ Number ]
});

laptopPricingSchema.index({ sku: 1, date: 1 }, { unique: true });

const LaptopPricing = mongoose.model('LaptopPricing', laptopPricingSchema);

module.exports = LaptopPricing;