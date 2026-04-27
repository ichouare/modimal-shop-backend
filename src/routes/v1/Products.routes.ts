import {Router } from 'express'
import { sendSuccess } from '../../services/helpers'
import { AddProduct, UpdateProduct } from '../../controllers/v1/admin/Product.controller'
import { validate } from '../../middlwares/validationHandler'
import { ProductZodSchema } from '../../types/Product.schema'
import { adminAuthenticationHandler } from '../../middlwares/AdminAuthHandler'


const router = Router()



router.post("/",adminAuthenticationHandler, validate({
  body: ProductZodSchema
}),  AddProduct)


router.put("/:id", adminAuthenticationHandler,  validate({
  body: ProductZodSchema
}),  UpdateProduct)

router.put("/:id", adminAuthenticationHandler,  UpdateProduct)


router.get("/filter", (req, res) => {
   const query = req.query
   console.log("here", query)
    return sendSuccess(res, 200, {
   success: true,
   message: `Your product id is`,
   data: {
    ...query
   }
  })
})

router.get("/:id" , (req, res) => {
  const {id} =   req.params
  console.log("this id of product i want to get-->", id)
  return sendSuccess(res, 200, {
   success: true,
   message: `Your product id is ${id}`
  })
})





export default router