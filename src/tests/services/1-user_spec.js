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
var userService_1 = require("../../service/userService");
var node_test_1 = require("node:test");
var service = new userService_1.UserService();
(0, node_test_1.describe)('User Model', function () {
    it('should have a register method', function () {
        expect(service.register).toBeDefined();
    });
    it('should have an authenticate method', function () {
        expect(service.authenticate).toBeDefined();
    });
    it('should have an update method', function () {
        expect(service.update).toBeDefined();
    });
    it('Should have a show method', function () {
        expect(service.show).toBeDefined();
    });
    it('Should have an index method', function () {
        expect(service.index).toBeDefined();
    });
    it('Should register a user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, service.register({
                        username: "wilki",
                        password: "pass123",
                        firstname: 'Wilkenson',
                        lastname: 'Charles'
                    })];
                case 1:
                    user = _a.sent();
                    expect(user).toEqual({
                        id: 1,
                        username: "wilki",
                        password: "",
                        created_at: user.created_at,
                        updated_at: user.updated_at,
                        firstname: 'Wilkenson',
                        lastname: 'Charles'
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should get a user by id', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, service.show(1)];
                case 1:
                    user = _a.sent();
                    expect(user).toEqual({
                        id: 1,
                        username: "wilki",
                        created_at: user.created_at,
                        updated_at: user.updated_at,
                        firstname: 'Wilkenson',
                        lastname: 'Charles'
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should check if a specific user exists', function () { return __awaiter(void 0, void 0, void 0, function () {
        var username, isExist;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    username = "wilki";
                    return [4 /*yield*/, service.isUserExists(username)];
                case 1:
                    isExist = _a.sent();
                    expect(isExist).toEqual(true);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should update a user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, service.update(1, {
                        username: "wilki",
                        firstname: 'Kenfils',
                        lastname: 'Charles'
                    })];
                case 1:
                    user = _a.sent();
                    expect(user).toEqual({
                        id: 1,
                        username: "wilki",
                        password: "",
                        created_at: user.created_at,
                        updated_at: user.updated_at,
                        firstname: 'Kenfils',
                        lastname: 'Charles'
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should return all users', function () { return __awaiter(void 0, void 0, void 0, function () {
        var users;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, service.index()];
                case 1:
                    users = _a.sent();
                    expect(users).toEqual([{
                            id: 1,
                            username: "wilki",
                            created_at: users[0].created_at,
                            updated_at: users[0].updated_at,
                            firstname: 'Kenfils',
                            lastname: 'Charles'
                        }]);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=1-user_spec.js.map