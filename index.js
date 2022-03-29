const dotenv = require("dotenv");
dotenv.config({
  path: "./config.env",
});
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  });
