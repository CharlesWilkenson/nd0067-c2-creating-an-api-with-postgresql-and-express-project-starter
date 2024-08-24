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
var server_1 = require("../../server");
var supertest_1 = __importDefault(require("supertest"));
var node_test_1 = require("node:test");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
(0, node_test_1.describe)('Product endpoints: ', function () {
    var token;
    (0, node_test_1.before)(function () { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            data = {
                id: Number,
                time: Date(),
                username: "Nguyen"
            };
            // Generate a token for testing
            token = jsonwebtoken_1.default.sign({ data: data }, process.env.TOKEN_SECRET);
            return [2 /*return*/];
        });
    }); });
    it('should return a list of products', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.app)
                        .get('/products')
                        .expect(200)];
                case 1:
                    response = _a.sent();
                    expect(response.body).not.toBeNull();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should return a list of products', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.app)
                        .get("/products")
                        .expect(200)];
                case 1:
                    response = _a.sent();
                    expect(response.body).not.toBeNull();
                    expect(response.body).toEqual([{
                            id: 1,
                            name: "Sneakers",
                            description: "Made of something",
                            brand: "Nike",
                            price: 205,
                            created_at: response.body[0].created_at,
                            updated_at: response.body[0].updated_at,
                            deleted_at: response.body[0].deleted_at,
                            category_id: 1
                        }]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should get a product by id', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.app)
                        .get("/products/1")
                        .expect(200)];
                case 1:
                    response = _a.sent();
                    expect(response.body.id).toEqual(1);
                    expect(response.body.name).toEqual("Sneakers");
                    expect(response.body.description).toEqual("Made of something");
                    expect(response.body.brand).toEqual("Nike");
                    expect(response.body.price).toEqual(205);
                    expect(response.body.category_id).toEqual(1);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should add a new product', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.app)
                        .post('/products')
                        .set('Authorization', "Bearer ".concat(token))
                        .send({
                        name: "Computer",
                        description: "CPU: 2.5 GHZ, Color: blue, RAM: 32, HDD: 500",
                        brand: "DELL",
                        price: 750,
                        categoryId: 7,
                    })
                        .expect(201)];
                case 1:
                    response = _a.sent();
                    expect(response.body.id).toEqual(2);
                    expect(response.body.name).toEqual('Computer');
                    expect(response.body.description).toEqual("CPU: 2.5 GHZ, Color: blue, RAM: 32, HDD: 500");
                    expect(response.body.brand).toEqual('DELL');
                    expect(response.body.price).toEqual(750);
                    expect(response.body.category_id).toEqual(7);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should return a list of products after adding a new one REST API', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.app)
                        .get("/products")
                        .expect(200)];
                case 1:
                    response = _a.sent();
                    expect(response.body).not.toBeNull();
                    expect(response.body).toEqual([{
                            id: 1,
                            name: "Sneakers",
                            description: "Made of something",
                            brand: "Nike",
                            price: 205,
                            created_at: response.body[0].created_at,
                            updated_at: response.body[0].updated_at,
                            deleted_at: response.body[0].deleted_at,
                            category_id: 1
                        },
                        {
                            id: 2,
                            name: "Computer",
                            description: "CPU: 2.5 GHZ, Color: blue, RAM: 32, HDD: 500",
                            brand: "DELL",
                            price: 750,
                            created_at: response.body[1].created_at,
                            updated_at: response.body[1].updated_at,
                            deleted_at: response.body[1].deleted_at,
                            category_id: 7,
                        }
                    ]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should update a product', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.app)
                        .put('/products/2')
                        .set('Authorization', "Bearer ".concat(token))
                        .send({
                        name: "Computer",
                        description: "CPU: 2.5 GHZ, Color: blue, RAM: 32, HDD: 500",
                        brand: "HP",
                        price: 850,
                        categoryId: 7,
                    })
                        .expect(201)];
                case 1:
                    response = _a.sent();
                    expect(response.body.id).toEqual(2);
                    expect(response.body.name).toEqual('Computer');
                    expect(response.body.description).toEqual("CPU: 2.5 GHZ, Color: blue, RAM: 32, HDD: 500");
                    expect(response.body.brand).toEqual('HP');
                    expect(response.body.price).toEqual(850);
                    expect(response.body.category_id).toEqual(7);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should delete a product REST API', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.app)
                        .delete('/products/2')
                        .set('Authorization', "Bearer ".concat(token))];
                case 1:
                    response = _a.sent();
                    expect(response.body).toEqual("Product with id 2 deleted successfully");
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=3-product_endpoints_spec.js.map