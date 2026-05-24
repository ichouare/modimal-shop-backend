"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const ImagesSchema = new mongoose_1.Schema({
    thumbnail: {
        type: String,
        required: true,
    },
    images: [{
            type: String,
        }],
    color: String,
});
const ProductSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        index: true
    },
    description: {
        type: String
    },
    images: [ImagesSchema],
    size: [
        {
            type: String,
            index: true
        }
    ],
    price: {
        type: Number,
        required: true,
        index: true,
        default: 0,
    },
    currency: {
        type: String,
        default: "MAD"
    },
    stock: {
        type: Number,
        index: true,
        default: 0
    },
    careAdvices: {
        type: String
    },
    fabric: {
        type: String,
    },
    shipping: {
        type: String
    },
    returnMethod: {
        type: String,
    }
}, { timestamps: true });
exports.Product = (0, mongoose_1.model)("Product", ProductSchema);
