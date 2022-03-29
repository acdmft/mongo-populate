const mongoose = require("mogoose");

const addressSchema = new mongoose.Schema({
  streetName: {
    type: String,
    required: true,
  },
  streetNumber: {
    type: String,
    required: true,
  },
  postCode: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  }  
});

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;