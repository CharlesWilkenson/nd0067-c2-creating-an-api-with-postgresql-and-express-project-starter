import express, { Request, Response } from 'express'
import bodyParser from 'body-parser';
import { product_routes } from './handlers/product_routes';
import { order_routes} from "./handlers/order_routes";
import { users_routes } from './handlers/users_routes'
import { category_routes} from "./handlers/categoryRoutes";
import dotenv from 'dotenv';
dotenv.config()

//let envFile: string = `.env.${process.env.NODE_ENV}`;

//dotenv.config({ path: envFile});

//console.log("ENV 1 :",envFile)
//console.log("process.env.ENV ", { path: path.join(__dirname, `.env.${process.env.NODE_ENV}`)})

const PORT: number = 3000;
export const app: express.Application = express();

app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!');
})


app.listen(PORT, function () {
    console.log(`starting app on: ${PORT}`);
})

product_routes(app);
order_routes(app);
category_routes(app)
users_routes(app);



