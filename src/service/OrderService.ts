//@ts-ignore
import client from "../database/database";
import {ProductService} from "./ProductService";
import {Product} from "../model/Product";
import {PoolClient, QueryResult} from "pg";
import {OrderDetailsService} from './OrderDetailsService';
import {OrderDetailsDTO, OrderResponseDTO} from "../DTO/OrderResponseDTO";

const productService: ProductService = new ProductService();
const orderDetailsService: OrderDetailsService = new OrderDetailsService();

export class OrderService {

    async index(): Promise<OrderResponseDTO[]> {
        const sql: string = 'SELECT * FROM orders ORDER BY id ASC';
        const sql2: string = 'SELECT product_id, quantity FROM orderDetails WHERE order_id =($1)';
        try {
            //@ts-ignore
            const conn: PoolClient = await client.connect();
            const orders: QueryResult<OrderResponseDTO> = await conn.query(sql);
            for (let o of orders.rows){
                let orderDetails: QueryResult<OrderDetailsDTO> =  await  conn.query(sql2, [o.id]);
                o.orderDetails = orderDetails.rows;
            }
            conn.release();
            return orders.rows;
        } catch (err) {
            throw new Error("No order found");
        }
    }

    async show(id: number): Promise<OrderResponseDTO> {
        try {
            const sql: string = 'SELECT * FROM orders WHERE id =($1)';
            const sql2: string = 'SELECT product_id, quantity FROM orderDetails WHERE order_id =($1)';
            //@ts-ignore
            const conn: PoolClient = await client.connect();
            const result: QueryResult<OrderResponseDTO> = await conn.query(sql, [id]);
            const orderDetails: QueryResult<OrderDetailsDTO> =  await  conn.query(sql2, [id]);
            conn.release();
            result.rows[0].orderDetails = orderDetails.rows;
            return result.rows[0];
        } catch (err) {
            throw new Error(`No order found with id: ${id} ERR: ${err}`);
        }
    }

    async create(userId: number, orderDetails: OrderDetailsDTO[]): Promise<OrderResponseDTO> {
        const sql: string = 'INSERT INTO orders(user_id, order_number, total_quantity, total_price, status)values($1, $2, $3, $4, $5) RETURNING *'
        let totalQuantity: number = 0;
        let totalPrice: number = 0.0;
        const orderNumber: number = Math.floor(Math.random() * 10989989898787687);
        const status: string = 'Created';

        for (let od of orderDetails) {
            let product: Product = await productService.show(od.product_id);
            totalQuantity = totalQuantity + od.quantity;

            totalPrice = totalPrice + (od.quantity * product.price);
        }
        try {
            //@ts-ignore
            const conn: PoolClient = await client.connect();
            const result: QueryResult<OrderResponseDTO>   = await conn.query(sql, [userId, orderNumber, totalQuantity, totalPrice, status]);
            const order: OrderResponseDTO  = result.rows[0];

            order.orderDetails = [];
            for (let od of orderDetails) {
             let orderDetails =   await orderDetailsService.create(order.id, od);
                order.orderDetails.push(od);
            }
            conn.release();
            return order;
        } catch (err) {
            console.log(err)
            throw new Error(`Failed to create order.. ${err}`);
        }

    }

    async update(id: number, status: string): Promise<OrderResponseDTO> {
        const sql = 'UPDATE orders SET status=$1, updated_at=$2 WHERE id = $3 RETURNING *';
        const sql2: string = 'SELECT product_id, quantity FROM orderDetails WHERE order_id =($1)';
        try {
            //@ts-ignore
            const conn: PoolClient = await client.connect();
            const result: QueryResult<OrderResponseDTO> = await conn.query(sql, [status, new Date(), id]);
            const orderDetails: QueryResult<OrderDetailsDTO> =  await  conn.query(sql2, [id]);
            conn.release();
            result.rows[0].orderDetails = orderDetails.rows;
            return result.rows[0];
        } catch (Err) {
            throw new Error(`Failed to update order with id: ${id}`);
        }
    }

    async getByUser(id: number): Promise<OrderResponseDTO[]> {
        const sql1: string = 'SELECT * FROM orders WHERE user_id =($1)';
        const sql2: string = 'SELECT product_id, quantity FROM orderDetails WHERE order_id =($1)';
        try {
            //@ts-ignore
            const conn: PoolClient = await client.connect();
            const orders: QueryResult<OrderResponseDTO> = await conn.query(sql1, [id]);
            for (let o of orders.rows){
                let orderDetails: QueryResult<OrderDetailsDTO> =  await  conn.query(sql2, [o.id]);
                o.orderDetails = orderDetails.rows;
            }
            conn.release();
            return orders.rows;
        } catch (err) {
            throw new Error(`No order found with user with id: ${id}, err: ${err}`);
        }
    }

    async delete(id: number): Promise<string> {
        const sql: string = 'DELETE FROM orders WHERE id = ($1)';
        try {
            //@ts-ignore
            const conn: PoolClient = await client.connect();
            await conn.query(sql, [id]);
            conn.release();
            return `Order with id ${id} deleted successfully`;
        } catch (err) {
            throw new Error(`Failed to delete order with id: ${id} Err: ${err}`);
        }
    }


}