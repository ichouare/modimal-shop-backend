import {Router } from 'express'
import { sendSuccess } from '../../services/helpers'
import { AddProduct, UpdateProduct } from '../../controllers/v1/admin/Product.controller'
import { validate } from '../../middlwares/validationHandler'
import { ProductZodSchema } from '../../types/Product.schema'
import { adminAuthenticationHandler } from '../../middlwares/AdminAuthHandler'
import { getAllProducts, GetFilterProduct } from '../../controllers/v1/Product.controller'


const router = Router()


router.get("/", getAllProducts)


router.post("/",adminAuthenticationHandler, validate({
  body: ProductZodSchema
}),  AddProduct)


router.put("/:id", adminAuthenticationHandler,  validate({
  body: ProductZodSchema
}),  UpdateProduct)

router.put("/:instanceAPIid", adminAuthenticationHandler,  UpdateProduct)


router.get("/filter", GetFilterProduct)


router.get("/:id" , (req, res) => {
  const {id} =   req.params
  return sendSuccess(res, 200, {
   success: true,
   message: `Your product id is ${id}`
  })
})





export default router