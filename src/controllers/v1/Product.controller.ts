
import { Request, Response } from "express"
import { Product } from "../../modules/product.module"
import { sendError, sendSuccess } from "../../services/helpers"


export async function getAllProducts(req: Request, res: Response){
  try{
      const {title, limit = 3, page} = req.query
      let productsList = []
      if(!title)
        productsList = await Product.find().limit(3)
      else
        productsList = await Product.find({title : {$regex: title as string, $options: "i"}}).limit(+limit)
      return sendSuccess(res, 200, {
        success: true,
        message: "Product retieved successfully",
        data: {
          items: productsList,
          page: 1,
          total: productsList?.length,
        }
      })
  }catch(err)
  {
    return sendError(res, {
        success: false,
        message: "please make sure to send a correct data",
      })
  }
}


export async  function GetFilterProduct(req: Request, res: Response){
  try{
    const {
      sort,
      color,
      size = "",
      fabric,
    } = req.query


    let filter : any = {}
    let productlist = []
    if(size)
    {
      filter.size = size
    }
    if(fabric)
      filter.fabric = fabric

    if(color)
       filter["images.colors"] = color

    if(sort)
    {
      console.log(typeof sort) // object
      let sortObj: any = {}

    if (sort && typeof sort === "object") {
      for (const key in sort) {
        sortObj[key] = Number(sort[key] as string)
      }
    }
      productlist = await Product.find(filter).sort(sortObj)

    }
    else
      productlist = await Product.find(filter).sort({createAt: -1})
    console.log(JSON.stringify)
    return sendSuccess(res, 200, {
        success: true,
        message: "Product retieved successfully",
        data: {
          items: productlist,
          page: 1,
          total: 1,
        }
      })

  }catch(err)
  {
    return sendError(res, {
        success: false,
        message: "something wrong",
      })
  }
}