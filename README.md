# Query Resolution Platform

This platform allows users to post queries and receive resolutions from other users. Administrators can manage users and content.

## Features

* User Authentication: Secure user registration and login with JWT (JSON Web Tokens).
* Query Posting: Registered users can post queries.
* Resolution Submission: Users can submit resolutions to existing queries.
* Resolution Voting: Users can like or dislike resolutions.
* Admin Panel: Administrators can perform CRUD operations on users.
* Admin Query Deletion: Admins can delete any query. Users can only delete their own queries.

## Technologies Used

* Backend: Node.js, Express.js, MongoDB, Mongoose, bcryptjs, jsonwebtoken, cors, helmet.
* Database: MongoDB

## API Endpoints
# Authentication Routes (/api/auth)
POST /register
Request Body: { email, username, password }

POST /login
Request Body: { email, password }

GET /profile  (Requires authentication)

PUT /profile  (Requires authentication)
Request Body: { name, email, password (optional) }

DELETE /profile (Requires authentication)

# Query Routes (/api/queries)
POST /add (Requires authentication)
Request Body: { text }

POST /add-resolution (Requires authentication)
Request Body: { queryId, text }

POST /like (Requires authentication)
Request Body: { queryId, resolutionId }

POST /dislike (Requires authentication)
Request Body: { queryId, resolutionId }

GET /all

DELETE /delete/:id (Requires authentication)

# Admin Routes (/api/admin)
POST /create-initial-admin
Request Body: { email, password }

POST /login
Request Body: { email, password }

POST /add (Requires admin authentication)
Request Body: { email, password }

GET /users (Requires admin authentication)

PUT /users/:id (Requires admin authentication)
Request Body: { name, email, password (optional) }

DELETE /users/:id (Requires admin authentication)

# User Routes (/api/user)
POST /register
Request Body: { email, username, password }

POST /login
Request Body: { email, password }

GET /profile (Requires authentication)

PUT /profile (Requires authentication)
Request Body: { name, email }

# Authentication
All protected routes require a JWT (JSON Web Token) in the Authorization header. The token should be prefixed with "Bearer ", like so: Authorization: Bearer <your_jwt_token>


