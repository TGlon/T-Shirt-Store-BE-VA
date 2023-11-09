const Role = require("../models/Role.model");

const createRole = async (req, res) => {
  try {
    const { name } = req.body;

    // Kiểm tra xem vai trò đã tồn tại chưa
    const existingRole = await Role.findOne({ name });

    if (existingRole) {
      return res.status(400).json({ message: "Vai trò đã tồn tại" });
    }

    // Tạo mới vai trò
    const newRole = new Role({ name });
    await newRole.save();

    return res.status(201).json({ message: "Tạo mới vai trò thành công", role: newRole });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

module.exports = { createRole };
