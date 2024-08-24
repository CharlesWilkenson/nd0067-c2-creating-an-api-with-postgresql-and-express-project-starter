import {CategoryService} from "../service/CategoryService";
import express, {Request, Response} from 'express';
import {Category} from "../model/Category";
import {authenticateJWT} from "./middleware";

const service = new CategoryService();

const index = async (req: Request, res: Response): Promise<void> => {
    const result: Category[] = await service.index();
    res.status(200).json(result);
}

const show = async (req: Request, res: Response): Promise<void> => {
    const id: number = parseInt(req.params.id);
    const result: Category = await service.show(id);
    res.status(200).json(result);
}

const create = async (req: Request, res: Response): Promise<void> => {
    //@ts-ignore
    const category: Category = {
        name: req.body.name
    }
    const result: Category = await service.create(category);
    res.status(201).json(result);
}

const update = async (req: Request, res: Response): Promise<void> => {
    const id: number = parseInt(req.params.id);
    //@ts-ignore
    const category: Category = {
        name: req.body.name
    }
    const result: Category = await service.update(id, category);
    res.status(201).json(result);
}

export const category_routes = (app: express.Application) => {
    app.get('/categories', index);
    app.get('/categories/:id', show)
    app.post('/categories', authenticateJWT, create);
    app.patch('/categories/:id', authenticateJWT, update);
}

