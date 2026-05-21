import { Router } from 'express';
import { sendSuccess } from '../../services/helpers';
import { AddProduct, deleteProduct, UpdateProduct, uplaodImage } from '../../controllers/v1/admin/Product.controller';
import { validate } from '../../middleware/validationHandler';
import { ProductZodSchema } from '../../types/Product.schema';
import { adminAuthenticationHandler } from '../../middleware/AdminAuthHandler';
import { getAllProducts, GetFilterProduct } from '../../controllers/v1/Product.controller';
import z from 'zod';
import multer from 'multer';
import { upload } from '../../modules/multer';

const router = Router();

router.get('/', getAllProducts);

router.post(
    '/',
    adminAuthenticationHandler,
    validate({
        body: ProductZodSchema,
    }),
    AddProduct
);

router.put(
    '/:id',
    adminAuthenticationHandler,
    validate({
        body: ProductZodSchema,
    }),
    UpdateProduct
);
router.delete(
    '/:id',
    adminAuthenticationHandler,
    deleteProduct
);

router.get('/filter', GetFilterProduct);


router.post("/upload", upload.single("image"), uplaodImage)
// router.put('/:instanceAPIid', adminAuthenticationHandler, UpdateProduct);


// router.get('/:id', (req, res) => {
//     const { id } = req.params;
//     return sendSuccess(res, 200, {
//         success: true,
//         message: `Your product id is ${id}`,
//     });
// });

export default router;
