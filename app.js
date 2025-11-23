"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = createApp;
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
require("express-async-errors");
const routes_1 = __importDefault(require("./src/modules/auth/routes"));
const routes_2 = __importDefault(require("./src/modules/users/routes"));
const routes_3 = __importDefault(require("./src/modules/books/routes"));
const routes_4 = __importDefault(require("./src/modules/borrow/routes"));
const routes_5 = __importDefault(require("./src//modules/reports/routes"));
const error_middleware_1 = require("./src/middlewares/error.middleware");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function createApp() {
    const app = (0, express_1.default)();
    app.use((0, helmet_1.default)());
    app.use((0, morgan_1.default)('dev'));
    app.use(express_1.default.json());
    app.use('/api/auth', routes_1.default);
    app.use('/api/users', routes_2.default);
    app.use('/api/books', routes_3.default);
    app.use('/api', routes_4.default);
    app.use('/api/reports', routes_5.default);
    app.get('/', (req, res) => res.json({ ok: true }));
    app.use(error_middleware_1.errorHandler);
    return app;
}
