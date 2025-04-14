# REST API Plan

## 1. Resources
- **Users**: Represents application users. Corresponds to the `Users` table.
- **Cards**: Represents flashcards. Corresponds to the `Cards` table.

## 2. Endpoints

### Users

#### Create User
- **Method**: POST
- **URL**: `/users`
- **Description**: Creates a new user.
- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response**:
  ```json
  {
    "id": "integer",
    "email": "string",
    "created_at": "timestamp"
  }
  ```
- **Success Codes**: 201 Created
- **Error Codes**: 400 Bad Request, 409 Conflict

#### Update Password
- **Method**: PUT
- **URL**: `/users/{userId}/password`
- **Description**: Updates the user's password.
- **Request Body**:
  ```json
  {
    "password": "string"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Password updated successfully."
  }
  ```
- **Success Codes**: 200 OK
- **Error Codes**: 400 Bad Request, 404 Not Found

#### Delete User
- **Method**: DELETE
- **URL**: `/users/{userId}`
- **Description**: Deletes the user and all associated data.
- **Response**:
  ```json
  {
    "message": "User deleted successfully."
  }
  ```
- **Success Codes**: 200 OK
- **Error Codes**: 404 Not Found

### Cards

#### Create Card
- **Method**: POST
- **URL**: `/cards`
- **Description**: Creates a new card.
- **Request Body**:
  ```json
  {
    "user_id": "integer",
    "front": "string",
    "back": "string",
    "source": "string"
  }
  ```
- **Response**:
  ```json
  {
    "id": "integer",
    "front": "string",
    "back": "string",
    "source": "string",
    "created_at": "timestamp"
  }
  ```
- **Success Codes**: 201 Created
- **Error Codes**: 400 Bad Request

#### Create Multiple Cards
- **Method**: POST
- **URL**: `/cards/bulk`
- **Description**: Creates multiple cards in a single request.
- **Request Body**:
  ```json
  {
    "cards": [
      {
        "user_id": "integer",
        "front": "string",
        "back": "string",
        "source": "string"
      }
    ]
  }
  ```
- **Response**:
  ```json
  {
    "created_cards": [
      {
        "id": "integer",
        "front": "string",
        "back": "string",
        "source": "string",
        "created_at": "timestamp"
      }
    ]
  }
  ```
- **Success Codes**: 201 Created
- **Error Codes**: 400 Bad Request, 409 Conflict

#### Get Cards
- **Method**: GET
- **URL**: `/cards`
- **Description**: Retrieves a list of cards.
- **Query Parameters**:
  - `user_id` (optional): Filter by user ID.
  - `limit` (optional): Number of records to return.
  - `offset` (optional): Number of records to skip.
- **Response**:
  ```json
  [
    {
      "id": "integer",
      "front": "string",
      "created_at": "timestamp"
    }
  ]
  ```
- **Success Codes**: 200 OK
- **Error Codes**: 400 Bad Request

#### Delete Cards
- **Method**: DELETE
- **URL**: `/cards`
- **Description**: Deletes multiple cards.
- **Request Body**:
  ```json
  {
    "card_ids": ["integer"]
  }
  ```
- **Response**:
  ```json
  {
    "message": "Cards deleted successfully."
  }
  ```
- **Success Codes**: 200 OK
- **Error Codes**: 400 Bad Request, 404 Not Found

#### AI-Generated Cards
- **Method**: POST
- **URL**: `/ai/cards`
- **Description**: Submits text to generate card suggestions.
- **Request Body**:
  ```json
  {
    "text": "string"
  }
  ```
- **Response**:
  ```json
  [
    {
      "front": "string",
      "back": "string"
    }
  ]
  ```
- **Success Codes**: 200 OK
- **Error Codes**: 400 Bad Request

## 4. Validation and Business Logic

### Validation
- **Users**:
  - `email`: Must be unique and a valid email format.
  - `password`: Must meet security requirements (e.g., minimum length).
- **Cards**:
  - `front`: Max 200 characters.
  - `back`: Max 500 characters.
  - `source`: Must be one of `('ai-full', 'ai-edited', 'manual')`.

### Business Logic
- **Cascade Deletion**: Deleting a user removes all associated cards.
- **AI Suggestions**: Suggestions are not saved unless explicitly accepted by the user.
- **Bulk Deletion**: Allows users to delete multiple cards in a single request.
- **Spaced Repetition**: Logs review data for integration with external algorithms.