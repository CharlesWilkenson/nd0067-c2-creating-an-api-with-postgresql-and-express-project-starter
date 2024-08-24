import {Product} from "../model/Product";
import {QueryResult} from "pg";

export class OrderResponseDTO {
    id: number;
    order_number: number;
    user_id: number;
    status: string
    total_quantity: number;
    total_price: number;
    orderDetails:  OrderDetailsDTO[];
    created_at: Date;
    updated_at: Date;

    constructor() {
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
}

export class OrderDetailsDTO{
    product_id: number;
    quantity:number;

    constructor() {
        this.product_id = 0;
        this.quantity = 0;
    }

}