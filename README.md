# Calculator API - Backend

## Introduction

This backend service for the calculator application is built using NestJS, which provides a robust framework for building scalable and maintainable Node.js server-side applications. The architecture focuses on modularity, testability, and adherence to modern software engineering principles.

NestJS encourages good architecture practices through its own built-in modularity features. The backend is organized into different modules to isolate concerns:

- `User`: Manages user data and user-related functionalities.
- `Authentication`: Handles JWT-based user authentication.
- `Calculations`: Deals with the calculator's operations storing and fetching logic.

## Technologies Used

- NestJS (plus framework built-in stuff such as the validators for incoming data)
- Mongoose/MongoDB
- JWT for Authentication
- Jest
- Bcrypt for hashing

## Module Structure

Each module in the backend lives in its own folder, which contains various related files:

- `*.module.ts`: The main module file that brings all the related code together.
- `*.controller.ts`: Handles incoming requests and returns responses.
- `*.service.ts`: Contains the business logic and calls the repository.
- `*.repository.ts`: Directly interacts with the database.
- `*.schema.ts`: Defines the Mongoose schema for the database collection.
- `*.dto.ts`: Data Transfer Object - An object that carries data between processes.
- `*.entity.ts`: A TypeScript class that defines the object and type structure for the database records.

#### Why Use Entity?

The `*.entity.ts` is particularly important because it defines the type returned by the repository layer model methods. By doing this, we avoid "leaking" database-specific types into other layers of the application, thereby reducing the coupling to the database provider.

## Configuration

1. Run the MongoDB container:

```bash
$ docker-compose up -d
```

2. Rename `.env.example` to `.env`.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
$ yarn run start:dev
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```
