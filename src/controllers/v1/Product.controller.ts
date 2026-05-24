import { Request, Response } from 'express'
import { Product } from '../../modules/product.module'
import { sendError, sendSuccess } from '../../services/helpers'
import { ProductQuery } from '../../types/filterQuery.schema'


export async function getAllProducts(req: Request, res: Response) {
  try {
    const { title, limit = 3, page  = 1} = req.query
    let productsList = []
    let totalProducts  = 0
    if (!title){
      productsList = await Product.find().skip( ( +page - 1) * +limit ).limit(+limit)
      totalProducts = await Product.find().countDocuments()
    }
    else{
      productsList = await Product.find({
        title: { $regex: title as string, $options: 'i' },
      }).skip( ( +page - 1) * +limit ).limit(+limit)
      totalProducts = await Product.find({title: { $regex: title as string, $options: 'i' }}).countDocuments()
    }
    return sendSuccess(res, 200, {
      success: true,
      message: 'Product retieved successfully',
      data: {
        items: productsList,
        totalPages: totalProducts / +limit,
        page: page,
        total: productsList?.length,
      },
    })
  } catch (err: any) {
    return sendError(res, {
      success: false,
      message: err.message || 'please make sure to send a correct data',
    })
  }
}

export async function GetFilterProduct(req: Request, res: Response) {
  try {
    const { sort, color, size = '', fabric, page = 1 ,  limit = 10} = req.query as ProductQuery

    let filter: any = {}
    let productlist = []
    let totalProduts = 0
    if (size) {
      filter.size = size
    }
    if (fabric) filter.fabric = fabric

    if (color) filter['images.color'] = color

    if (sort) {
      console.log(typeof sort) // object
      let sortObj: any = {}

      if (sort && typeof sort === 'object') {
        Object.keys(sort).forEach((key) => {
          const value = sort[key]

          if (typeof value === 'string') {
            sortObj[key] = Number(value)
          }
        })
      }

      productlist = await Product.find(filter).skip( ( +page - 1) * +limit ).limit(+limit).sort(sortObj)
      totalProduts = await Product.find(filter).countDocuments()
    } else {
      productlist = await Product.find(filter).skip( ( +page - 1) * +limit ).limit(+limit).sort({ createdAt: -1 })
      totalProduts = await Product.find(filter).countDocuments()
    }
    return sendSuccess(res, 200, {
      success: true,
      message: 'Product retieved successfully',
      data: {
        items: productlist,
        page: page,
        totalPages:  totalProduts / +limit ,
      },
    })
  } catch (err : any)  {
    return sendError(res, {
      success: false,
      message: err?.message || 'something wrong',
    })
  }
}


export async function ProductDetails(req: Request, res: Response){
  try{
      const {id} = req.params
      if(!id){
        return sendError(res, {
      success: false,
      message: "please provide a product id",
    })
      }
      const product = await Product.findById(id)
      return sendSuccess(res, 200, {
        success: true,
        message : "Product retieved successfully",
        data: product,
      })
  }catch(err: any){
    return sendError(res, {
      success: false,
      message: err?.message || 'something wrong',
    })
  }
}
