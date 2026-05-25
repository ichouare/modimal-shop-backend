"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProducts = getAllProducts;
exports.GetFilterProduct = GetFilterProduct;
exports.ProductDetails = ProductDetails;
const product_module_1 = require("../../modules/product.module");
const helpers_1 = require("../../services/helpers");
async function getAllProducts(req, res) {
    try {
        const { title, limit = 3, page = 1 } = req.query;
        let productsList = [];
        let totalProducts = 0;
        if (!title) {
            productsList = await product_module_1.Product.find().skip((+page - 1) * +limit).limit(+limit);
            totalProducts = await product_module_1.Product.find().countDocuments();
        }
        else {
            productsList = await product_module_1.Product.find({
                title: { $regex: title, $options: 'i' },
            }).skip((+page - 1) * +limit).limit(+limit);
            totalProducts = await product_module_1.Product.find({ title: { $regex: title, $options: 'i' } }).countDocuments();
        }
        return (0, helpers_1.sendSuccess)(res, 200, {
            success: true,
            message: 'Product retieved successfully',
            data: {
                items: productsList,
                totalPages: totalProducts / +limit,
                page: page,
                total: productsList?.length,
            },
        });
    }
    catch (err) {
        return (0, helpers_1.sendError)(res, {
            success: false,
            message: err.message || 'please make sure to send a correct data',
        });
    }
}
async function GetFilterProduct(req, res) {
    try {
        const { sort, color, size = '', fabric, page = 1, limit = 10 } = req.query;
        let filter = {};
        let productlist = [];
        let totalProduts = 0;
        if (size) {
            filter.size = size;
        }
        if (fabric)
            filter.fabric = fabric;
        if (color)
            filter['images.color'] = color;
        if (sort) {
            let sortObj = {};
            if (sort && typeof sort === 'object') {
                Object.keys(sort).forEach((key) => {
                    const value = sort[key];
                    if (typeof value === 'string') {
                        sortObj[key] = Number(value);
                    }
                });
            }
            productlist = await product_module_1.Product.find(filter).skip((+page - 1) * +limit).limit(+limit).sort(sortObj);
            totalProduts = await product_module_1.Product.find(filter).countDocuments();
        }
        else {
            productlist = await product_module_1.Product.find(filter).skip((+page - 1) * +limit).limit(+limit).sort({ createdAt: -1 });
            totalProduts = await product_module_1.Product.find(filter).countDocuments();
        }
        return (0, helpers_1.sendSuccess)(res, 200, {
            success: true,
            message: 'Product retieved successfully',
            data: {
                items: productlist,
                page: page,
                totalPages: totalProduts / +limit,
            },
        });
    }
    catch (err) {
        return (0, helpers_1.sendError)(res, {
            success: false,
            message: err?.message || 'something wrong',
        });
    }
}
async function ProductDetails(req, res) {
    try {
        const { id } = req.params;
        if (!id) {
            return (0, helpers_1.sendError)(res, {
                success: false,
                message: "please provide a product id",
            });
        }
        const product = await product_module_1.Product.findById(id);
        return (0, helpers_1.sendSuccess)(res, 200, {
            success: true,
            message: "Product retieved successfully",
            data: product,
        });
    }
    catch (err) {
        return (0, helpers_1.sendError)(res, {
            success: false,
            message: err?.message || 'something wrong',
        });
    }
}
