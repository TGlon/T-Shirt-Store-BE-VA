const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartItemSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  total: {
    type: Number,
    require: true,
    default: 0,
  },
});
const Cart = mongoose.model("Cart", CartItemSchema);

module.exports = Cart;
