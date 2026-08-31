# Secure JSON-Driven Client Application

## Overview

This project is a small full-stack client management application developed as part of the Full-Stack Developer technical assignment.

The application uses React on the frontend and Node.js/Express with MongoDB on the backend. Authentication is handled using JWT, and passwords are secured using bcrypt.

The client management screen is generated using a JSON schema, which allows the UI structure to be controlled from JSON data.

## Technologies Used

### Frontend

* React
* Material UI
* React Router
* Axios
* JavaScript

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt

### Other

* Git
* REST APIs

## Features Implemented

* JWT-based login
* Password hashing using bcrypt
* Protected backend APIs using JWT middleware
* React Router based navigation
* Client management screen
* View client records
* Add new client records
* JSON-driven UI rendering
* Reusable JSON renderer component
* Support for:

  * `html`
  * `input`
  * `table`
* Basic form validation
* Loading states
* Basic error handling
* Logout functionality
* Authentication token is cleared on logout

## API Endpoints

### Login

```http
POST /api/auth/login
```

Used to authenticate the user and return a JWT token.

### Get UI Schema

```http
GET /api/schema
```

Returns the JSON schema used to render the client management screen.

### Get Clients

```http
GET /api/clients
```

Returns the client records.

This API requires a valid JWT token.

### Add Client

```http
POST /api/clients
```

Adds a new client record.

This API requires a valid JWT token.

## Project Structure

```text
project/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── README.md
└── .gitignore
```

## Setup Instructions

### 1. Clone / Extract the Project

Extract the ZIP file and open the project in your code editor.

### 2. Backend Setup

Open the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file using `.env.example`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend:

```bash
npm start
```

The backend will run on:

```text
http://localhost:5000
```

### 3. Frontend Setup

Open another terminal and go to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the React application:

```bash
npm run dev
```

The frontend will run on the URL shown by Vite in the terminal.

## Test Login Credentials

For testing the application, use the credentials provided separately with the submission.

> No real passwords, database credentials, or JWT secrets are included in the repository.

## Environment Variables

The project includes a `.env.example` file.

Example:

```env
PORT=5000
MONGO_URI=
JWT_SECRET=
```

Actual `.env` files and sensitive credentials should not be committed to Git.

## JSON-Driven UI

The client management screen is rendered from a JSON schema received from the backend.

Example:

```json
[
  {
    "type": "html",
    "value": "Client Management"
  },
  {
    "type": "input",
    "name": "clientName",
    "label": "Client Name",
    "required": true
  },
  {
    "type": "input",
    "name": "email",
    "label": "Email",
    "required": true
  },
  {
    "type": "table",
    "columns": [
      {
        "key": "name",
        "label": "Client Name"
      },
      {
        "key": "email",
        "label": "Email"
      },
      {
        "key": "status",
        "label": "Status"
      }
    ]
  }
]
```

The React renderer checks the `type` of each node and renders the corresponding UI component.

## Authentication Flow

1. User enters login credentials.
2. Frontend sends the credentials to `/api/auth/login`.
3. Backend verifies the password using bcrypt.
4. Backend generates a JWT token after successful authentication.
5. Frontend stores the token for authenticated requests.
6. JWT middleware verifies the token for protected APIs.
7. User can access the client management screen after login.
8. Logout clears the authentication token.

## Incomplete / Future Improvements

The core functionality required for the assessment has been implemented within the allotted assessment time.

With additional time, I would improve the application further by:

* Adding more detailed form validation
* Improving UI/UX and responsive design
* Adding edit and delete client functionality
* Adding more reusable JSON node types
* Improving API error messages
* Adding automated API and frontend tests
* Adding more comprehensive authentication and authorization handling
* Improving overall styling and user feedback

## Assumptions

* MongoDB is available locally or through a MongoDB connection string.
* The test user is available in the configured database.
* The frontend and backend are run separately during development.
* JWT is used to protect all APIs except the login API.
