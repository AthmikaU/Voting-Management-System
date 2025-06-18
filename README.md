# Voting Management System

## Overview

The Voting Management System is a full-stack web application that allows registered voters to securely cast their vote and ensures that no voter can vote more than once. Admins have full control over election management including adding parties, voters, and candidates, and publishing the election results. Built with ReactJS for the frontend, NodeJS for the backend, and MongoDB for the database, it offers a modern and responsive user experience.

## Features

* **Secure Voting**: Each voter is allowed to vote only once. Duplicate voting is strictly restricted.
* **Voter Dashboard**: A clean and simple interface for voters to view the ballot paper and cast their vote.
* **Admin Panel**: Admins can manage voters, parties, candidates, and constituencies. Admins can also publish results.
* **Ballot Paper**: Intuitive UI where voters can view parties/candidates and cast votes.
* **Real-time Results**: Admin can publish live election results after voting is concluded.
* **Constituency Management**: Organize elections on the basis of defined constituencies.

## Technologies Used

* **ReactJS**: Frontend library for building interactive user interfaces.
* **NodeJS**: Backend server environment for handling API requests and business logic.
* **MongoDB Shell**: NoSQL database for storing voters, parties, candidates, and vote records.
* **ExpressJS**: For building robust RESTful APIs.
* **React Router**: For navigation between voter, admin, and other pages.

## Installation and Setup

### Prerequisites

* NodeJS and npm
* MongoDB installed locally or a MongoDB Atlas account
* Web browser (e.g., Chrome, Firefox)

### Steps

1. **Clone the Repository**:

```bash
git clone https://github.com/AthmikaU/Voting-Management-System.git
```

2. **Backend Setup**:

```bash
cd Voting-Management-System/backend
npm install
```

* Configure your MongoDB connection string in `.env`:

```env
MONGODB_URI=mongodb://localhost:27017/votingSystem
PORT=5000
```

* Start the backend server:

```bash
npm start
```

3. **Frontend Setup**:

```bash
cd ../frontend
npm install
npm start
```

4. **Database Initialization**:

* Use MongoDB Shell or Compass to create necessary collections: `voters`, `parties`, `candidates`, `constituencies`, and `votes`.

## Usage

* Navigate to `http://localhost:3000` for the frontend.
* Voters can log in and cast their vote.
* Admins can log in at `/admin` to manage elections.
* Vote once per user — the system will block repeat voting.
* After all votes are cast, the admin can publish the result which will be visible to all users.

## Project Structure

```
Voting-Management-System/
│
├── backend/                  # NodeJS backend
│   ├── models/               # Mongoose schemas
│   ├── routes/               # API routes
│   ├── controllers/          # Logic handlers
│   └── server.js             # Entry point
│
├── frontend/                 # ReactJS frontend
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   ├── pages/            # Voter, Admin, Ballot, etc.
│   │   ├── App.js
│   │   └── index.js
│
└── README.md                 # This file
```

## Contribution

If you have any suggestions or improvements, feel free to submit a pull request or open an issue on the GitHub repository.

## Contact

For any inquiries, please contact me at [athmikaubhat@gmail.com](mailto:athmikaubhat@gmail.com)
