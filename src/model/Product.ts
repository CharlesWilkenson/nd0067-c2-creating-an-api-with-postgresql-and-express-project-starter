 // @ts-ignore

export class Product {
    id: number;
    name: string;
    description: string;
    brand: string;
    price: number;
    category_id: number;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date

     constructor(){
         this.id = 0;
         this.name = '';
         this.description = '';
         this.brand = '';
         this.price =  0;
         this.category_id = 0;
         this.created_at = new Date();
         this.updated_at = new Date();
         this.deleted_at = new Date();
     }
}
