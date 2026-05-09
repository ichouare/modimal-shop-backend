import {Schema, model} from "mongoose"



const SelectProduct = new Schema({
  ProductId : {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  size: String,
  color: String,
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1
  },
    price: {
    type: Number,
    required: true
  }
})

const  ShoppingCartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  products: [SelectProduct],
  status: {
    type: String,
    enum: ["active", "completed", "cancelled"],
    default: "active"
  },
   tax: {
    type: Number,
    default: 0
  },

  shipping: {
    type: Number,
    default: 0
  },

  total: {
    type: Number,
    default: 0
  }
}, {timestamps: true})

export const ShoppingCart = model("ShoppingCart", ShoppingCartSchema);