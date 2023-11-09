const Cart = require("../models/Cart.model");
const Product = require("../models/Product.model");

const create = async (req, res) => {
  try {
    const { product, quantity, total } = req.body;
    // console.log(product);
    // Kiểm tra xem sản phẩm có tồn tại không
    const ProductData = await Product.findById(product);
    // console.log(ProductData);
    if (!ProductData) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    }

    // Tạo mới Cart Item
    const cartItem = new Cart({
      product: product,
      quantity: quantity,
      total: total,
    });

    // Lưu vào cơ sở dữ liệu
    await cartItem.save();

    return res.status(201).json(cartItem);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

const findOne = async (req, res) => {
  try {
    const { id } = req.params;

    // Tìm Cart Item dựa trên ID của sản phẩm
    const cartItem = await Cart.findOne({ _id: id }).populate("product");

    if (!cartItem) {
      return res.status(404).json({ message: "Cart Item không tồn tại" });
    }

    return res.status(200).json(cartItem);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

const findAll = async (req, res) => {
  try {
    // Tìm tất cả Cart Items và populate thông tin từ model Product
    const cartItems = await Cart.find().populate("product");

    return res.status(200).json(cartItems);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { product, quantity, total } = req.body;

    // Tìm Cart Item dựa trên ID
    const cartItem = await Cart.findOne({ _id: id });

    if (!cartItem) {
      return res.status(404).json({ message: "Cart Item không tồn tại" });
    }

    // Cập nhật thông tin Cart Item
    cartItem.product = product;
    cartItem.quantity = quantity;
    cartItem.total = total;

    // Lưu thay đổi
    await cartItem.save();

    // Populate thông tin từ model Product
    await cartItem.populate("product");

    return res.status(200).json(cartItem);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

const deleteOne = async (req, res) => {
  try {
    const { id } = req.params;

    // Tìm và xóa Cart Item dựa trên ID
    const cartItem = await Cart.findByIdAndDelete(id);

    if (!cartItem) {
      return res.status(404).json({ message: "Cart Item không tồn tại" });
    }

    return res
      .status(200)
      .json({ message: "Xóa thành công", deletedCartItem: cartItem });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

const deleteAll = async (req, res) => {
  try {
    await Cart.deleteMany();
    res.json({ message: "All items deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = { create, findAll, findOne, update, deleteAll, deleteOne };
