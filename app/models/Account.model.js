const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    customerId: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    roleId: {
        type: Schema.Types.ObjectId,
        ref: 'Role',
        required: true
    }
});

const Account = mongoose.model('Account', AccountSchema);

module.exports = Account;
