# Restaurant Booking API

## Table of Contents

- [Introduction](#introduction)
- [Setup and Installation](#setup-and-installation)
- [Environment Variables](#environment-variables)
- [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
- [Project Approach](#project-approach)
- [Possible Improvements](#possible-improvements)

---

## Introduction

This is a Node.js and Express-based REST API for managing restaurant bookings. It allows users to create, update, retrieve, and delete bookings while ensuring no double bookings for the same time slot.

## Setup and Installation

### Prerequisites

- Node.js **v20+**
- MongoDB (Local or Cloud)

### Clone the Repository

```sh
git clone https://github.com/Tribhuwan-Joshi/booking
cd booking
```

### Install Dependencies

```sh
npm install
```

### Setup Environment Variables

Create a `.env` file with the following content:

```sh
echo "DB_URI=<your-mongodb-uri>" > .env
```

### Running the Server

```sh
npm start
```

By default, the server runs on `http://localhost:3000`.

---

## API Endpoints

### Booking Routes

| Method | Endpoint            | Description          |
| ------ | ------------------- | -------------------- |
| GET    | `/api/bookings`     | Get all bookings     |
| GET    | `/api/bookings/:id` | Get a booking by ID  |
| POST   | `/api/bookings`     | Create a new booking |
| PUT    | `/api/bookings/:id` | Update a booking     |
| DELETE | `/api/bookings/:id` | Delete a booking     |

---

## Project Approach

- **Modular Structure**: The project is structured with controllers, routes, and models for maintainability.
- **Validation**: `express-validator` is used for validating request data.
- **Error Handling**: Centralized error handling middleware ensures consistency.
- **Database**: Uses MongoDB with Mongoose for schema validation and queries.
- **Logging**: `morgan` is used to log HTTP requests.

---

## Possible Improvements

Given more time, the following enhancements could be implemented:

- **Authentication with JWT**: Implementing user authentication and refresh tokens.
- **Redis Caching**: Improve performance with caching for repeated requests.
- **Scaling with Clusters**: Using Node.js clusters to efficiently handle multiple requests.
