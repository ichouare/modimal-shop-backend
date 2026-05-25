"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const helpers_1 = require("../services/helpers");
const validate = (schema) => (req, res, next) => {
    try {
        if (schema.body)
            schema.body.parse(req.body);
        if (schema.query)
            schema.query.parse(req.query);
        if (schema.params)
            schema.params.parse(req.params);
        next();
    }
    catch (error) {
        return (0, helpers_1.sendError)(res, {
            success: false,
            message: 'Validation error',
            errors: error.errors,
        });
    }
};
exports.validate = validate;
