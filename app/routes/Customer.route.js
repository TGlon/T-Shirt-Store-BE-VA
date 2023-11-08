const express = require("express");
const Customer = require("../controllers/Customer.controller");
const router = express.Router();

router.route("/")
  .post(Customer.create)
  .get(Customer.findAll)
  .delete(Customer.deleteAll);
// tìm một khách hàng dựa trên ID hoặc tên
router.route("/:criteria").get(Customer.findOne);
router.route("/:id").put(Customer.update).delete(Customer.deleteOne);
module.exports = router;
