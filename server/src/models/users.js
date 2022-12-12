const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  useremail: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: false,
    unique: true,
    },
  full_name: {
    type: String,
    required: true
  },
  birthday: {
    type: String,
    required: false,
  },
  second_contact: {
    type: Number,
    required: false,
    unique: true,
  },
  gender: {
    type: String,
    required: false
  },
  logged: {
    type: Boolean,
    default: false,
    required: false
  },
  avatar:{
    type: String,
    required: false
  },
  wishlist: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Wishlist",
    },
  ],
  address: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Address",
    },
  ],
  purchase: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Purchase",
    },
  ],
  cartItem:[
    {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "CartItem"
    }
  ]
});

module.exports = mongoose.model("User", userSchema, "users");
