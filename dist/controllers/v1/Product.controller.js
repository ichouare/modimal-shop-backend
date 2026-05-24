"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProducts = getAllProducts;
exports.GetFilterProduct = GetFilterProduct;
const product_module_1 = require("../../modules/product.module");
const helpers_1 = require("../../services/helpers");
async function getAllProducts(req, res) {
    try {
        const { title, limit = 3, page } = req.query;
        let productsList = [];
        if (!title)
            productsList = await product_module_1.Product.find().limit(+limit);
        else
            productsList = await product_module_1.Product.find({
                title: { $regex: title, $options: 'i' },
            }).limit(+limit);
        return (0, helpers_1.sendSuccess)(res, 200, {
            success: true,
            message: 'Product retieved successfully',
            data: {
                items: productsList,
                page: 1,
                total: productsList?.length,
            },
        });
    }
    catch (err) {
        return (0, helpers_1.sendError)(res, {
            success: false,
            message: 'please make sure to send a correct data',
        });
    }
}
async function GetFilterProduct(req, res) {
    try {
        const { sort, color, size = '', fabric } = req.query;
        let filter = {};
        let productlist = [];
        if (size) {
            filter.size = size;
        }
        if (fabric)
            filter.fabric = fabric;
        if (color)
            filter['images.colors'] = color;
        if (sort) {
            console.log(typeof sort); // object
            let sortObj = {};
            if (sort && typeof sort === 'object') {
                Object.keys(sort).forEach((key) => {
                    const value = sort[key];
                    if (typeof value === "string") {
                        sortObj[key] = Number(value);
                    }
                });
            }
            productlist = await product_module_1.Product.find(filter).sort(sortObj);
        }
        else
            productlist = await product_module_1.Product.find(filter).sort({ createAt: -1 });
        console.log(JSON.stringify);
        return (0, helpers_1.sendSuccess)(res, 200, {
            success: true,
            message: 'Product retieved successfully',
            data: {
                items: productlist,
                page: 1,
                total: 1,
            },
        });
    }
    catch (err) {
        return (0, helpers_1.sendError)(res, {
            success: false,
            message: 'something wrong',
        });
    }
}
