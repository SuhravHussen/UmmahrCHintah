# Ummar chintah Server

This is the server of the Ummar Chintah website. It is responsible for connecting to the database and providing APIs for getting, adding, editing, and deleting articles and authors.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Live](#live)

## Features

- **Public API**

  - Get articles and authors with pagination features
  - Search feature
  - Sorting supported

- **Private API**

  - Protected routes
  - Add, edit, and delete authors and articles
  - Role-based protection

- **HATEOAS Supported**
- **Connected to PostgreSQL through Prisma**
- **Error Monitoring with Sentry**

## Tech Stack

- **NestJS - Fastify**: Backend framework for building efficient and scalable applications using Fastify as the HTTP server.
- **Prisma**: Type-safe ORM for connecting and interacting with PostgreSQL.
- **TypeScript**: Statically typed language for building scalable applications.
- **Sentry**: Error tracking and monitoring tool for catching and resolving bugs.
- **PostgreSQL**: Relational database system for managing and storing data.

## Installation

Follow these steps to set up the project locally.

1. Clone the repository:

   ```bash
   git clone git@github.com:SuhravHussen/UmmahrChintah.git
   ```

2. Navigate to the project directory:
   ```bash
   cd UmmahrChintah/Server
   ```
3. Install the dependencies:
   ```bash
    yarn install
   ```
4. Create a `.env` file for environment variables
5. Run the development server
   ```bash
   yarn start:dev
   ```

## Live

[Ummar Chintah Server](https://ummahrchintah.onrender.com/v1)

## Postman Collection

[Ummar Chintah Postman Collection](https://gold-star-209210.postman.co/workspace/Ummar-Chintah~9bbf4078-d69e-4ebd-bc8e-ba5c358c5264/collection/16340384-89f102ad-abdf-46a3-908d-65624c6a6873?action=share&creator=16340384)

## Documentation

[Ummar Chintah Documentation](https://app.swaggerhub.com/apis/UmmarChintah/UmmarChintahApi/1.0.0)
