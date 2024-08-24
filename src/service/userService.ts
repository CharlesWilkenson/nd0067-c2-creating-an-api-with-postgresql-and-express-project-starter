// @ts-ignore
import client from '../database/database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import {User} from '../model/User';
import {PoolClient, QueryResult} from "pg";

dotenv.config();

const generateAccessToken = (username: string): string => {
    //@ts-ignore
    const data = {
        id: Number,
        time: Date(),
        username: username
    }
   return  jwt.sign({data}, process.env.TOKEN_SECRET!);
};

export class UserService {

    async index(): Promise<User[]> {
        try {
            // @ts-ignore
            const conn: PoolClient = await client.connect();
            const result: QueryResult<User> = await conn.query('SELECT id, username, firstname, lastname, created_at, updated_at FROM users');
            conn.release()
            return result.rows;
        } catch (err) {
            throw new Error(`failed to get new users`);
        }
    };


    async register(u: User): Promise<User> {
        const sql: string = 'INSERT INTO users(username, password, firstname, lastname, created_at)values($1, $2, $3, $4, $5)  RETURNING *';
        //@ts-ignore
        const salt: string = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS!));
        const hash: string = bcrypt.hashSync(u.password, salt);
        try {
            // @ts-ignore
            const conn: PoolClient = await client.connect();
            const result: QueryResult<User> = await conn.query(sql, [u.username, hash, u.firstname, u.lastname, new Date()]);
            const user: User = result.rows[0];
            conn.release()
            user.password = '';
            return user;
        } catch (err) {
            throw new Error(`Failed to create new user.  Err: ${err}`);
        }
    };

    async update(id: number, u: User): Promise<User> {
        const sql: string = 'UPDATE  users SET username=$1, firstname=$2, lastname=$3, updated_at=$4 WHERE id=$5  RETURNING *';
        //@ts-ignore
        try {
            // @ts-ignore
            const conn: PoolClient = await client.connect();
            const result: QueryResult<User> = await conn.query(sql, [u.username, u.firstname, u.lastname, new Date(), id]);
            const user: User = result.rows[0];
            conn.release();
            user.password = '';
            return user;
        } catch (err) {
            throw new Error(`failed to update this user with id: ${id}.  Err: ${err}`);
        }
    };

    async authenticate(username: string, password: string): Promise<string | null> {
        try {
            const sql: string = 'SELECT username, password from users WHERE username = ($1)';
            //@ts-ignore
            const conn: PoolClient = await client.connect();
            const result: QueryResult<User> = await conn.query(sql, [username]);

            if (result.rows.length) {
                const existingUser: User = result.rows[0];
                const passwordMatch: boolean = bcrypt.compareSync(
                    password,
                    existingUser.password
                );
                if (passwordMatch) {
                    return generateAccessToken(username);
                }
            }
        } catch (err) {
            throw new Error(`Login failed.  Err: ${err}`);
        }
        return null;
    };

    async show(id: number): Promise<User> {
        const sql: string = 'SELECT id, username, firstname, lastname, created_at, updated_at from users WHERE id = ($1)';
        try {
            // @ts-ignore
            const conn: PoolClient = await client.connect();
            const result: QueryResult<User> = await conn.query(sql, [id]);
            const user: User = result.rows[0];
            conn.release()
            return user;
        } catch (err) {
            throw new Error(`failed to get new user with id ${id}.  Err: ${err}`);
        }
    };

    async isUserExists(username: string): Promise<boolean> {
        try {
            const sql: string = 'SELECT DISTINCT username from users WHERE username = ($1)';
            //@ts-ignore
            const conn: PoolClient = await client.connect();
            const result: QueryResult<User> = await conn.query(sql, [username]);
            if (result.rows.length) {
                const existingUser: User = result.rows[0];
                if (existingUser) {
                    return true;
                }
            }
        } catch (err) {
            throw new Error(`Err: ${err}`);
        }
        return false;
    }

}