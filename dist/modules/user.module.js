"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
    },
    secondName: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: true,
        index: true,
    },
    password: {
        type: String,
        required: false,
    },
    authProvider: {
        type: String,
        enum: ['local', 'auth0'],
        default: 'local',
    },
    verify: {
        type: Boolean,
        default: false,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    loginAt: {
        type: Date,
        default: Date.now,
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER',
    },
    avatar: String,
    favoritsProduct: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Product',
        },
    ],
    pymemtId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Payment',
    },
    shoppingCartId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Card',
    },
});
// 🔥 hash before saving
userSchema.pre('save', async function () {
    if (!this.password)
        return;
    if (!this.isModified('password'))
        return;
    this.password = await bcrypt_1.default.hash(this.password, 10);
});
exports.User = (0, mongoose_1.model)('user', userSchema);
