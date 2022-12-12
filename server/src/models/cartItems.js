const mongoose = require('mongoose');
const cartItemSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quant: {
        type: Number,
        default: 0,
        required: true
    },
    total:{
        type: Number,
        required: false
    },
    user:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('CartItem', cartItemSchema, 'cartItems');