import {app} from '../../server';
import request from 'supertest';
import {before, describe} from "node:test";
import jwt from "jsonwebtoken";


describe('Product endpoints: ', () => {
    let token: string;
    before(async () => {
        const data = {
            id: Number,
            time: Date(),
            username: "Nguyen"
        }
        // Generate a token for testing
        token = jwt.sign({data}, process.env.TOKEN_SECRET!);
    });

    it('should return a list of products', async () => {
        //@ts-ignore
        const response = await request(app)
            .get('/products')
            .expect(200);
        expect(response.body).not.toBeNull();
    });

    it('Should return a list of products', async () => {
        //@ts-ignore
        const response = await request(app)
            .get("/products")
            .expect(200);

        expect(response.body).not.toBeNull();

        expect(response.body).toEqual(
            [{
                id: 1,
                name: "Sneakers",
                description: "Made of something",
                brand: "Nike",
                price: 205,
                created_at: response.body[0].created_at,
                updated_at: response.body[0].updated_at,
                deleted_at: response.body[0].deleted_at,
                category_id: 1
            }])
    })

    it('should get a product by id', async () => {
        //@ts-ignore
        const response = await request(app)
            .get("/products/1")
            .expect(200);
        expect(response.body.id).toEqual(1);
        expect(response.body.name).toEqual("Sneakers");
        expect(response.body.description).toEqual("Made of something");
        expect(response.body.brand).toEqual("Nike");
        expect(response.body.price).toEqual(205);
        expect(response.body.category_id).toEqual(1);
    });


    it('should add a new product', async () => {
        //@ts-ignore
        const response = await request(app)
            .post('/products')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: "Computer",
                description: "CPU: 2.5 GHZ, Color: blue, RAM: 32, HDD: 500",
                brand: "DELL",
                price: 750,
                categoryId: 7,
            })
            .expect(201);

        expect(response.body.id).toEqual(2);
        expect(response.body.name).toEqual('Computer');
        expect(response.body.description).toEqual("CPU: 2.5 GHZ, Color: blue, RAM: 32, HDD: 500");
        expect(response.body.brand).toEqual('DELL');
        expect(response.body.price).toEqual(750);
        expect(response.body.category_id).toEqual(7);

    });

    it('Should return a list of products after adding a new one REST API', async () => {
        //@ts-ignore
        const response = await request(app)
            .get("/products")
            .expect(200);

        expect(response.body).not.toBeNull();

        expect(response.body).toEqual(
            [{
                id: 1,
                name: "Sneakers",
                description: "Made of something",
                brand: "Nike",
                price: 205,
                created_at: response.body[0].created_at,
                updated_at: response.body[0].updated_at,
                deleted_at: response.body[0].deleted_at,
                category_id: 1
            },
                {
                    id: 2,
                    name: "Computer",
                    description: "CPU: 2.5 GHZ, Color: blue, RAM: 32, HDD: 500",
                    brand: "DELL",
                    price: 750,
                    created_at: response.body[1].created_at,
                    updated_at: response.body[1].updated_at,
                    deleted_at: response.body[1].deleted_at,
                    category_id: 7,
                }
            ])
    });

    it('should update a product', async () => {
        //@ts-ignore
        const response = await request(app)
            .put('/products/2')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: "Computer",
                description: "CPU: 2.5 GHZ, Color: blue, RAM: 32, HDD: 500",
                brand: "HP",
                price: 850,
                categoryId: 7,
            })
            .expect(201);

        expect(response.body.id).toEqual(2);
        expect(response.body.name).toEqual('Computer');
        expect(response.body.description).toEqual("CPU: 2.5 GHZ, Color: blue, RAM: 32, HDD: 500");
        expect(response.body.brand).toEqual('HP');
        expect(response.body.price).toEqual(850);
        expect(response.body.category_id).toEqual(7);

    });

    it('should delete a product REST API', async () => {
        //@ts-ignore
        const response = await request(app)
            .delete('/products/2')
            .set('Authorization', `Bearer ${token}`);

        expect(response.body).toEqual(`Product with id 2 deleted successfully`);

    });

});