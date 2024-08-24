"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderDetailsDTO = exports.OrderResponseDTO = void 0;
var OrderResponseDTO = /** @class */ (function () {
    function OrderResponseDTO() {
        this.id = 0;
        this.order_number = 0;
        this.orderDetails = [];
        this.user_id = 0;
        this.status = '';
        this.total_quantity = 0;
        this.total_price = 0;
        this.created_at = new Date();
        this.updated_at = new Date();
    }
    return OrderResponseDTO;
}());
exports.OrderResponseDTO = OrderResponseDTO;
var OrderDetailsDTO = /** @class */ (function () {
    function OrderDetailsDTO() {
        this.product_id = 0;
        this.quantity = 0;
    }
    return OrderDetailsDTO;
}());
exports.OrderDetailsDTO = OrderDetailsDTO;
//# sourceMappingURL=OrderResponseDTO.js.map