# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Add a new product    '/products'     [POST]   [token required]
- Get all products     '/products'     [GET];
- find product by id   '/products/:id' [GET]
- delete product       '/products/:id' [DELETE] [token required]
- update a product     '/products/:id' [PUT]    [token required]

#### Users
- Register a new  '/users/register'   [POST] [token required]
- update a user   '/users/update/:id' [PUT]  [token required]
- login           '/login' [POST];
- Get user by ID  '/users/show/:id'   [GET]  [token required]
- Get all users  '/users'             [GET]  [token required]

#### Orders
- GET order by ID         '/orders/:id'           [GET]    [token required]
- delete an order by iD   '/orders/:id'           [DELETE] [token required]
- get all orders    '/orders'                     [GET]    [token required]
- Create an order         '/orders'               [POST]   [token required]
- get orders by User      '/orders/getByUser/:id' [GET]    [token required]
- update an oder by ID    '/orders/:id');         [PATCH]  [token required]

#### Category
- get all categories        '/categories'     [GET]
- get category by ID        '/categories/:id' [GET]
- Add a new category        '/categories'     [POST]   [token required]
- update a category by ID   '/categories/:id' [PATCH]  [token required]

## Data Shapes
#### Product
CREATE TABLE IF NOT EXISTS product
(
id          SERIAL PRIMARY KEY,
name        VARCHAR(100) NOT NULL,
description VARCHAR(500) NOT NULL,
brand       VARCHAR(100) NOT NULL,
created_at  TIMESTAMP NOT NULL DEFAULT NOW(),
updated_at  TIMESTAMP          DEFAULT NULL,
deleted_at  TIMESTAMP          DEFAULT NULL,
price       integer,
category_id    integer REFERENCES category (id)
);

#### User
CREATE TABLE IF NOT EXISTS users
(
id         SERIAL PRIMARY KEY NOT NULL,
username   VARCHAR(100) NOT NULL,
password   VARCHAR(500) NOT NULL,
firstname  VARCHAR(100) NOT NULL,
lastname   VARCHAR(100) NOT NULL,
created_at TIMESTAMP NOT NULL DEFAULT NOW(),
updated_at TIMESTAMP          DEFAULT NULL
);

#### Orders
CREATE TABLE IF NOT EXISTS orders
(
id          SERIAL PRIMARY KEY,
user_id     integer REFERENCES users (id),
order_number VARCHAR(100),
total_quantity INTEGER,
total_price  INTEGER,
created_at  TIMESTAMP NOT NULL DEFAULT NOW(),
updated_at  TIMESTAMP          DEFAULT NULL,
status      VARCHAR(50)
);

#### OrderDetails
CREATE TABLE IF NOT EXISTS orderDetails
(
id         SERIAL PRIMARY KEY,
order_id   integer REFERENCES orders (id),
product_id integer REFERENCES product (id),
quantity   integer
);

#### Category
CREATE TABLE IF NOT EXISTS category
(
id   SERIAL PRIMARY KEY,
name VARCHAR(500)
);

#### Insert data into category table
INSERT INTO category values(DEFAULT,'Clothing');
INSERT INTO category values(DEFAULT,'Home Appliance');
INSERT INTO category values(DEFAULT,'Raw Material');
INSERT INTO category values(DEFAULT,'Food');
INSERT INTO category values(DEFAULT,'Furniture');
INSERT INTO category values(DEFAULT,'Operating supplies');
INSERT INTO category values (DEFAULT,'Computers');
INSERT INTO category values(DEFAULT,'Convenience goods');
INSERT INTO category values(DEFAULT,'Phones');

