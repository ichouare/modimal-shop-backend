"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const compression_1 = __importDefault(require("compression"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("../src/routes/v1/index"));
const connectdb_1 = __importDefault(require("./config/connectdb"));
const errorHandler_1 = require("./middleware/errorHandler");
const validateEnvFile_1 = require("./services/validateEnvFile");
const app = (0, express_1.default)();
// middlewares
app.use(express_1.default.json());
app.use((0, compression_1.default)());
app.set('query parser', 'extended'); // add this line to parser query string if we have embbding data
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    credentials: true, // Allow sending cookies
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}));
app.use((0, cookie_parser_1.default)()); // parser cookies
try {
    const result = validateEnvFile_1.envSchema.safeParse(process.env);
    if (!result.success) {
        console.error("Invalid environment variables:");
        console.error(result.error.format());
        process.exit(1);
    }
    (0, connectdb_1.default)();
    app.use('/api/v1', index_1.default);
    app.use(errorHandler_1.errorHandler);
    app.listen(process.env.PORT, () => {
        console.log('server listen to PORT', process.env.PORT);
    });
}
catch (e) {
    console.log("server stop runing withi error", e?.message);
    process.exit(1);
}
