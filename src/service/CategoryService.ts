// @ts-ignore
import client from '../database/database';
import {Category} from "../model/Category";
import {PoolClient, QueryResult} from "pg";

export class CategoryService {
    async index(): Promise<Category[]> {
        const sql = 'SELECT * FROM category ORDER BY id ASC';
        try {
            //@ts-ignore
            const conn: PoolClient = await client.connect();
            const result: QueryResult<Category> = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error("No category found");
        }
    }

    async show(id: number): Promise<Category> {
          try {
        const sql = 'SELECT * FROM category WHERE id =($1)';
        //@ts-ignore
        const conn:PoolClient = await client.connect();
        const result: QueryResult<Category> = await conn.query(sql, [id]);
        conn.release();
        return result.rows[0];
             } catch (err) {
          throw new Error(`No category found Err: ${err}`);
          }
    }

    async create(c: Category): Promise<Category> {
        const sql = 'INSERT INTO category(name)values($1) RETURNING *';
        try {
            //@ts-ignore
            const conn: PoolClient = await client.connect();
            const result: QueryResult<Category> = await conn.query(sql, [c.name]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Failed to create new category. Error: ${err}`);
        }

    }

    async update(id: number, c: Category): Promise<Category> {
        const sql: string = 'UPDATE category  SET name =$1 WHERE id = $2 RETURNING *';
        try {
            //@ts-ignore
            const conn: PoolClient = await client.connect();
            const result: QueryResult<Category> = await conn.query(sql, [c.name, id ]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Failed to category category. Error: ${err}`);
        }

    }

}
