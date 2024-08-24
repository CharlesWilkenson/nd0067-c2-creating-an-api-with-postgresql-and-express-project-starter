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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
//@ts-ignore
var database_1 = __importDefault(require("../database/database"));
var ProductService_1 = require("./ProductService");
var OrderDetailsService_1 = require("./OrderDetailsService");
var productService = new ProductService_1.ProductService();
var orderDetailsService = new OrderDetailsService_1.OrderDetailsService();
var OrderService = /** @class */ (function () {
    function OrderService() {
    }
    OrderService.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sql, sql2, conn, orders, _i, _a, o, orderDetails, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        sql = 'SELECT * FROM orders ORDER BY id ASC';
                        sql2 = 'SELECT product_id, quantity FROM orderDetails WHERE order_id =($1)';
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 8, , 9]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 2:
                        conn = _b.sent();
                        return [4 /*yield*/, conn.query(sql)];
                    case 3:
                        orders = _b.sent();
                        _i = 0, _a = orders.rows;
                        _b.label = 4;
                    case 4:
                        if (!(_i < _a.length)) return [3 /*break*/, 7];
                        o = _a[_i];
                        return [4 /*yield*/, conn.query(sql2, [o.id])];
                    case 5:
                        orderDetails = _b.sent();
                        o.orderDetails = orderDetails.rows;
                        _b.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/, 4];
                    case 7:
                        conn.release();
                        return [2 /*return*/, orders.rows];
                    case 8:
                        err_1 = _b.sent();
                        throw new Error("No order found");
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    OrderService.prototype.show = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, sql2, conn, result, orderDetails, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        sql = 'SELECT * FROM orders WHERE id =($1)';
                        sql2 = 'SELECT product_id, quantity FROM orderDetails WHERE order_id =($1)';
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        return [4 /*yield*/, conn.query(sql2, [id])];
                    case 3:
                        orderDetails = _a.sent();
                        conn.release();
                        result.rows[0].orderDetails = orderDetails.rows;
                        return [2 /*return*/, result.rows[0]];
                    case 4:
                        err_2 = _a.sent();
                        throw new Error("No order found with id: ".concat(id, " ERR: ").concat(err_2));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    OrderService.prototype.create = function (userId, orderDetails) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, totalQuantity, totalPrice, orderNumber, status, _i, orderDetails_1, od, product, conn, result, order, _a, orderDetails_2, od, orderDetails_3, err_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        sql = 'INSERT INTO orders(user_id, order_number, total_quantity, total_price, status)values($1, $2, $3, $4, $5) RETURNING *';
                        totalQuantity = 0;
                        totalPrice = 0.0;
                        orderNumber = Math.floor(Math.random() * 10989989898787687);
                        status = 'Created';
                        _i = 0, orderDetails_1 = orderDetails;
                        _b.label = 1;
                    case 1:
                        if (!(_i < orderDetails_1.length)) return [3 /*break*/, 4];
                        od = orderDetails_1[_i];
                        return [4 /*yield*/, productService.show(od.product_id)];
                    case 2:
                        product = _b.sent();
                        totalQuantity = totalQuantity + od.quantity;
                        totalPrice = totalPrice + (od.quantity * product.price);
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        _b.trys.push([4, 11, , 12]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 5:
                        conn = _b.sent();
                        return [4 /*yield*/, conn.query(sql, [userId, orderNumber, totalQuantity, totalPrice, status])];
                    case 6:
                        result = _b.sent();
                        order = result.rows[0];
                        order.orderDetails = [];
                        _a = 0, orderDetails_2 = orderDetails;
                        _b.label = 7;
                    case 7:
                        if (!(_a < orderDetails_2.length)) return [3 /*break*/, 10];
                        od = orderDetails_2[_a];
                        return [4 /*yield*/, orderDetailsService.create(order.id, od)];
                    case 8:
                        orderDetails_3 = _b.sent();
                        order.orderDetails.push(od);
                        _b.label = 9;
                    case 9:
                        _a++;
                        return [3 /*break*/, 7];
                    case 10:
                        conn.release();
                        return [2 /*return*/, order];
                    case 11:
                        err_3 = _b.sent();
                        console.log(err_3);
                        throw new Error("Failed to create order.. ".concat(err_3));
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    OrderService.prototype.update = function (id, status) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, sql2, conn, result, orderDetails, Err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = 'UPDATE orders SET status=$1, updated_at=$2 WHERE id = $3 RETURNING *';
                        sql2 = 'SELECT product_id, quantity FROM orderDetails WHERE order_id =($1)';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 2:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql, [status, new Date(), id])];
                    case 3:
                        result = _a.sent();
                        return [4 /*yield*/, conn.query(sql2, [id])];
                    case 4:
                        orderDetails = _a.sent();
                        conn.release();
                        result.rows[0].orderDetails = orderDetails.rows;
                        return [2 /*return*/, result.rows[0]];
                    case 5:
                        Err_1 = _a.sent();
                        throw new Error("Failed to update order with id: ".concat(id));
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    OrderService.prototype.getByUser = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql1, sql2, conn, orders, _i, _a, o, orderDetails, err_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        sql1 = 'SELECT * FROM orders WHERE user_id =($1)';
                        sql2 = 'SELECT product_id, quantity FROM orderDetails WHERE order_id =($1)';
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 8, , 9]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 2:
                        conn = _b.sent();
                        return [4 /*yield*/, conn.query(sql1, [id])];
                    case 3:
                        orders = _b.sent();
                        _i = 0, _a = orders.rows;
                        _b.label = 4;
                    case 4:
                        if (!(_i < _a.length)) return [3 /*break*/, 7];
                        o = _a[_i];
                        return [4 /*yield*/, conn.query(sql2, [o.id])];
                    case 5:
                        orderDetails = _b.sent();
                        o.orderDetails = orderDetails.rows;
                        _b.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/, 4];
                    case 7:
                        conn.release();
                        return [2 /*return*/, orders.rows];
                    case 8:
                        err_4 = _b.sent();
                        throw new Error("No order found with user with id: ".concat(id, ", err: ").concat(err_4));
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    OrderService.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = 'DELETE FROM orders WHERE id = ($1)';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 2:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql, [id])];
                    case 3:
                        _a.sent();
                        conn.release();
                        return [2 /*return*/, "Order with id ".concat(id, " deleted successfully")];
                    case 4:
                        err_5 = _a.sent();
                        throw new Error("Failed to delete order with id: ".concat(id, " Err: ").concat(err_5));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return OrderService;
}());
exports.OrderService = OrderService;
//# sourceMappingURL=OrderService.js.map