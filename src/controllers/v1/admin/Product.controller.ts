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


export  async function UpdateProduct(req: Request, res: Response ){
  try{

    const {id} = req.params
    const  productToUpdate =  await Product.findByIdAndUpdate(id, {
      ...req?.body
    }, {
        new: true,          // return updated doc
        runValidators: true // apply schema validation
      })
     if (!productToUpdate) {
      return sendError(res, {
        success: false,
        message: "Product not found",
      });
    }
     return sendSuccess(res, 200, {
      success: true,
      message: "product is updated succesfully",
      data: productToUpdate
     })

    }catch(err){
      return sendError(res, {
        success: false,
        message: "please make sure to send a correct data",
      })
    }
}


export async function deleteProduct(req: Request, res: Response ){
  try{
    const {id} = req.params

    const deletedProduct = await  Product.findByIdAndDelete(id)

    if (!deletedProduct) {
      return sendError(res, {
        success: false,
        message: "Product not found",
      });
    }
    return sendSuccess(res, 200, {
      success: true,
      message: "Product is deleted",
     })


  }catch(err)
  {
    return sendError(res, {
        success: false,
        message: "something wrong !!",
      })
  }
}