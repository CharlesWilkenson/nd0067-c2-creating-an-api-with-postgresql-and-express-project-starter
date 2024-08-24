import express, {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

// Middleware for JWT authentication
export const authenticateJWT = (req: Request, res: Response, next: NextFunction): void => {
    const authorizationHeader  = req.headers['authorization'];//req.headers.authorization;
    if (authorizationHeader != null) {
        const token: string = authorizationHeader.split(' ')[1];
        if (token != null) {
            try {
                jwt.verify(token, process.env.TOKEN_SECRET!);
                next();
            } catch (err) {
                res.status(400).json({message: 'Invalid token'});
            }
        }
    }else{
        res.status(401).json({message: 'Token must be provided'});
    }
}