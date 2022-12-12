const mongoose = require("mongoose");
const purchaseSchema = mongoose.Schema({
  purchase_number: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  payment_type: {
    type: String,
    required: true,
  },
  names: [
    {
      type: String,
      required: true,
    }
  ],
  quantity: {
    type: Number,
    required: true,
  },
  shipping: {
    type: String,
    required: true,
  },
  shipping_price: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  street_address:{
    type: String,
    required: true
  },
  number:{
    type: Number,
    required: true
  },
  district:{
    type: String,
    required: true
  },
  postal:{
    type: Number,
    required: true
  },
  city:{
    type: String,
    required: true
  },
  state:{
    type: String,
    required: true
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Purchase", purchaseSchema, "purchases");
