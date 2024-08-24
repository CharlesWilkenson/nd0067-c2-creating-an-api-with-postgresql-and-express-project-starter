import express, {Request, Response} from 'express';
import {Product} from '../model/Product';
import {ProductService} from '../service/ProductService';
import {CategoryService} from "../service/CategoryService";
import {authenticateJWT} from "./middleware";
import {Category} from "../model/Category";

const categoryService = new CategoryService();
const service: ProductService = new ProductService();

const index = async (req: Request, res: Response): Promise<void> => {
    const result: Product[] = await service.index();
    res.status(200).json(result);
}

const show = async (req: Request, res: Response): Promise<void> => {
    const id: number = parseInt(req.params.id);
    //@ts-ignore
    const product: Product | string = await service.show(id);

    if (!product) {
        res.status(404).send({statusCode: 404, message: `Product not found with id ${id}`})
    } else {
        res.status(200).json(product);
    }
}

const addProduct = async (req: Request, res: Response): Promise<void> => {
    //@ts-ignore
    const product: Product = {
        name: req.body.name,
        description: req.body.description,
        brand: req.body.brand,
        price: req.body.price,
        category_id: req.body.categoryId
    }

    const category: Category = await categoryService.show(product.category_id);
    if (!category) {
        res.status(404).send({statusCode: 404, message: `Category not found with id ${product.category_id}`})
    }
    const result: Product = await service.create(product);
    res.status(201).json(result);
}

const update = async (req: Request, res: Response): Promise<void> => {
    //@ts-ignore
    const product: Product = {
        name: req.body.name,
        description: req.body.description,
        brand: req.body.brand,
        price: req.body.price,
        category_id: req.body.categoryId
    }
    const id: number = parseInt(req.params.id);

    const currentProduct: Product = await service.show(id);
    if (!currentProduct) {
        res.status(401).send({statusCode: 404, message: `Product not found with id ${id}`})
    }
    const result: Product = await service.update(id, product);
    res.status(201).json(result);
}

const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    const id: number = parseInt(req.params.id);
    const currentProduct: Product = await service.show(id);
    if (!currentProduct) {
        res.status(401).send({statusCode: 404, message: `Product not found with id ${id}`})
    }
    const result: string = await service.destroy(id);
    res.json(result);
}

export const product_routes = (app: express.Application) => {
        app.post('/products', authenticateJWT, addProduct);
        app.get('/products', index);
        app.get('/products/:id', show);
        app.delete('/products/:id',authenticateJWT, deleteProduct);
        app.put('/products/:id', authenticateJWT, update);
}