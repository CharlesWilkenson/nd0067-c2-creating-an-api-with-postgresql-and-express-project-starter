import dotenv from 'dotenv';
import {Pool, PoolClient} from 'pg';

dotenv.config()
const ENV = process.env.NODE_ENV;
let client;

if(ENV === 'dev') {
    dotenv.config({path: ".env.dev"});
    console.log(ENV)
}

if(ENV === 'test') {
    dotenv.config({path: ".env.test"});
    console.log(ENV)
}

const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_PORT,
} = process.env;

console.log(process.env.POSTGRES_USER)
console.log(process.env.POSTGRES_PASSWORD)

const dbPort: number = Number(POSTGRES_PORT);

const PASSWORD: string = POSTGRES_PASSWORD + ""

client = new Pool({
    user: POSTGRES_USER,
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    password: PASSWORD,
    port: dbPort,
    idleTimeoutMillis: 30000, // 30 seconds
    min: 2,
    max: 20,
    connectionTimeoutMillis: 15000
});

client.on('error', (err: Error, client: PoolClient) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
})

export default client;