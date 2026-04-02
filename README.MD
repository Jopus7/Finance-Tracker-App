# Finance Tracker App

## Description
A full-stack web application for managing personal finances. The application allows users to register, log in, and track their financial transactions.

## Tech Stack
- **Backend:** FastAPI
- **Frontend:** React
- **Database:** PostgreSQL
- **ORM:** SQLAlchemy
- **Authentication:** JWT
- **Containerization:** Docker

## Features
- User authentication (registration & login with JWT)
- Create, read, update, and delete transactions
- REST API for managing users and financial data
- Persistent data storage using PostgreSQL
- Dockerized application setup

## API Overview
Example endpoints:
- `POST /auth/register`
- `POST /auth/login`
- `GET /transactions`
- `POST /transactions`
- `DELETE /transactions/{id}`

## How to Run

### Using Docker
```bash
docker-compose up --build
