"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
var Order = /** @class */ (function () {
    function Order() {
        this.id = 0;
        this.order_number = 0;
        this.totalQuantity = 0;
        this.totalPrice = 0;
        this.created_at = new Date();
        this.updated_at = new Date();
        this.user_id = 0;
        this.status = '';
    }
    return Order;
}());
exports.Order = Order;
//# sourceMappingURL=Order.js.map