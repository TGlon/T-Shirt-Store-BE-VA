const mongoose = require("mongoose");
const config = {
  app: {
    port: process.env.PORT || 3000,
  },
};
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/T-shirtStore");
    console.log("🛌Connected successfully to MongoDB");
  } catch (error) {
    console.error(`🧘‍♂️Connect database is failed: ${error}`);
  }
};
module.exports = { config, connectDB };
