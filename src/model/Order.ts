export class Order {
    id: number;
    order_number: number;
    totalQuantity: number;
    totalPrice: number;
    created_at: Date;
    updated_at: Date;
    user_id: number;
    status: string

    constructor() {
        this.id = 0;
        this.order_number = 0;
        this.totalQuantity = 0;
        this.totalPrice = 0;
        this.created_at = new Date();
        this.updated_at = new Date();
        this.user_id = 0;
        this.status = '';
    }
}

