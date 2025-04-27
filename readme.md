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
```bash
npm install


````
