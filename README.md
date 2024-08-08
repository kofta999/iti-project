# Todoz

## Overview

This project is a full-stack application built with React, TypeScript, and Vite on the client side, and Node.js, Hono on the server side. It includes user authentication and a to-do list.

![image](https://github.com/user-attachments/assets/7695f914-47dc-499e-8409-03e9f55a9ee5)

## Table of Contents

- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [API Endpoints](#api-endpoints)

## Project Structure

```
client/
  index.html
  package.json
  README.md
  src/
    App.tsx
    pages/
      Login.tsx
      TodoList.tsx
      ...
    components/
      CreateTodo.tsx
      DeleteTodo.tsx
      ...
    services/
      todoService.ts
      authService.ts
```

```
server/
  db.json
  README.md
  package.json
  src/
    index.ts
```

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository:

```sh
git clone https://github.com/kofta999/iti-project.git
cd iti-project
```

2. Install dependencies for both client and server:

```sh
cd client
npm install
cd ../server
npm install
```

### Running the Application

1. Start the server:

```sh
cd server
npm run dev
```

2. Start the client:

```sh
cd client
npm run dev
```

## Scripts

### Client

- `npm run dev`: Start the development server
- `npm run build`: Build the project for production
- `npm run lint`: Run ESLint

### Server

- `npm run dev`: Start the server in development mode

## API Endpoints

### Users

- `POST /users/register`: Register a new user
- `POST /users/login`: Login a user

### Todos

- `GET /users/:id/todos`: Get all todos for a specific user with pagination, status, and sorting options
- `POST /users/:id/todos`: Create a new todo for a specific user
- `GET /users/:userId/todos/:todoId`: Get a specific todo for a user
- `PUT /users/:userId/todos/:todoId`: Update a specific todo for a user
- `DELETE /users/:userId/todos/:todoId`: Delete a specific todo for a user
