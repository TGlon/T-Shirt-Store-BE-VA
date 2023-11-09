const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    colors: [{
        type: String,
        require: true
    }],
    sizes: [{
        type: String,
        require: true
    }],
    material: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    images: {
        type: [String], // Một mảng các đường dẫn hình ảnh
        required: true,
    },
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
