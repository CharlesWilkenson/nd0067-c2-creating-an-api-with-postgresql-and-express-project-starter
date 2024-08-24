// @ts-ignore
export class User {
    id: number;
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    created_at: Date

    constructor(){
        this.id = 0;
        this.username = '';
        this.username = '';
        this.password = '';
        this.firstname = '';
        this.lastname = '';
        this.created_at = new Date();
    }
}
