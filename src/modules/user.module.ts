import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
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
        enum: ["local" , "auth0"],
        default: "local"
    },
    verify: {
        type: Boolean,
        default: false
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
        type : String,
        enum : ["USER" , "ADMIN" ],
        default: "USER"
    },
    avatar: String,
    favoritsProduct: [ {
    type: Schema.Types.ObjectId,
    ref: "Product"
  }],
    pymemtId: {
       type: Schema.Types.ObjectId,
       ref: "Payment",
    },
    shoppingCartId: {
         type: Schema.Types.ObjectId,
         ref: "Card",
    }
});

// 🔥 hash before saving
userSchema.pre('save', async function () {
    if(!this.password) return;
    if (!this.isModified('password')) return;

    this.password = await bcrypt.hash(this.password, 10);
});

export const User = model('user', userSchema);
