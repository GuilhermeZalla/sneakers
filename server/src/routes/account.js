const express = require("express");
const router = express.Router();
const User = require("./../models/users");
const Wishlist = require("./../models/wishlists");
const CartItems = require("./../models/cartItems");
const Address = require("./../models/addresses");
const Purchase = require("./../models/purchases");

// POST

router.post("/", async (req, res) => {
  let { email, password, fullname, phone, bday, gender } = req.body;
  if (isNaN(phone)) {
    phone = 0;
  }
  try {
    await User.create({
      useremail: email,
      password: password,
      phone: Number(phone),
      full_name: fullname,
      birthday: bday,
      gender: gender,
    });
    res.redirect("http://localhost:3000/");
  } catch (err) {
    console.error(`New Error: ${err}`);
  }
});

router.post("/wishlist/:email/:name/:price/:rank/:id", async (req, res) => {
  try {
    let user = await User.findOne({ useremail: req.params.email });
    let wishlist = await Wishlist.create({
      name: req.params.name,
      productId: req.params.id,
      price: req.params.price,
      rank: req.params.rank,
      user: user._id,
    });
    res.send(wishlist);
  } catch (err) {
    res.sendStatus(422);
    console.error(`New Error: ${err}`);
  }
});

router.post("/shopping-cart/:email/:name/:price/:quant", async (req, res) => {
  try {
    let user = await User.findOne({ useremail: req.params.email });
    let cart = await CartItems.findOne({ name: req.params.name });
    if (cart) {
      cart = await CartItems.findOneAndUpdate(
        { name: req.params.name, user: user._id },
        { quant: req.params.quant }
      );
    } else {
      cart = await CartItems.create({
        name: req.params.name,
        price: req.params.price,
        quant: req.params.quant,
        user: user._id,
      });
    }
    res.json(cart);
  } catch (err) {
    res.sendStatus(422);
  }
});

router.post("/update-password", async (req, res) => {
  const { newpassword } = req.body;
  try {
    await User.findOneAndUpdate({
      useremail: req.params.email,
      password: newpassword,
    });
    res.redirect(`http://localhost:3000/dashboard/${"home"}`);
  } catch (err) {
    res.sendStatus(422);
    console.error(`New Error: ${err}`);
  }
});

router.post("/address", async (req, res) => {
  const {
    email,
    zip,
    type,
    streetAddress,
    number,
    streetAddress2,
    reference,
    district,
    city,
    state,
    payment,
  } = req.body;
  try {
    let user = await User.findOne({ useremail: email });
    await Address.create({
      postal: zip,
      type: type,
      street_address: streetAddress,
      street_number: number,
      street_address_2: streetAddress2,
      reference: reference,
      district: district,
      city: city,
      state: state,
      user: user._id,
    });
    if (payment) {
      res.redirect("http://localhost:3000/payment");
    } else {
      res.redirect(`http://localhost:3000/dashboard/${"data"}`);
    }
  } catch (err) {
    res.sendStatus(422);
    console.error(`New Error: ${err}`);
  }
});

router.post("/payment", async (req, res) => {
  const {
    email,
    paymentType,
    shippingPrice,
    shippingName,
    total,
    names,
    quantity,
    address,
  } = req.body;
  let addressJSON = JSON.parse(address);
  let random = (Math.random() * (9999999 - 1000000) + 1000000).toFixed(0);
  let date = new Date();
  let purchaseDate =
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
  try {
    let user = await User.findOne({ useremail: email });
    await Purchase.create({
      purchase_number: random,
      date: purchaseDate,
      price: total,
      payment_type: paymentType,
      names: names,
      quantity: quantity,
      shipping: shippingName,
      shipping_price: shippingPrice,
      status: "Waiting confirmation",
      street_address: addressJSON.street_address,
      number: addressJSON.street_number,
      district: addressJSON.district,
      postal: addressJSON.postal,
      city: addressJSON.city,
      state: addressJSON.state,
      user: user._id,
    });
    res.redirect(`http://localhost:3000/dashboard/${"purchase"}`);
  } catch (err) {
    res.sendStatus(422);
    console.error(`New Error: ${err}`);
  }
});

// GET

router.get("/:email", async (req, res) => {
  try {
    let result = await User.find({ useremail: req.params.email });
    if (result.length === 1) {
      res.send(true);
    } else {
      res.send(false);
    }
  } catch (err) {
    console.error(`New Error: ${err}`);
    res.send(err);
  }
});

router.get("/phone/:phone", async (req, res) => {
  try {
    let result = await User.find({ phone: req.params.phone });
    if (result.length === 1) {
      res.send(true);
    } else {
      res.send(false);
    }
  } catch (err) {
    console.error(`New Error: ${err}`);
    res.send(err);
  }
});

router.get("/validation/:email/:password", async (req, res) => {
  try {
    let result = await User.find({
      $and: [
        { useremail: req.params.email },
        { password: req.params.password },
      ],
    });
    if (result.length === 1) {
      res.send(true);
    } else {
      res.send(false);
    }
  } catch (err) {
    res.statusCode(422);
    console.error(`New Error: ${err}`);
  }
});

router.get("/wishlist/:email", async (req, res) => {
  try {
    let user = await User.findOne({ useremail: req.params.email });
    let wishlist = await Wishlist.find({ user: user._id });
    res.json(wishlist);
  } catch (err) {
    res.sendStatus(402);
    console.error(`New Error: ${err}`);
  }
});

router.get("/user/:email", async (req, res) => {
  try {
    let user = await User.findOne({ useremail: req.params.email });
    res.json(user);
  } catch (err) {
    res.sendStatus(422);
  }
});

router.get("/user-cart/:email", async (req, res) => {
  let sum = 0;
  try {
    let user = await User.findOne({ useremail: req.params.email });
    let cart = await CartItems.find({ user: user._id });
    console.log(cart);
    for (let i = 0; i < cart.length; ++i) {
      sum += cart[i].price * cart[i].quant;
    }
    res.json({ cart: cart, sum: sum });
  } catch (err) {
    res.sendStatus(422);
    console.error(`New Error: ${err}`);
  }
});

router.get("/verify-password/:email/:password", async (req, res) => {
  try {
    let user = await User.findOne({
      useremail: req.params.email,
      password: req.params.password,
    });
    res.json(user);
  } catch (err) {
    res.sendStatus(422);
    console.error(`New Error: ${err}`);
  }
});

router.get("/address/:email", async (req, res) => {
  try {
    let user = await User.findOne({ useremail: req.params.email });
    let address = await Address.find({ user: user._id });
    res.json(address);
  } catch (err) {
    res.sendStatus(422);
    console.error(`New Error: ${err}`);
  }
});

router.get("/purchase/:email", async (req, res) => {
  try {
    let user = await User.findOne({ useremail: req.params.email });
    let purchase = await Purchase.find({ user: user._id });
    res.json(purchase);
  } catch (err) {
    res.sendStatus(422);
    console.error(`New Error: ${err}`);
  }
});

// PATCH

router.patch("/login/:email/:state", async (req, res) => {
  try {
    let user = await User.findOneAndUpdate(
      { useremail: req.params.email },
      { logged: req.params.state }
    );
    res.json(user);
  } catch (err) {
    res.sendStatus(422);
    console.error(`New Error: ${err}`);
  }
});

router.patch(
  "/cart-item/update-quantity/:email/:name/:quant",
  async (req, res) => {
    try {
      let user = await User.findOne({ useremail: req.params.email });
      let cart = await CartItems.findOneAndUpdate(
        { user: user._id, name: req.params.name },
        { quant: req.params.quant }
      );
      res.json(cart);
    } catch (err) {
      res.send(422);
      console.error(`New Error: ${err}`);
    }
  }
);

router.patch("/define-default/:id/:state", async (req, res) => {
  try {
    let address = await Address.findByIdAndUpdate(
      { _id: req.params.id },
      { default: req.params.state }
    );
    res.json(address);
  } catch (err) {
    res.sendStatus(422);
    console.error(`New Error: ${err}`);
  }
});

// DELETE

router.delete("/wishlist/remove/:email/:name", async (req, res) => {
  try {
    let user = await User.findOne({ useremail: req.params.email });
    let wishlist = await Wishlist.findOneAndDelete(
      { user: user._id },
      { name: req.params.name }
    );
    res.json(wishlist);
  } catch (err) {
    res.sendStatus(422);
    console.error(`New Error: ${err}`);
  }
});

router.delete("/cart-item/remove/:email/:name", async (req, res) => {
  try {
    let user = await User.findOne({ useremail: req.params.email });
    let cart = await CartItems.findOneAndDelete(
      { user: user._id },
      { name: req.params.name }
    );
    res.json(cart);
  } catch (err) {
    res.sendStatus(422);
    console.error(`New Error: ${err}`);
  }
});

router.delete("/remove-address/:id", async (req, res) => {
  try {
    let address = await Address.findOneAndDelete({ addressId: req.params.id });
    res.json(address);
  } catch (err) {
    res.sendStatus(422);
    console.error(`New Error: ${err}`);
  }
});

module.exports = router;