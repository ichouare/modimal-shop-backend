"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Product_controller_1 = require("../../controllers/v1/admin/Product.controller");
const Product_controller_2 = require("../../controllers/v1/Product.controller");
const AdminAuthHandler_1 = require("../../middleware/AdminAuthHandler");
const validationHandler_1 = require("../../middleware/validationHandler");
const Product_schema_1 = require("../../types/Product.schema");
const uploamulter_1 = require("../../services/uploamulter");
const router = (0, express_1.Router)();
router.get('/', Product_controller_2.getAllProducts);
router.post('/', AdminAuthHandler_1.adminAuthenticationHandler, (0, validationHandler_1.validate)({
    body: Product_schema_1.ProductZodSchema,
}), Product_controller_1.AddProduct);
router.put('/:id', AdminAuthHandler_1.adminAuthenticationHandler, (0, validationHandler_1.validate)({
    body: Product_schema_1.ProductZodSchema,
}), Product_controller_1.UpdateProduct);
router.delete('/:id', AdminAuthHandler_1.adminAuthenticationHandler, Product_controller_1.deleteProduct);
router.get('/filter', Product_controller_2.GetFilterProduct);
router.post("/upload", AdminAuthHandler_1.adminAuthenticationHandler, uploamulter_1.upload.single("image"), Product_controller_1.uplaodImage);
// router.get('/:id', (req, res) => {
//     const { id } = req.params;
//     return sendSuccess(res, 200, {
//         success: true,
//         message: `Your product id is ${id}`,
//     });
// });
exports.default = router;
