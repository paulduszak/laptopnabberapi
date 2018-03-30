const mongoose = require('mongoose');

const laptopSchema = new mongoose.Schema({
    manufacturer: { type: String },
    name: { type: String },
    modelNumber: { type: String, unqiue: true },
    details: { type: Object },
    color: { type: String },
    onSale: { type: Boolean },
    regularPrice: { type: Number },
    salePrice: { type: Number },
    percentSavings: { type: Number },
    thumbnailImage: { type: String},
    image: { type: String }
});
