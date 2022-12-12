const mongoose = require("mongoose");
const addressSchema = mongoose.Schema({
  postal: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  street_address: {
    type: String,
    required: true,
  },
  street_number: {
    type: Number,
    required: true,
  },
  street_address_2: {
    type: String,
    required: true,
  },
  reference: {
    type: String,
    required: false,
  },
  district: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  default: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Address", addressSchema, "addresses");
