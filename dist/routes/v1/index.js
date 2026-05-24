"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_router_1 = __importDefault(require("./authentication.router"));
const Products_routes_1 = __importDefault(require("./Products.routes"));
const user_router_1 = __importDefault(require("./user.router"));
const stripe_router_1 = __importDefault(require("./stripe.router"));
const swagger_1 = __importDefault(require("../../swagger"));
const router = (0, express_1.Router)();
router.use('/auth', authentication_router_1.default);
router.use('/user', user_router_1.default);
router.use('/product', Products_routes_1.default);
router.use('/stripe', stripe_router_1.default);
router.use('/', swagger_1.default);
exports.default = router;
