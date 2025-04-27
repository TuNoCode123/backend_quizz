# Quiz API Application

A RESTful API service built with Express.js and Sequelize for managing quizzes, questions, and user authentication.

## Features

- User Management

  - User registration with email validation
  - User authentication (login/register)
  - Password hashing using bcrypt
  - Role-based access (admin/user)

- Quiz Management
  - Create, read, update, delete quizzes
  - Add questions with multiple options
  - Set correct answers
  - Quiz submissions and scoring
  - Track completion status

## Database Schema

- **Users**

  - id, name, email, password, role
  - Validates email format (@gmail.com)
  - Username length: 3-15 characters

- **Quizzes**

  - id, title, description, created_by
  - Relationships: User (creator), Questions

- **Questions**

  - id, quiz_id, content
  - Relationships: Quiz, Options

- **Options**

  - id, question_id, option_text, is_correct
  - Relationships: Question

- **Submissions**

  - id, user_id, quiz_id, score
  - Tracks completed/uncompleted questions

- **Answers**
  - id, submission_id, question_id, option_id
  - Records user's selected answers

## API Endpoints

### Authentication

- `POST /api/v1/register` - Register new user
- `POST /api/v1/login` - User login

### Quiz Management

- `GET /api/v1/quizzs` - Get all quizzes
- `POST /api/v1/quizzs` - Create quiz
- `PUT /api/v1/quizzs` - Update quiz
- `DELETE /api/v1/quizzs` - Delete quiz
- `GET /api/v1/quizzs/:id` - Get quiz details
- `POST /api/v1/submit-quizz` - Submit quiz answers

### Question Management

- `POST /api/v1/questions` - Create question
- `PUT /api/v1/questions` - Update question
- `DELETE /api/v1/questions/:id` - Delete question

## Setup

1. Clone the repository

2. Install dependencies

````bash
npm install# Quiz API Application

A RESTful API service built with Express.js and Sequelize for managing quizzes, questions, and user authentication.

## Features

- User Management
  - User registration with email validation
  - User authentication (login/register)
  - Password hashing using bcrypt
  - Role-based access (admin/user)

- Quiz Management
  - Create, read, update, delete quizzes
  - Add questions with multiple options
  - Set correct answers
  - Quiz submissions and scoring
  - Track completion status

## Database Schema

- **Users**
  - id, name, email, password, role
  - Validates email format (@gmail.com)
  - Username length: 3-15 characters

- **Quizzes**
  - id, title, description, created_by
  - Relationships: User (creator), Questions

- **Questions**
  - id, quiz_id, content
  - Relationships: Quiz, Options

- **Options**
  - id, question_id, option_text, is_correct
  - Relationships: Question

- **Submissions**
  - id, user_id, quiz_id, score
  - Tracks completed/uncompleted questions

- **Answers**
  - id, submission_id, question_id, option_id
  - Records user's selected answers

## API Endpoints

### Authentication
- `POST /api/v1/register` - Register new user
```
{
    "email":"user5@gmail.com",
    "password":"123456",
    "name":"user"
}
```
- `POST /api/v1/login` - User login
```
{
    "email":"user5@gmail.com",
    "password":"123456"
}
```
### Quiz Management
- `GET /api/v1/quizzs` - Get all quizzes
- `POST /api/v1/quizzs` - Create quiz
```
{
    "userId":1,
    "title":"TOIEC 2025",
    "description":"Try Hard"
}
```
- `PUT /api/v1/quizzs` - Update quiz
```
{
        "quizId": 1,
        "userId": 1,
        "description": "Try Hard 111",
        "title": "TOIEC 2025"
}
```
- `DELETE /api/v1/quizzs` - Delete quiz
```
{
    "quizzId":1,
    "userId":2
}
```
- `GET /api/v1/quizzs/:id` - Get quiz details
```
get via param example: http://localhost:8888/api/v1/quizzs/1
```
- `POST /api/v1/submit-quizz` - Submit quiz answers
```
{
    "userId":1,
    "quizzId":1,
    "answers":[{
        "questionId":1,
        "optionId":7
    }
    ]
}
```
### Question Management
- `POST /api/v1/questions` - Create question
```
```
- `PUT /api/v1/questions` - Update question
- `DELETE /api/v1/questions/:id` - Delete question

## Setup

1. Clone the repository

2. Install dependencies
```bash
npm install


````
