import {app} from '../../server';
import  request from 'supertest';
import {before, describe} from "node:test";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

describe('User endpoints: ', () => {
    let token: any;

    it('Register user REST API',  async () => {
        //@ts-ignore
        const response =  await request(app)
            .post("/users/register")
            .send({username: "Nguyen", password: "pass123", firstname: 'Trang', lastname: 'Tu'})
            .expect(201);

        expect(response.body.id).toEqual(2)
        expect(response.body.username).toEqual("Nguyen");
        expect(response.body.firstname).toEqual("Trang");
        expect(response.body.lastname).toEqual("Tu");
    })

   before(async () => {
        const data = {
            id: Number,
            time: Date(),
            username: "Nguyen"
        }
        // Generate a token for testing
        token = jwt.sign({data}, process.env.TOKEN_SECRET!);
    });

   it('should authenticate user', async () => {
        //@ts-ignore
        const response = await request(app)
            .post('/login')
            .send({username: 'Nguyen', password: 'pass123'})
            .expect(200)
        expect(response.body).not.toEqual(null);
    });

    it('Get a user by id REST API before updating',  async () => {
        //@ts-ignore
        const response =  await request(app)
            .get("/users/show/2")
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body.username).toEqual("Nguyen")
        expect(response.body.firstname).toEqual("Trang")
        expect(response.body.lastname).toEqual("Tu");

    })

   it('Update user REST API',  async () => {
        //@ts-ignore
        const response =  await request(app)
            .put("/users/update/2")
            .set('Authorization', `Bearer ${token}`)
            .send({username: "Nguyen2", firstname: 'Trang2', lastname: 'Tu2'})
            .expect(201);

        expect(response.body.id).toEqual(2)
        expect(response.body.username).toEqual("Nguyen2");
        expect(response.body.firstname).toEqual("Trang2");
        expect(response.body.lastname).toEqual("Tu2");
    });


    it('Get a user by id REST API after updating',  async () => {
        //@ts-ignore
        const response =  await request(app)
            .get("/users/show/2")
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body.id).toEqual(2)
        expect(response.body.username).toEqual("Nguyen2")
        expect(response.body.firstname).toEqual("Trang2")
        expect(response.body.lastname).toEqual("Tu2");

    })

    it('Login user REST API',  async () => {
        //@ts-ignore
        const response =  await request(app)
            .post("/login")
            .send({username: "Nguyen2", password: "pass123"})
            .expect(200);

        expect(response.body).not.toBeNull();
    })

    it('Should return all users REST API',  async () => {
        //@ts-ignore
        const response =  await request(app)
            .get("/users")
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(response.body).toEqual([{
            id: 1,
            username: "wilki",
            created_at: response.body[0].created_at,
            updated_at: response.body[0].updated_at,
            firstname: 'Kenfils',
            lastname: 'Charles'
        },
            {
                id:2,
                username: "Nguyen2",
                created_at: response.body[1].created_at,
                updated_at: response.body[1].updated_at,
                firstname: 'Trang2',
                lastname: 'Tu2'
            }
        ])
    })
})
