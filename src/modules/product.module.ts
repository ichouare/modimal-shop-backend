import {Schema, model} from 'mongoose'



const ImagesSchema = new Schema({
   thumbnail: {
    type: String,
    required: true,
  },
  images: [{
     type: String,
  }],
  color:  String,
})

const ProducSchema = new Schema({
  title: {
    type: String,
    required: true,
     index: true
  },
  description : {
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
  careAdvices : {
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
}, { timestamps: true })





export const Product = model("Product", ProducSchema)