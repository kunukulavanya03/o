# FastAPI Application

## Setup

1. Install dependencies: `pip install -r requirements.txt`
2. Create a `.env` file with the following variables:
    - `DATABASE_URL`: The URL of the database to use.
    - `SECRET_KEY`: The secret key to use for JWT encryption.
    - `ACCESS_TOKEN_EXPIRE_MINUTES`: The number of minutes before an access token expires.
3. Run the application: `uvicorn app.main:app --host 0.0.0.0 --port 8000`

## API Documentation

### Health Check

* `GET /health`: Returns the status of the application.

### Users

* `GET /users`: Returns a list of all users.
* `POST /users`: Creates a new user.
* `GET /users/{user_id}`: Returns a user by ID.
* `PUT /users/{user_id}`: Updates a user.
* `DELETE /users/{user_id}`: Deletes a user.

### Login

* `POST /login`: Logs in a user and returns an access token.
