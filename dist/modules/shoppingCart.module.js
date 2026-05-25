"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShoppingCart = void 0;
const mongoose_1 = require("mongoose");
const SelectProduct = new mongoose_1.Schema({
    ProductId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    size: String,
    color: String,
    quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1,
    },
    price: {
        type: Number,
        required: true,
    },
});
const ShoppingCartSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },
    products: [SelectProduct],
    status: {
        type: String,
        enum: ['active', 'completed', 'cancelled'],
        default: 'active',
    },
    tax: {
        type: Number,
        default: 0,
    },
    shipping: {
        type: Number,
        default: 0,
    },
    total: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });
exports.ShoppingCart = (0, mongoose_1.model)('ShoppingCart', ShoppingCartSchema);
