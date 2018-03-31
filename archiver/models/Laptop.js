const mongoose = require('mongoose');

const laptopSchema = new mongoose.Schema({
    manufacturer: { type: String },
    name: { type: String },
    modelNumber: { type: String, unqiue: true },
    details: { type: Object },
    color: { type: String },
    thumbnailImage: { type: String},
    image: { type: String }
});

const Laptop = mongoose.model('Laptop', laptopSchema);

module.exports = Laptop;