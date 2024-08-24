import {app} from '../../server';
import request from 'supertest';
import {before, describe} from "node:test";
import jwt from "jsonwebtoken";

describe('Category endpoints', () => {
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

    it('should return all categories', async () => {
        //@ts-ignore
        const response = await request(app)
            .get('/categories')
            .expect(200);

        expect(response.body).not.toEqual([]);

        expect(response.body).toEqual([
            {id: 1, name: 'Clothing'},
            {id: 2, name: 'Home Appliance'},
            {id: 3, name: 'Raw Materiel'},
            {id: 4, name: 'Food'},
            {id: 5, name: 'Furniture'},
            {id: 6, name: 'Operating supplies'},
            {id: 7, name: 'Computers'},
            {id: 8, name: 'Convenience goods'},
            {id: 9, name: 'Phones'}
        ]);
    });

    it('should get a category by id', async () => {
        //@ts-ignore
        const response = await request(app)
            .get('/categories/7')
            .expect(200);
        expect(response.body.id).toEqual(7);
        expect(response.body.name).toEqual('Computers');

    });

    it('should return a category by id', async () => {
        //@ts-ignore
        const response = await request(app)
            .get('/categories/1')
            .expect(200);

        expect(response.body).toEqual({id: 1, name: 'Clothing'});
    });

   it('should create a new category', async () => {
        //@ts-ignore
        const response = await request(app)
            .post('/categories')
            .set('Authorization', `Bearer ${token}`)
            .send({name: 'Kitchen appliances'})
            .expect(201);

        expect(response.body).toEqual({id: 10, name: 'Kitchen appliances'})
    });

    it('should update a category', async () => {
        //@ts-ignore
        const response = await request(app)
            .patch('/categories/10')
            .set('Authorization', `Bearer ${token}`)
            .send({name: 'Kitchen'})
            .expect(201);

        expect(response.body).toEqual({id: 10, name: 'Kitchen'})
    });
})
