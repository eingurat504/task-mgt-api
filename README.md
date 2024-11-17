# TASK MANAGEMENT API

This simple task management api was developed in node.js express js and js web token and postgres database

## Features

- User registration and login
- Secure password storage using bcrypt
- Local authentication with jsonwebtoken
- Session management with express-session
- Project management
- Task management
- Attachment management

## Technologies Used

- Node.js
- Express.js
- jsonwebtoken
- bcrypt for password hashing
- express-session for session management

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v20.18.0 or later)
- [npm](https://www.npmjs.com/get-npm)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/eingurat504/task-mgt-api.git
   cd task-mgt-api

2. Install Dependencies:

    npm install


3. Create a .env file in the root directory to store environment variables:
   ```bash

    ACCESS_TOKEN_SECRET =
    PORT=
    DB_HOST = 
    DB_PORT = 5432
    DB_USERNAME = 
    DB_PASSWORD = 
    DB_DATABASE = 

4. Set up the database (using POSTGRESQL).
    
    Usage

    1. Start the server:

    ```bash
    node app.js

    2. Open your browser and go to http://localhost:5000 to access the application.

    Folder Structure
      
    task-mgt-api/
    │
    ├── controllers/
        ├── authcontroller.js   # EJS or HTML views for registration and login forms
    ├── routes/                 # Routes for handling authentication and user routes
    │   ├── api.js
    ├── middlewares             # Authentication middleware
    ├── models/                 # User model for database interaction
    │   └── User.js             # User schema and model setup
    ├── config/
    │   └── config.js           # POSTGRESSQL configuration for authentication
    ├── .env                    # Environment variables
    ├── app.js                  # Application entry point
    └── package.json            # Project metadata and dependencies


### Authentication Flow
1. Register: Create a new account using the /api/auth/register endpoint.

2. Login: Authenticate using /api/auth/login to receive a JWT token.

3. Access Protected Routes: Include the token in the Authorization header for requests to protected routes:

    ```bash
    Authorization: Bearer your_jwt_token

4. Logout: Use /api/logout to invalidate the current token.


### Contribution
Contributions are welcome! Please submit a pull request or open an issue to suggest improvements.

### License
This project is licensed under the MIT License.
