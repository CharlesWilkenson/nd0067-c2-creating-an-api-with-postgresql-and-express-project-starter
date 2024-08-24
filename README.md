# Storefront Backend Project

## Required Technologies
The application makes use of the following libraries:
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing
- cross-env for setting environment variables directly within your package.json scripts, ensuring compatibility across different operating systems
- babel
- supertest for testing endpoints
- typescript for typing

## 1. Install the necessary tools
- npm i

## Setup and connect to the database

### 2. Create databases for dev and test environment
       If you have docker installed on your computer, execute the command below to create two databse
       development (storeDB) and for testing (testDB) with different users. 
       The dev database runs on port 5432 and the test database runs on port 5433
- docker-compose up.
      
### 3. Run migrations to create the table
       run the following command to generate the tables
- db-migrate up

## 4. Run the application
      Start the application by executing the foolowing command. If the command executes successfully the application should run on port 3000
- npm run start

## 5. Run the tests
- npm run test
