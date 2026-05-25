"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticationHandler_1 = require("../../middleware/authenticationHandler");
const stripe_controller_1 = require("../../controllers/v1/stripe.controller");
const router = (0, express_1.Router)();
router.post('/create-checkout-session', authenticationHandler_1.authenticationHandler, stripe_controller_1.createCheckoutSession);
router.post('/order-status', authenticationHandler_1.authenticationHandler, stripe_controller_1.updateOrderStatus);
exports.default = router;
