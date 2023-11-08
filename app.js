// npm packages
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const createError = require("http-errors");
const mongoClient = require("mongoose");
// initialize
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
// connect db
mongoClient
  .connect("mongodb://127.0.0.1:27017/T-shirtStore")
  .then(() => {
    console.log("🛌Connected successfully");
  })
  .catch((error) => {
    console.error(`🧘‍♂️Connect database is failed: ${error} `);
  });
//initialize router
const CustomerRouter = require("./app/routes/Customer.route");
const AccountRouter = require("./app/routes/Account.route");
//use router
app.use("/api/Customers", CustomerRouter);
app.use("/api/Accounts", AccountRouter);
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
