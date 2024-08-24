import { Product } from "../../model/Product";
import { ProductService } from '../../service/ProductService';
import {describe} from "node:test";
const productService = new ProductService();

describe('Product model', () => {
    it('should have an index method', () => {
        expect(productService.index).toBeDefined();
    });

    it('Should have a show method', () => {
        expect(productService.show).toBeDefined();
    });

    it('Should have a create method', () => {
        expect(productService.create).toBeDefined();
    });

    it('Should have a destroy method', () => {
        expect(productService.destroy).toBeDefined();
    });

    it('Should have a update method', () => {
        expect(productService.update).toBeDefined();
    });


    it('create method should add a new product', async () => {
        // @ts-ignore
        const result: Product = await productService.create({
            name: "T-Shirt",
            description: "Made of cotton",
            brand: "Adidas",
            price: 75,
            category_id: 1,
        });

        //@ts-ignore
        expect(result).toEqual({
            id: 1,
            name: "T-Shirt",
            description: "Made of cotton",
            brand: "Adidas",
            price: 75,
            created_at: result.created_at,
            updated_at: result.updated_at,
            deleted_at: result.deleted_at,
            category_id: 1
        });
    });

    it('show method should return a product', async () => {
        const product: Product = await productService.show(1);
        //@ts-ignore
        expect(product).toEqual({
            id: 1,
            name: "T-Shirt",
            description: "Made of cotton",
            brand: "Adidas",
            price: 75,
            created_at: product.created_at,
            updated_at: product.updated_at,
            deleted_at: product.deleted_at,
            category_id: 1
        });
    });

   it('index method should return all products', async () => {
        const result: Product[] = await productService.index();
       //@ts-ignore
        expect(result).toEqual(
            [{
                id: 1,
                name: "T-Shirt",
                description: "Made of cotton",
                brand: "Adidas",
                price: 75,
                category_id: 1,
                created_at: result[0].created_at,
                updated_at: result[0].updated_at,
                deleted_at: result[0].deleted_at,
            }]);
    });


    it('Update method should update product table row with id 1', async () => {
        // @ts-ignore
        const result: Product = await productService.update(1, {
            id: 1,
            name: "Sneakers",
            description: "Made of something",
            brand: "Nike",
            price: 205,
            category_id: 1,
        });

        // @ts-ignore
        expect(result).toEqual({
            id: 1,
            name: "Sneakers",
            description: "Made of something",
            brand: "Nike",
            price: 205,
            created_at: result.created_at,
            updated_at: result.updated_at,
            deleted_at: result.deleted_at,
            category_id: 1
        })
    });

/*    it('Destroy method should return `Product with id 1 deleted successfully`', async () => {
        const result: string = await productService.destroy(1);
        expect(result).toEqual('Product with id 1 deleted successfully');
    });*/

});