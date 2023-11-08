const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CustomerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    deck: [{
        type: Schema.Types.ObjectId,
        ref: 'Deck'
    }]
})

const Customer = mongoose.model('Customer', CustomerSchema);
module.exports = Customer;