"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const mongoose_1 = require("mongoose");
const categoryschema = new mongoose_1.Schema({});
exports.Category = (0, mongoose_1.model)("category", categoryschema);
