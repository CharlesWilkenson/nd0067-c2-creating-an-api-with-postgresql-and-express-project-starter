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
exports.UserService = void 0;
// @ts-ignore
var database_1 = __importDefault(require("../database/database"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var dotenv_1 = __importDefault(require("dotenv"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
var generateAccessToken = function (username) {
    //@ts-ignore
    var data = {
        id: Number,
        time: Date(),
        username: username
    };
    return jsonwebtoken_1.default.sign({ data: data }, process.env.TOKEN_SECRET);
};
var UserService = /** @class */ (function () {
    function UserService() {
    }
    UserService.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var conn, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query('SELECT id, username, firstname, lastname, created_at, updated_at FROM users')];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        err_1 = _a.sent();
                        throw new Error("failed to get new users");
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ;
    UserService.prototype.register = function (u) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, salt, hash, conn, result, user, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = 'INSERT INTO users(username, password, firstname, lastname, created_at)values($1, $2, $3, $4, $5)  RETURNING *';
                        return [4 /*yield*/, bcrypt_1.default.genSalt(parseInt(process.env.SALT_ROUNDS))];
                    case 1:
                        salt = _a.sent();
                        hash = bcrypt_1.default.hashSync(u.password, salt);
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 6]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 3:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql, [u.username, hash, u.firstname, u.lastname, new Date()])];
                    case 4:
                        result = _a.sent();
                        user = result.rows[0];
                        conn.release();
                        user.password = '';
                        return [2 /*return*/, user];
                    case 5:
                        err_2 = _a.sent();
                        throw new Error("Failed to create new user.  Err: ".concat(err_2));
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ;
    UserService.prototype.update = function (id, u) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, result, user, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = 'UPDATE  users SET username=$1, firstname=$2, lastname=$3, updated_at=$4 WHERE id=$5  RETURNING *';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 2:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql, [u.username, u.firstname, u.lastname, new Date(), id])];
                    case 3:
                        result = _a.sent();
                        user = result.rows[0];
                        conn.release();
                        user.password = '';
                        return [2 /*return*/, user];
                    case 4:
                        err_3 = _a.sent();
                        throw new Error("failed to update this user with id: ".concat(id, ".  Err: ").concat(err_3));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ;
    UserService.prototype.authenticate = function (username, password) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, result, existingUser, passwordMatch, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = 'SELECT username, password from users WHERE username = ($1)';
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql, [username])];
                    case 2:
                        result = _a.sent();
                        if (result.rows.length) {
                            existingUser = result.rows[0];
                            passwordMatch = bcrypt_1.default.compareSync(password, existingUser.password);
                            if (passwordMatch) {
                                return [2 /*return*/, generateAccessToken(username)];
                            }
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        err_4 = _a.sent();
                        throw new Error("Login failed.  Err: ".concat(err_4));
                    case 4: return [2 /*return*/, null];
                }
            });
        });
    };
    ;
    UserService.prototype.show = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, result, user, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = 'SELECT id, username, firstname, lastname, created_at, updated_at from users WHERE id = ($1)';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 2:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql, [id])];
                    case 3:
                        result = _a.sent();
                        user = result.rows[0];
                        conn.release();
                        return [2 /*return*/, user];
                    case 4:
                        err_5 = _a.sent();
                        throw new Error("failed to get new user with id ".concat(id, ".  Err: ").concat(err_5));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ;
    UserService.prototype.isUserExists = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, result, existingUser, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = 'SELECT DISTINCT username from users WHERE username = ($1)';
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql, [username])];
                    case 2:
                        result = _a.sent();
                        if (result.rows.length) {
                            existingUser = result.rows[0];
                            if (existingUser) {
                                return [2 /*return*/, true];
                            }
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        err_6 = _a.sent();
                        throw new Error("Err: ".concat(err_6));
                    case 4: return [2 /*return*/, false];
                }
            });
        });
    };
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=userService.js.map