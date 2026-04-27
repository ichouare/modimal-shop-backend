import { Request, Response } from "express"
import { Product } from "../../../modules/product.module"
import { sendError, sendSuccess } from "../../../services/helpers"

export  async function AddProduct(req: Request, res: Response ){
  try{
    const newProduct =  await Product.create({
      ...req?.body
    })
    console.log(newProduct)
     return sendSuccess(res, 200, {
      success: true,
      message: "new product is add succesfully",
      data: newProduct
     })

    }catch(err){
      return sendError(res, {
        success: false,
        message: "please make sure to send a correct data",
      })
    }
}