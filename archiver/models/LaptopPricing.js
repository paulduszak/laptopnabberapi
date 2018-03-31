const mongoose = require('mongoose');

const laptopPricingSchema = new mongoose.Schema({
    modelNumber: { type: String },
    regularPrice: { type: Number },
    salePrice: { type: Number },
    percentSavings: { type: Number },
    timestamp_day: { type: Date },
    values_hour: { type: [Number] }
});

const LaptopPricing = mongoose.model('LaptopPricing', laptopPricingSchema);

module.exports = LaptopPricing;