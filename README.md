# Calculator API - Backend

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

## Introduction

This backend service for the calculator application is built using NestJS, which provides a robust framework for building scalable and maintainable Node.js server-side applications. The architecture focuses on modularity, testability, and adherence to modern software engineering principles.

NestJS encourages good architecture practices through its own built-in modularity features. The backend is organized into different modules to isolate concerns:

- `User`: Manages user data and user-related functionalities.
- `Authentication`: Handles JWT-based user authentication.
- `Calculations`: Deals with the calculator's operations storing and fetching logic.

## Technologies Used

- NestJS
- Mongoose
- JWT for Authentication
