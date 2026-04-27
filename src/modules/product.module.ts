import {Schema, model} from 'mongoose'



const ImagesSchema = new Schema({
   thumbnail: {
    type: String,
    required: true,
  },
  images: [{
     type: String,
  }],
  colors:  String,
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
    }
  ],
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  currency: {
  type: String,
  default: "MAD"
},
stock: {
  type: Number,
  default: 0
},
 soldOut: {
  type: Boolean,
  default: false
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





export const Product = model("product", ProducSchema)