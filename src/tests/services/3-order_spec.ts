import {OrderService} from '../../service/OrderService';
import {OrderDetailsDTO, OrderResponseDTO} from "../../DTO/OrderResponseDTO";
import {describe} from "node:test";
const service: OrderService = new OrderService();

describe('Order Model', () => {
    it('should have an index method', () => {
        expect(service.index).toBeDefined();
    });

    it('Should have a show method', () => {
        expect(service.show).toBeDefined();
    });

    it('Should have a create method', () => {
        expect(service.create).toBeDefined();
    });

    it('Should have a update method', () => {
        expect(service.update).toBeDefined();
    });

    it('Should have a getByUser method', () => {
        expect(service.getByUser).toBeDefined();
    });

    it('Should create an order', async () => {
        //@ts-ignore
        const orderDetails: OrderDetailsDTO[] = [
            {quantity: 1, product_id: 1},
          //  {quantity: 2, product_id: 7},
           // {quantity: 1, product_id: 8}
        ]

        //@ts-ignore
        const order: OrderResponseDTO = await service.create(1, orderDetails);

        //@ts-ignore
        expect(order).toEqual({
            id: order.id,
            total_quantity: 1,
            total_price: 205,
            user_id: 1,
            order_number: order.order_number,
            status: 'Created',
            created_at: order.created_at,
            updated_at: order.updated_at,
            orderDetails: [
                {quantity: 1, product_id: 1},
              //  {quantity: 2, product_id: 7},
               // {quantity: 1, product_id: 8}
            ]
        })
    });

    it('Should return an order with id 1', async () => {
        const result: OrderResponseDTO  = await service.show(1);
        //@ts-ignore
        expect(result).toEqual({
            id: 1,
            total_quantity: 1,
            total_price: 205,
            user_id: 1,
            order_number: result.order_number,
            status: 'Created',
            created_at: result.created_at,
            updated_at: result.updated_at,
            orderDetails: [
                {quantity: 1, product_id: 1},
                //  {quantity: 2, product_id: 7},
                // {quantity: 1, product_id: 8}
            ]
        });
    });


    it('Should return a list of orders for a specific user', async () => {
        const result: OrderResponseDTO[] = await service.getByUser(1);
        //@ts-ignore
        expect(result).toEqual([{
            id: 1,
            total_quantity: 1,
            total_price: 205,
            user_id: 1,
            order_number: result[0].order_number,
            status: 'Created',
            created_at: result[0].created_at,
            updated_at: result[0].updated_at,
            orderDetails: [{quantity: 1, product_id: 1}]
        }]);
    });


    it('Should return a list of orders', async () => {
        const result = await service.index();
        //@ts-ignore
        expect(result).toEqual([{
            id: 1,
            total_quantity: 1,
            total_price: 205,
            user_id: 1,
            order_number: result[0].order_number,
            status: 'Created',
            created_at: result[0].created_at,
            updated_at: result[0].updated_at,
            orderDetails: [{quantity: 1, product_id: 1}]
        }]);
    });

    it('Should update an order', async () => {
        //@ts-ignore
        const result: OrderResponseDTO = await service.update(1, 'Canceled');
        //@ts-ignore
        expect(result).toEqual({
            id: 1,
            total_quantity: 1,
            total_price: 205,
            user_id: 1,
            order_number: result.order_number,
            status: 'Canceled',
            created_at: result.created_at,
            updated_at: result.updated_at,
            orderDetails: [{quantity: 1, product_id: 1}]
        })
    });

/*    it('Should delete an order', async () => {
        const result = await service.delete(1);
        expect(result).toEqual('Product with id 1 delete successfully');
    });*/

})