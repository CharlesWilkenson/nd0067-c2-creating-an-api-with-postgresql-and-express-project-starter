
import {OrderDetails} from "../model/OrderDetails";
//@ts-ignore
import client from '../database/database';
import {Pool, PoolClient, QueryResult} from "pg";
import {OrderDetailsDTO} from "../DTO/OrderResponseDTO";

export class OrderDetailsService {
    async index(): Promise<OrderDetails[]> {
        const sql: string = 'SELECT * FROM orderDetails';
        try {
            //@ts-ignore
            const conn: PoolClient = await client.connect();
            const result: QueryResult<OrderDetails> = await conn.query(sql);
            conn.release()
            return result.rows;
        } catch (e) {
            throw new Error("No order found");
        }
    }

    async show(id: number): Promise<OrderDetailsDTO> {
        const sql: string = 'SELECT * FROM orderDetails WHERE id =($1)';
        try {
            //@ts-ignore
            const conn: PoolClient  = await client.connect();
            const result: QueryResult<OrderDetails> = await conn.query(sql, [id]);
            conn.release()
            return result.rows[0];
        } catch (e) {
            throw new Error("No order found");
        }
    }

    async findByOrderID(id: number): Promise<OrderDetails[]> {
        const sql: string = 'SELECT * FROM orderDetails WHERE order_id =($1)';
        try {
            //@ts-ignore
            const conn: PoolClient  = await client.connect();
            const result: QueryResult<OrderDetails> = await conn.query(sql, [id]);
            conn.release()
            return result.rows;
        } catch (e) {
            throw new Error("No order found");
        }
    }


    async create(order_id: number, od: OrderDetailsDTO): Promise<OrderDetailsDTO>{
        const sql: string = 'INSERT INTO orderDetails(order_id, product_id, quantity)values($1, $2, $3) RETURNING *';
        try{
            //@ts-ignore
            const conn: PoolClient = await client.connect();
            const result: QueryResult<OrderDetailsDTO> = await conn.query(sql, [order_id, od.product_id, od.quantity]);
            conn.release();
            return result.rows[0];
        }catch (err){
            throw new Error(`Failed to create order.... ${err}`);
        }
    }
}

