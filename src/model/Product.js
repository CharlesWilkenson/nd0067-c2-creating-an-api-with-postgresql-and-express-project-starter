"use strict";
// @ts-ignore
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
var Product = /** @class */ (function () {
    function Product() {
        this.id = 0;
        this.name = '';
        this.description = '';
        this.brand = '';
        this.price = 0;
        this.category_id = 0;
        this.created_at = new Date();
        this.updated_at = new Date();
        this.deleted_at = new Date();
    }
    return Product;
}());
exports.Product = Product;
//# sourceMappingURL=Product.js.map