"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var product_routes_1 = require("./handlers/product_routes");
var order_routes_1 = require("./handlers/order_routes");
var users_routes_1 = require("./handlers/users_routes");
var categoryRoutes_1 = require("./handlers/categoryRoutes");
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//let envFile: string = `.env.${process.env.NODE_ENV}`;
//dotenv.config({ path: envFile});
//console.log("ENV 1 :",envFile)
//console.log("process.env.ENV ", { path: path.join(__dirname, `.env.${process.env.NODE_ENV}`)})
var PORT = 3000;
exports.app = (0, express_1.default)();
exports.app.use(body_parser_1.default.json());
exports.app.get('/', function (req, res) {
    res.send('Hello World!');
});
exports.app.listen(PORT, function () {
    console.log("starting app on: ".concat(PORT));
});
(0, product_routes_1.product_routes)(exports.app);
(0, order_routes_1.order_routes)(exports.app);
(0, categoryRoutes_1.category_routes)(exports.app);
(0, users_routes_1.users_routes)(exports.app);
//# sourceMappingURL=server.js.map