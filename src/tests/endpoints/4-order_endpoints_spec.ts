import {app} from '../../server';
import request from 'supertest';
import {before, describe} from "node:test";
import {OrderDetailsDTO} from "../../DTO/OrderResponseDTO";
import jwt from "jsonwebtoken";

describe('Order endpoints', () => {
    let token: string;
    // Generate a token for testing
    before(async () => {
        const data = {
            id: Number,
            time: Date(),
            username: "Nguyen"
        }
        // Generate a token for testing
        token = jwt.sign({data}, process.env.TOKEN_SECRET!);
    });

    it('should create a new order', async () => {

        //@ts-ignore
        const orderDetails: OrderDetailsDTO[] = [
            {quantity: 2, product_id: 1},
            //  {quantity: 2, product_id: 7},
            // {quantity: 1, product_id: 8}
        ]
        //@ts-ignore
        const response = await request(app)
            .post('/orders')
            .set('Authorization', `Bearer ${token}`)
            .send({user_id: 1, orderDetails: orderDetails})
            .expect(201)

        expect(response.body).toEqual(
            {
                id: 2,
                total_quantity: 2,
                total_price: 410,
                user_id: 1,
                order_number: response.body.order_number,
                status: 'Created',
                created_at: response.body.created_at,
                updated_at: response.body.updated_at,
                orderDetails: [{quantity: 2, product_id: 1}]
            });

        expect(response.body.id).toEqual(2);
        expect(response.body.total_quantity).toEqual(2);
        expect(response.body.total_price).toEqual(410);
        expect(response.body.order_number).not.toEqual(0);
        expect(response.body.created_at).not.toEqual('');

    });

    it('should return a list of orders', async () => {
        //@ts-ignore
        const response = await request(app)
            .get('/orders')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)

        expect(response.body).not.toEqual([])
        expect(response.body.length).not.toEqual(1);

        expect(response.body).toEqual([
            {
                id: 1,
                total_quantity: 1,
                total_price: 205,
                user_id: 1,
                order_number: response.body[0].order_number,
                status: 'Canceled',
                created_at: response.body[0].created_at,
                updated_at: response.body[0].updated_at,
                orderDetails: response.body[0].orderDetails//[{quantity: 1, product_id: 1}]
            },
            {
                id: 2,
                total_quantity: 2,
                total_price: 410,
                user_id: 1,
                order_number: response.body[1].order_number,
                status: 'Created',
                created_at: response.body[1].created_at,
                updated_at: response.body[1].updated_at,
                orderDetails: response.body[1].orderDetails
            }
        ])

    });

    it('should get order by id', async () => {
        //@ts-ignore
        const response = await request(app)
            .get('/orders/1')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body).toEqual({
            id: 1,
            total_quantity: 1,
            total_price: 205,
            user_id: 1,
            order_number: response.body.order_number,
            status: 'Canceled',
            created_at: response.body.created_at,
            updated_at: response.body.updated_at,
            orderDetails: response.body.orderDetails
        })
    });

    it('should update an order ', async () => {
        //@ts-ignore
        const response = await request(app)
            .patch('/orders/1')
            .set('Authorization', `Bearer ${token}`)
            .send({status: "Completed"})
            .expect(201);

        expect(response.body.status).toEqual("Completed");
    });

    it('should get all orders for a specific user', async () => {
        //@ts-ignore
        const response = await request(app)
            .get('/orders/getByUser/1')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body).toEqual([
            {
                id: 2,
                user_id: 1,
                order_number: response.body[0].order_number,
                total_quantity: 2,
                total_price: 410,
                status: 'Created',
                created_at: response.body[0].created_at,
                updated_at: response.body[0].updated_at,
                orderDetails: response.body[0].orderDetails
            },
            {
                id: 1,
                user_id: 1,
                order_number: response.body[1].order_number,
                total_quantity: 1,
                total_price: 205,
                status: 'Completed',
                created_at: response.body[1].created_at,
                updated_at: response.body[1].updated_at,
                orderDetails: response.body[1].orderDetails
            }

        ])

    })


    /*    it('should delete an order by id', async () => {
            //@ts-ignore
            const response = await request(app)
                .delete('/orders/1');
            expect(response.body).toEqual('Order with id 1 deleted successfully');
        });*/
})

