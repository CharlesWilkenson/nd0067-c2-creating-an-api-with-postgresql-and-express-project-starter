import { UserService } from "../../service/userService";
import {describe} from "node:test";
const service: UserService = new UserService();

describe('User Model', () => {
    it('should have a register method', () => {
        expect(service.register).toBeDefined();
    });
    it('should have an authenticate method', () => {
        expect(service.authenticate).toBeDefined();
    });
    it('should have an update method', () => {
        expect(service.update).toBeDefined();
    });

    it('Should have a show method', () => {
        expect(service.show).toBeDefined();
    });

    it('Should have an index method', () => {
        expect(service.index).toBeDefined();
    });


    it('Should register a user', async () => {

          //@ts-ignore
        const user: User = await service.register({
            username: "wilki",
            password: "pass123",
            firstname: 'Wilkenson',
            lastname: 'Charles'
        });

        expect(user).toEqual({
            id: 1,
            username: "wilki",
            password: "",
            created_at: user.created_at,
            updated_at: user.updated_at,
            firstname: 'Wilkenson',
            lastname: 'Charles'
        })

    });

    it('Should get a user by id', async () => {
        //@ts-ignore
        const user: User = await service.show(1);
        expect(user).toEqual({
            id: 1,
            username: "wilki",
            created_at: user.created_at,
            updated_at: user.updated_at,
            firstname: 'Wilkenson',
            lastname: 'Charles'
        })

    });

    it('Should check if a specific user exists', async () => {
        const username: string = "wilki";
        //@ts-ignore
        const isExist: boolean = await service.isUserExists(username);
        expect(isExist).toEqual(true);
    });

    it('Should update a user', async () => {
        //@ts-ignore
        const user: User = await service.update(1,{
            username: "wilki",
            firstname: 'Kenfils',
            lastname: 'Charles'
        });

        expect(user).toEqual({
            id: 1,
            username: "wilki",
            password: "",
            created_at: user.created_at,
            updated_at: user.updated_at,
            firstname: 'Kenfils',
            lastname: 'Charles'
        })
    });

    it('Should return all users', async () => {
        //@ts-ignore
        const users: User[] = await service.index();
        expect(users).toEqual([{
            id: 1,
            username: "wilki",
            created_at: users[0].created_at,
            updated_at: users[0].updated_at,
            firstname: 'Kenfils',
            lastname: 'Charles'
        }])

    });
});