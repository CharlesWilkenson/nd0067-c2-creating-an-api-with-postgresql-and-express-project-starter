"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var pg_1 = require("pg");
dotenv_1.default.config();
var ENV = process.env.NODE_ENV;
var client;
if (ENV === 'dev') {
    dotenv_1.default.config({ path: ".env.dev" });
    console.log(ENV);
}
if (ENV === 'test') {
    dotenv_1.default.config({ path: ".env.test" });
    console.log(ENV);
}
var _a = process.env, POSTGRES_HOST = _a.POSTGRES_HOST, POSTGRES_DB = _a.POSTGRES_DB, POSTGRES_USER = _a.POSTGRES_USER, POSTGRES_PASSWORD = _a.POSTGRES_PASSWORD, POSTGRES_PORT = _a.POSTGRES_PORT;
console.log(process.env.POSTGRES_USER);
console.log(process.env.POSTGRES_PASSWORD);
var dbPort = Number(POSTGRES_PORT);
var PASSWORD = POSTGRES_PASSWORD + "";
client = new pg_1.Pool({
    user: POSTGRES_USER,
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    password: PASSWORD,
    port: dbPort,
    idleTimeoutMillis: 30000, // 30 seconds
    min: 2,
    max: 20,
    connectionTimeoutMillis: 15000
});
client.on('error', function (err, client) {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});
exports.default = client;
//# sourceMappingURL=database.js.map