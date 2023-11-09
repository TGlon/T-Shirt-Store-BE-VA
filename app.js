// npm packages
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const createError = require("http-errors");
// initialize
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
//initialize router
const CustomerRouter = require("./app/routes/Customer.route");
const AccountRouter = require("./app/routes/Account.route");
const ProductRouter = require("./app/routes/Product.route");
const CartRouter = require("./app/routes/Cart.route");
const RoleRouter = require("./app/routes/Role.route");
//use router
app.use("/api/Customers", CustomerRouter);
app.use("/api/Accounts", AccountRouter);
app.use("/api/Products", ProductRouter);
app.use("/api/Carts", CartRouter);
app.use("/api/Roles", RoleRouter);
//simple route
app.get("/", (req, res) => {
  res.json({ messase: "Welcome to T-Shirt Store" });
});
// check errors
app.use((req, res, next) => {
  return next(createError(404, "Resource Not Found"));
});
app.use((err, req, res, next) => {
  return res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;
