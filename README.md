# Track-the-Bug

Track-the-Bug is a full-stack web application designed to help development teams manage and track bugs and issues in their projects. It provides a user-friendly interface for creating, updating, and monitoring tickets, as well as visualizing project statistics.

## Features

- User authentication (login and registration)
- Dashboard with project overview and ticket statistics
- Create and manage projects
- Create and manage tickets (bugs, issues, and feature requests)
- Visualize ticket data with interactive charts
- Responsive design for desktop and mobile use

## Tech Stack

### Frontend
- React.js
- React Router for navigation
- Chart.js for data visualization
- Axios for API requests

### Backend
- Node.js
- Express.js
- MongoDB for database
- Swagger for API documentation

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- MongoDB Atlas account or local MongoDB installation

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/track-the-bug.git
   cd track-the-bug
   ```

2. Install dependencies for both frontend and backend:
   ```
   npm install
   cd backend
   npm install
   cd ..
   ```

3. Set up environment variables:
   Create a `.env` file in the `backend` directory and add your MongoDB connection string:
   ```
   MONGODB_URI=your_mongodb_connection_string
   ```

4. Start the backend server:
   ```
   cd backend
   npm run dev
   ```

5. In a new terminal, start the frontend development server:
   ```
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:3000` to view the application.

## API Documentation

The API documentation is available via Swagger UI. After starting the backend server, navigate to `http://localhost:5000/api-docs` in your browser to view and interact with the API documentation.

## Project Structure

- `/src`: Frontend React application
  - `/components`: React components
  - `/service`: API service functions
- `/backend`: Backend Express application
  - `/routes`: API route definitions
  - `app.js`: Main Express application file
  - `dbconnect.js`: MongoDB connection setup

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.