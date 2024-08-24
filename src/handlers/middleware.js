"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Middleware for JWT authentication
var authenticateJWT = function (req, res, next) {
    var authorizationHeader = req.headers['authorization']; //req.headers.authorization;
    if (authorizationHeader != null) {
        var token = authorizationHeader.split(' ')[1];
        if (token != null) {
            try {
                jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
                next();
            }
            catch (err) {
                res.status(400).json({ message: 'Invalid token' });
            }
        }
    }
    else {
        res.status(401).json({ message: 'Token must be provided' });
    }
};
exports.authenticateJWT = authenticateJWT;
//# sourceMappingURL=middleware.js.map