import express, {Request, Response} from 'express';
import {authenticateJWT} from "./middleware";
import {OrderService} from '../service/OrderService';
import {UserService} from '../service/userService';
import {User} from '../model/User'
import {Product} from '../model/Product';
import {ProductService} from '../service/ProductService';
import {OrderDetailsDTO, OrderResponseDTO} from "../DTO/OrderResponseDTO";

const service: OrderService = new OrderService();
const userService: UserService = new UserService();
const productService: ProductService = new ProductService()

const getOrders = async (req: Request, res: Response) => {
    const result: OrderResponseDTO[] = await service.index();
    res.status(200).json(result);
}


const getOrderById = async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    const order: OrderResponseDTO = await service.show(id);
    if (!order) res.status(401).send({statusCode: 404, message: `Order not found with id ${id}`})

    res.status(200).json(order);
}

const create = async (req: Request, res: Response) => {
    const user_id: number = parseInt(req.body.user_id);
    const orderDetails: OrderDetailsDTO[] = req.body.orderDetails;

    const user: User = await userService.show(user_id);
    if (!user) {
        res.status(401).send({statusCode: 404, message: `User not found with id ${user_id}`})
    }

    for (let od of orderDetails) {
        let product: Product = await productService.show(od.product_id);
        if (!product) {
            res.status(401).send({statusCode: 404, message: `Product not found with id ${od.product_id}`})
        }
    }

    const result: OrderResponseDTO = await service.create(user_id, orderDetails);
    res.status(201).json(result);
}

const deleteOrder = async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    const result: string = await service.delete(id);
    res.json(result);
}

const getByUser = async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    const user: User = await userService.show(id);
    if (!user) {
        res.status(401).send({statusCode: 404, message: `User not found with id ${id}`})
    }
    const result: OrderResponseDTO[] = await service.getByUser(id);
    res.status(200).json(result);
}

const update = async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    //@ts-ignore
    const status: string = req.body.status;

    const result: OrderResponseDTO = await service.update(id, status);
    res.status(201).json(result);
}


export const order_routes = (app: express.Application) => {
    app.get('/orders/:id', authenticateJWT, getOrderById);
    app.delete('/orders/:id', authenticateJWT, deleteOrder);
    app.get('/orders', authenticateJWT, getOrders);
    app.post('/orders', authenticateJWT, create);
    app.get('/orders/getByUser/:id', authenticateJWT, getByUser);
    app.patch('/orders/:id', authenticateJWT, update);
}

