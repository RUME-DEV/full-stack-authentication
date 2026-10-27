# Job Application Tracker

A full-stack web application that helps users manage and track their job applications in one place. Built with React, Node.js, Express, and MongoDB, the application combines secure user authentication with job application management.


## Live Demo

[View Job Application Tracker]()


## Features

- User registration and login
- JWT authentication using HTTP-only cookies
- Protected routes and guest-only routes
- Authentication state management with React Context
- Job application CRUD operations (Create, Read, Update, Delete)
- Track company names, job positions, application statuses, and application dates
- Store job posting URLs and notes
- Filter applications by status
- Search applications by company or position
- View individual application details
- Edit and delete applications
- User-specific application management
- Nested routes and data loading with React Router
- Responsive interface using CSS Modules

## Tech Stack

### Frontend
- React
- React Router
- Axios
- CSS Modules
- Vite

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- HTTP-only Cookies

## Getting Started

### Prerequisites
- Node.js and npm
- MongoDB

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/RUME-DEV/job-application-tracker.git
   ```

2. Navigate into the project directory:

   ```bash
   cd job-application-tracker
   ```

3. Install the dependencies for the frontend and backend in their respective directories:

   ```bash
   npm install
   ```

4. Configure the environment variables required by the backend, including the MongoDB connection string and JWT secret.

5. Start the backend and frontend using the development commands configured in their respective `package.json` files.


## License

This project is available for learning and portfolio purposes.