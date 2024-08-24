import express, { Request, Response } from 'express';
import {UserService } from '../service/userService';
import { User } from '../model/User'
import {authenticateJWT} from "./middleware";

const service: UserService = new UserService();

const index = async (req: Request, res: Response): Promise<void> => {
    const users: User[] = await service.index();
    res.status(200).json(users);
}

const register = async (req: Request, res: Response): Promise<void> => {
    //@ts-ignore
    const user: User = {
        username: req.body.username,  
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    }
 //  let isUserExists: boolean = await service.isUserExists(user.username);
   // if(isUserExists) res.status(403).send({statusCode: 403, message: "Username already exists"});

    const result: User = await service.register(user);
    res.status(201).json(result);
}

const authenticate = async (req: Request, res: Response): Promise<void> => {
    const username = req.body.username;
    const password = req.body.password;
    const result = await service.authenticate(username, password);
    res.status(200).json(result);
}

const show = async (req: Request, res: Response): Promise<void> => {
    const id: number = parseInt(req.params.id);
    const user: User = await service.show(id);
    if(!user) res.status(404).send({statusCode: 404, message: `Invalid user ID: id ${id}`});
    res.status(200).json(user);
}

const update = async (req: Request, res: Response): Promise<void> => {
    //@ts-ignore
    const newUser: User = {
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    }
    const id: number = parseInt(req.params.id);
    const user: User = await service.show(id);
    if(!user) res.status(404).send({statusCode: 404, message: `Invalid user ID: id ${id}`});
    const result: User = await service.update(id, newUser);
    res.status(201).json(result);
}

export const users_routes = (app: express.Application): void => {
    app.post('/users/register', register);
    app.put('/users/update/:id', authenticateJWT, update);
    app.post('/login', authenticate);
    app.get('/users/show/:id', authenticateJWT, show);
    app.get('/users', authenticateJWT, index);
}

