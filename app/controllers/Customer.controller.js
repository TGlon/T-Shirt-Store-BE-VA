const Customer = require("../models/Customer.model");

const create = async (req, res, next) => {
  try {
    const newCus = new Customer(req.body);
    const savedCus = await newCus.save();
    return res
      .status(201)
      .json({ message: "Tạo khách hàng thành công", Customer: savedCus });
  } catch (error) {
    return res.status(500).json({ error: "Không thể tạo khách hàng." });
  }
};
// const findAll = async (req, res, next) => {
//   try {
//     const customers = await Customer.find()
//       .populate({
//         path: "deck", // Trường trong mô hình "Customer" chứa ObjectId tham chiếu đến tài khoản
//         model: "Account", // Tên mô hình "Account" bạn muốn liên kết
//       })
//       .exec();

//     return res.status(200).json({ message: "Danh sách khách hàng", customers });
//   } catch (error) {
//     console.log(error);
//     return res
//       .status(500)
//       .json({ error: "Không thể lấy danh sách khách hàng." });
//   }
// };
const findAll = async (req, res, next) => {
  try {
    const customers = await Customer.aggregate([
      {
        $lookup: {
          from: "accounts", // Tên bảng tài khoản
          localField: "_id", // Trường cục bộ trong mô hình Customer
          foreignField: "customerId", // Trường trong mô hình Account
          as: "account" // Tên trường kết quả
        }
      }
    ]);

    return res.status(200).json({ message: "Danh sách khách hàng với thông tin tài khoản", customers });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Không thể lấy danh sách khách hàng." });
  }
};

const findOne = async (req, res, next) => {
  try {
    const searchCriteria = req.params.criteria; 
    const customer = await Customer.findOne({ $or: [
        { name: searchCriteria },
        { _id: searchCriteria },
      ] });

    if (!customer) {
      return res.status(404).json({ error: "Không tìm thấy khách hàng." });
    }

    return res.status(200).json({ message: "Thông tin khách hàng", customer });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Không thể tìm kiếm khách hàng." });
  }
};
const update = async (req, res, next) => {
  try {
    const customerId = req.params.id; 
    const updatedData = req.body; 
    const updatedCustomer = await Customer.findByIdAndUpdate(customerId, updatedData, { new: true });

    if (!updatedCustomer) {
      return res.status(404).json({ error: "Không tìm thấy khách hàng để cập nhật." });
    }

    return res.status(200).json({ message: "Cập nhật khách hàng thành công", customer: updatedCustomer });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Không thể cập nhật khách hàng." });
  }
};
const deleteOne = async (req, res, next) => {
  try {
    const customerId = req.params.id; 
    const deletedCustomer = await Customer.deleteOne({ _id: customerId });

    if (deletedCustomer.deletedCount === 0) {
      return res.status(404).json({ error: "Không tìm thấy khách hàng để xóa." });
    }

    return res.status(200).json({ message: "Xóa khách hàng thành công", customer: deletedCustomer });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Không thể xóa khách hàng." });
  }
};

const deleteAll = async (req, res, next) => {
  try {
    await Customer.deleteMany({});
    return res.status(200).json({ message: "Xóa tất cả khách hàng thành công" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Không thể xóa tất cả khách hàng." });
  }
};

module.exports = { create, findAll, findOne, update, deleteOne, deleteAll};
