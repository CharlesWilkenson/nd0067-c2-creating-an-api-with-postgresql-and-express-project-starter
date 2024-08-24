export class OrderDetails{
    id: number;
    product_id: number;
    order_id: number
    quantity:number;

    constructor(productId: number, orderId: number, quantity: number) {
        this.id = 0;
        this.product_id = productId;
        this.order_id = orderId;
        this.quantity = quantity;
    }


}




