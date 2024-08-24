"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.order_routes = void 0;
var middleware_1 = require("./middleware");
var OrderService_1 = require("../service/OrderService");
var userService_1 = require("../service/userService");
var ProductService_1 = require("../service/ProductService");
var service = new OrderService_1.OrderService();
var userService = new userService_1.UserService();
var productService = new ProductService_1.ProductService();
var getOrders = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, service.index()];
            case 1:
                result = _a.sent();
                res.status(200).json(result);
                return [2 /*return*/];
        }
    });
}); };
var getOrderById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, order;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = parseInt(req.params.id);
                return [4 /*yield*/, service.show(id)];
            case 1:
                order = _a.sent();
                if (!order)
                    res.status(401).send({ statusCode: 404, message: "Order not found with id ".concat(id) });
                res.status(200).json(order);
                return [2 /*return*/];
        }
    });
}); };
var create = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user_id, orderDetails, user, _i, orderDetails_1, od, product, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user_id = parseInt(req.body.user_id);
                orderDetails = req.body.orderDetails;
                return [4 /*yield*/, userService.show(user_id)];
            case 1:
                user = _a.sent();
                if (!user) {
                    res.status(401).send({ statusCode: 404, message: "User not found with id ".concat(user_id) });
                }
                _i = 0, orderDetails_1 = orderDetails;
                _a.label = 2;
            case 2:
                if (!(_i < orderDetails_1.length)) return [3 /*break*/, 5];
                od = orderDetails_1[_i];
                return [4 /*yield*/, productService.show(od.product_id)];
            case 3:
                product = _a.sent();
                if (!product) {
                    res.status(401).send({ statusCode: 404, message: "Product not found with id ".concat(od.product_id) });
                }
                _a.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5: return [4 /*yield*/, service.create(user_id, orderDetails)];
            case 6:
                result = _a.sent();
                res.status(201).json(result);
                return [2 /*return*/];
        }
    });
}); };
var deleteOrder = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = parseInt(req.params.id);
                return [4 /*yield*/, service.delete(id)];
            case 1:
                result = _a.sent();
                res.json(result);
                return [2 /*return*/];
        }
    });
}); };
var getByUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = parseInt(req.params.id);
                return [4 /*yield*/, userService.show(id)];
            case 1:
                user = _a.sent();
                if (!user) {
                    res.status(401).send({ statusCode: 404, message: "User not found with id ".concat(id) });
                }
                return [4 /*yield*/, service.getByUser(id)];
            case 2:
                result = _a.sent();
                res.status(200).json(result);
                return [2 /*return*/];
        }
    });
}); };
var update = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, status, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = parseInt(req.params.id);
                status = req.body.status;
                return [4 /*yield*/, service.update(id, status)];
            case 1:
                result = _a.sent();
                res.status(201).json(result);
                return [2 /*return*/];
        }
    });
}); };
var order_routes = function (app) {
    app.get('/orders/:id', middleware_1.authenticateJWT, getOrderById);
    app.delete('/orders/:id', middleware_1.authenticateJWT, deleteOrder);
    app.get('/orders', middleware_1.authenticateJWT, getOrders);
    app.post('/orders', middleware_1.authenticateJWT, create);
    app.get('/orders/getByUser/:id', middleware_1.authenticateJWT, getByUser);
    app.patch('/orders/:id', middleware_1.authenticateJWT, update);
};
exports.order_routes = order_routes;
//# sourceMappingURL=order_routes.js.map