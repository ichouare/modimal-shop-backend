import { Router } from 'express'

import {
  AddProduct,
  deleteProduct,
  UpdateProduct,
  uplaodImage,
} from '../../controllers/v1/admin/Product.controller'
import {
  getAllProducts,
  GetFilterProduct,
  ProductDetails,
} from '../../controllers/v1/Product.controller'
import { adminAuthenticationHandler } from '../../middleware/AdminAuthHandler'
import { validate } from '../../middleware/validationHandler'
import { ProductZodSchema } from '../../types/Product.schema'
import { upload } from '../../services/uploadmulter'

const router = Router()

router.get('/', getAllProducts)

router.post(
  '/',
  adminAuthenticationHandler,
  validate({
    body: ProductZodSchema,
  }),
  AddProduct
)

router.put(
  '/:id',
  adminAuthenticationHandler,
  validate({
    body: ProductZodSchema,
  }),
  UpdateProduct
)
router.delete('/:id', adminAuthenticationHandler, deleteProduct)

router.get('/filter', GetFilterProduct)

router.post(
  '/upload',
  adminAuthenticationHandler,
  upload.single('image'),
  uplaodImage
)

router.get('/:id',  ProductDetails);

export default router
