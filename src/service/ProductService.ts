// @ts-ignore
import client from '../database/database';
import {Product} from "../model/Product";
import {PoolClient, QueryResult} from "pg";

export class ProductService {
    async index(): Promise<Product[]> {
        const sql: string = 'SELECT * FROM product ORDER BY id ASC';
        try {
            //@ts-ignore
            const conn: PoolClient = await client.connect();
            const result: QueryResult<Product> = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error("No product found");
        }
    }


    async create(p: Product): Promise<Product> {
        const sql: string = 'INSERT INTO product(name, description, brand, price, category_id)values($1, $2, $3, $4, $5) RETURNING *';
        try {
            //@ts-ignore
            const conn: PoolClient = await client.connect();
            const result: QueryResult<Product> = await conn.query(sql, [p.name, p.description, p.brand, p.price, p.category_id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Failed to create product. Error: ${err}`);
        }

    }

    async show(id: number): Promise<Product> {
        const sql: string = 'SELECT * FROM product WHERE id =($1)';
        try {
            //@ts-ignore
            const conn: PoolClient = await client.connect();
            const result: QueryResult<Product> | string = await conn.query(sql, [id]);
            const product: Product = result.rows[0];
            conn.release();
            return product;
        } catch (err) {
            throw new Error(`ERROR: ${err}`)
        }
    }

    async destroy(id: number): Promise<string> {
        const sql: string = 'DELETE FROM product WHERE id = ($1)';
        try {
            //@ts-ignore
            const conn: PoolClient = await client.connect();
            await conn.query(sql, [id]);
            conn.release();
            return `Product with id ${id} deleted successfully`;
        } catch (err) {
            throw new Error(`Failed to delete product with id: ${id}, Error: ${err}`);
        }

    }


    async update(id: number, p: Product): Promise<Product> {
        try {
            const sql: string = 'UPDATE product SET name =$1, description=$2, brand=$3, price=$4, category_id=$5, updated_at=$6 WHERE id=$7 RETURNING *';
            //@ts-ignore
            const conn: PoolClient = await client.connect();
            const result: QueryResult<Product> = await conn.query(sql, [p.name, p.description, p.brand, p.price, p.category_id, new Date(), id]);
            return result.rows[0];
        } catch (err) {
            throw new Error(`Failed to update product with id: ${id}, Err: ${err}`);
        }
    }

}