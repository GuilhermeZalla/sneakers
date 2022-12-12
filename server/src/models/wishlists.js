const mongoose = require("mongoose");
const wishlistSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  productId: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  rank: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Wishlist", wishlistSchema, "wishlists");
