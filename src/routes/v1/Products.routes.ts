import {Router } from 'express'
import { sendSuccess } from '../../services/helpers'
import { AddProduct } from '../../controllers/v1/admin/Product.controller'
import { validate } from '../../middlwares/validationHandler'
import { ProductZodSchema } from '../../types/Product.schema'


const router = Router()



router.post("/", validate({
  body: ProductZodSchema
}),  AddProduct)

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