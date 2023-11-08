const Account = require("../models/Account.model");

const create = async (req, res, next) => {
  try {
    const newAccount = new Account(req.body);
    const savedAccount = await newAccount.save();
    return res.status(201).json({ message: "Tạo tài khoản thành công", account: savedAccount });
  } catch (error) {
    return res.status(500).json({ error: "Không thể tạo tài khoản." });
  }
};
const findAll = async (req, res, next) => {
  try {
    const accounts = await Account.find()
      .populate({
        path: 'customerId', // Trường trong mô hình "Account" chứa ObjectId tham chiếu đến khách hàng
        model: 'Customer', // Tên mô hình "Customer" 
      })
      .exec();

    return res.status(200).json({ message: "Danh sách tài khoản với thông tin khách hàng", accounts });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Không thể lấy danh sách tài khoản." });
  }
};
const findOne = async (req, res, next) => {
  try {
    const searchCriteria = req.params.criteria; 
    const account = await Account.findOne({ $or: [
        { username: searchCriteria }, 
        { _id: searchCriteria }, 
      ] })
      // .populate('customerId'); 
      .populate({
        path: 'customerId', // Trường trong mô hình "Account" chứa ObjectId tham chiếu đến khách hàng
        model: 'Customer', // Tên mô hình "Customer" 
      })

    if (!account) {
      return res.status(404).json({ error: "Không tìm thấy tài khoản." });
    }

    return res.status(200).json({ message: "Thông tin tài khoản", account });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Không thể tìm kiếm tài khoản." });
  }
};
const update = async (req, res, next) => {
  try {
    const accountId = req.params.id; // Lấy ID của tài khoản cần cập nhật từ tham số URL
    const updatedData = req.body; // Dữ liệu cập nhật từ yêu cầu

    const updatedAccount = await Account.findByIdAndUpdate(accountId, updatedData, { new: true });

    if (!updatedAccount) {
      return res.status(404).json({ error: "Không tìm thấy tài khoản để cập nhật." });
    }

    return res.status(200).json({ message: "Cập nhật tài khoản thành công", account: updatedAccount });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Không thể cập nhật tài khoản." });
  }
};

module.exports = { create, findAll, findOne, update };
