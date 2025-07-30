# User Management API

## Description

This is a backend API for user authentication and profile management. It supports user registration, login with JWT, profile updates, and user listing. It follows a modular structure using Node.js, Express, TypeORM, and PostgreSQL.

## Technologies Used

- Node.js
- Express
- PostgreSQL
- TypeORM
- TypeScript
- JWT (jsonwebtoken)
- Swagger (swagger-ui-express, swagger-jsdoc)
- bcrypt
- class-validator
- reflect-metadata

## Installation and Setup

### Prerequisites

- Node.js >= 18
- PostgreSQL
- npm

### Installation Steps

1. Install dependencies
```bash
npm install
```
2. Create the database in PostgreSQL

3. Set up environment variables in a `.env` file:

PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=user_api
JWT_SECRET=your_jwt_secret

4. Run the project
```bash
npm run dev
```

## Usage

### Running in Development

The server will run at `http://localhost:3000`

### API Documentation

You can access and test the API via Swagger UI at:

`http://localhost:3000/api-docs/`


### Sample Credentials

You can register a new user at `/api/auth/register`, then login at `/api/auth/login`.

## Available Endpoints

### Auth

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login with email and password

### Users (Requires Bearer Token)

- `GET /api/users/profile` - Get current user profile
- `PUT /api/users/profile` - Update current user profile
- `GET /api/users` - List all users

## Technical Decisions

- Used TypeORM for its simplicity with decorators and integration with PostgreSQL.
- Avoided migrations for now to simplify development, but `synchronize: true` is enabled.
- Used class-validator for future scalability in data validation.
- Swagger was chosen for easy testing and documentation of endpoints.

## Future Improvements

- Implement database migrations.
- Add unit and integration tests.
- Add password update endpoint.
- Add role-based access control (RBAC).
- Add pagination and filtering to user listing.