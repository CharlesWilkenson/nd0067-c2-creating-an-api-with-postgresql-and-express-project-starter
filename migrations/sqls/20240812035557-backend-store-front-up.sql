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

CREATE TABLE IF NOT EXISTS category
(
    id   SERIAL PRIMARY KEY,
    name VARCHAR(500)
);

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

CREATE TABLE IF NOT EXISTS orderDetails
(
    id         SERIAL PRIMARY KEY,
    order_id   integer REFERENCES orders (id),
    product_id integer REFERENCES product (id),
    quantity   integer
);



INSERT INTO category values(DEFAULT,'Clothing');
INSERT INTO category values(DEFAULT,'Home Appliance');
INSERT INTO category values(DEFAULT,'Raw Materiel');
INSERT INTO category values(DEFAULT,'Food');
INSERT INTO category values(DEFAULT,'Furniture');
INSERT INTO category values(DEFAULT,'Operating supplies');
INSERT INTO category values (DEFAULT,'Computers');
INSERT INTO category values(DEFAULT,'Convenience goods');
INSERT INTO category values(DEFAULT,'Phones');