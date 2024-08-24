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
exports.ProductService = void 0;
// @ts-ignore
var database_1 = __importDefault(require("../database/database"));
var ProductService = /** @class */ (function () {
    function ProductService() {
    }
    ProductService.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = 'SELECT * FROM product ORDER BY id ASC';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 2:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql)];
                    case 3:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows];
                    case 4:
                        err_1 = _a.sent();
                        throw new Error("No product found");
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ProductService.prototype.create = function (p) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = 'INSERT INTO product(name, description, brand, price, category_id)values($1, $2, $3, $4, $5) RETURNING *';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 2:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql, [p.name, p.description, p.brand, p.price, p.category_id])];
                    case 3:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 4:
                        err_2 = _a.sent();
                        throw new Error("Failed to create product. Error: ".concat(err_2));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ProductService.prototype.show = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, result, product, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = 'SELECT * FROM product WHERE id =($1)';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 2:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql, [id])];
                    case 3:
                        result = _a.sent();
                        product = result.rows[0];
                        conn.release();
                        return [2 /*return*/, product];
                    case 4:
                        err_3 = _a.sent();
                        throw new Error("ERROR: ".concat(err_3));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ProductService.prototype.destroy = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = 'DELETE FROM product WHERE id = ($1)';
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
                        return [2 /*return*/, "Product with id ".concat(id, " deleted successfully")];
                    case 4:
                        err_4 = _a.sent();
                        throw new Error("Failed to delete product with id: ".concat(id, ", Error: ").concat(err_4));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ProductService.prototype.update = function (id, p) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, result, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = 'UPDATE product SET name =$1, description=$2, brand=$3, price=$4, category_id=$5, updated_at=$6 WHERE id=$7 RETURNING *';
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql, [p.name, p.description, p.brand, p.price, p.category_id, new Date(), id])];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_5 = _a.sent();
                        throw new Error("Failed to update product with id: ".concat(id, ", Err: ").concat(err_5));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return ProductService;
}());
exports.ProductService = ProductService;
//# sourceMappingURL=ProductService.js.map