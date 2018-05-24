const mongoose = require('mongoose');

const laptopSchema = new mongoose.Schema({
    timestamp: { type: Date, default: new Date() }, // added for testing purposes
    sku: { type: String, unique: true},
    manufacturer: { type: String },
    name: { type: String },
    modelNumber: { type: String },
    details: { type: Object },
    color: { type: String },
    thumbnailImage: { type: String},
    image: { type: String }
});

const Laptop = mongoose.model('Laptop', laptopSchema);

module.exports = Laptop;