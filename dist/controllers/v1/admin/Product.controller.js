"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddProduct = AddProduct;
exports.UpdateProduct = UpdateProduct;
exports.deleteProduct = deleteProduct;
exports.uplaodImage = uplaodImage;
const product_module_1 = require("../../../modules/product.module");
const helpers_1 = require("../../../services/helpers");
async function AddProduct(req, res) {
    try {
        const newProduct = await product_module_1.Product.create({
            ...req?.body,
        });
        return (0, helpers_1.sendSuccess)(res, 200, {
            success: true,
            message: 'new product is add succesfully',
            data: newProduct,
        });
    }
    catch (err) {
        return (0, helpers_1.sendError)(res, {
            success: false,
            message: err.message || 'please make sure to send a correct data',
        });
    }
}
async function UpdateProduct(req, res) {
    try {
        const { id } = req.params;
        const productToUpdate = await product_module_1.Product.findByIdAndUpdate(id, {
            ...req?.body,
        }, {
            new: true, // return updated doc
            runValidators: true, // apply schema validation
        });
        if (!productToUpdate) {
            return (0, helpers_1.sendError)(res, {
                success: false,
                message: 'Product not found',
            });
        }
        return (0, helpers_1.sendSuccess)(res, 200, {
            success: true,
            message: 'product is updated succesfully',
            data: productToUpdate,
        });
    }
    catch (err) {
        return (0, helpers_1.sendError)(res, {
            success: false,
            message: err.message || 'please make sure to send a correct data',
        });
    }
}
async function deleteProduct(req, res) {
    try {
        const { id } = req.params;
        const deletedProduct = await product_module_1.Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return (0, helpers_1.sendError)(res, {
                success: false,
                message: 'Product not found',
            });
        }
        return (0, helpers_1.sendSuccess)(res, 200, {
            success: true,
            message: 'Product is deleted',
        });
    }
    catch (err) {
        return (0, helpers_1.sendError)(res, {
            success: false,
            message: err.message || 'something wrong !!',
        });
    }
}
async function uplaodImage(req, res) {
    if (!req.file) {
        return (0, helpers_1.sendError)(res, {
            success: false,
            message: 'No file uploaded',
        }, 400);
    }
    return (0, helpers_1.sendSuccess)(res, 201, {
        success: true,
        message: 'Upload success',
        data: {
            fileName: req.file.filename,
        },
    });
}
