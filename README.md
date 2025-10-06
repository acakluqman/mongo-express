# Express SOLID API

A robust RESTful API built with Express.js following SOLID principles, providing user management and authentication functionality with MongoDB integration.

## Project Overview

This project demonstrates the implementation of SOLID design principles in a Node.js/Express.js application. It features a clean architecture with separation of concerns between controllers, services, repositories, and models, making the codebase maintainable and extensible.

## Features

- **User Management**: Complete CRUD operations for user resources
- **Authentication**: JWT-based authentication system with login and registration
- **Role-Based Access Control**: Different access levels based on user roles
- **API Documentation**: Swagger UI for interactive API documentation
- **Error Handling**: Centralized error handling with appropriate HTTP status codes
- **Security**: Implementation of security best practices with Helmet
- **Data Validation**: Request validation using express-validator
- **SOLID Architecture**: Adherence to SOLID principles for maintainable code

## Technology Stack

- **Node.js & Express.js**: Server and API framework
- **MongoDB & Mongoose**: Database and ODM
- **JWT**: Authentication and authorization
- **bcryptjs**: Password hashing
- **Swagger**: API documentation
- **Helmet**: Security middleware
- **CORS**: Cross-Origin Resource Sharing support
- **dotenv**: Environment variable management

## Project Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local instance or MongoDB Atlas)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd express-solid
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/express-solid
   JWT_SECRET=your_jwt_secret_key
   ```

### Running the Application

- Development mode with auto-reload:
  ```bash
  npm run dev
  ```

- Production mode:
  ```bash
  npm start
  ```

## API Usage

### Authentication Endpoints

- **Register a new user**:
  ```
  POST /api/auth/register
  ```
  Body:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "user"
  }
  ```

- **Login**:
  ```
  POST /api/auth/login
  ```
  Body:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

### User Management Endpoints

All user management endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

- **Get all users**:
  ```
  GET /api/users
  ```

- **Get user by ID**:
  ```
  GET /api/users/:id
  ```

- **Update user**:
  ```
  PUT /api/users/:id
  ```

- **Delete user**:
  ```
  DELETE /api/users/:id
  ```

## API Documentation

When running in development mode, Swagger documentation is available at:
```
http://localhost:3000/api/docs
```

## Project Structure

```
express-solid/
├── src/
│   ├── config/           # Configuration files
│   ├── controllers/      # Request handlers
│   ├── middlewares/      # Express middlewares
│   ├── models/           # Mongoose models
│   ├── repositories/     # Data access layer
│   ├── routes/           # API routes
│   ├── services/         # Business logic
│   ├── utils/            # Utility functions
│   ├── app.js            # Express app setup
│   └── server.js         # Server entry point
├── .env                  # Environment variables
└── package.json          # Project dependencies
```

## License

ISC

## Author

acakluqman