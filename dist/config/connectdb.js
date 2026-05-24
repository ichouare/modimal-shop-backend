"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = connectdb;
const mongoose_1 = __importDefault(require("mongoose"));
async function connectdb() {
    try {
        if (!process.env.URL_DB) {
            throw new Error('URL_DB is not defined in environment variables');
        }
        if (mongoose_1.default.connection.readyState === 1) {
            console.log('Already connected to DB');
            return;
        }
        await mongoose_1.default.connect(process.env.URL_DB);
        console.log('✅ Connected to DB');
    }
    catch (error) {
        console.error('❌ DB connection error:', error);
        process.exit(1);
    }
}
