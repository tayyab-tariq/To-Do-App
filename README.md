# To-Do-App

This project is a MEVN (MongoDB, Express.js, Vue.js, Node.js) application.

## Prerequisites

- Node.js and npm should be installed.
- Docker and Docker Compose should be installed (optional, for running with Docker).

## Manual Setup

### Client

1. Open a terminal and navigate to the `client` directory.
2. Run the following command to install dependencies: **npm install**
3. After the installation is complete, start the development server: **npm run dev**
4. The client application will be accessible at `http://127.0.0.1:5173/`.

### Server

1. Open a terminal and navigate to the `server` directory.
2. Run the following command to install dependencies: **npm install**
3. 3. After the installation is complete, start the server: **npm start**
4. The server will be accessible at `http://localhost:3000`.

## Additional Notes

- Modify the environment variables, configuration files, and other settings as per your requirements.
- Make sure MongoDB is running and accessible at the specified URL in the server configuration. Change the url of MongoDB in the .env server file to 'mongodb://localhost:27017/tasks'.

## Docker Setup

If you prefer running the project using Docker, follow these steps to set up the environment:
  1. Make sure Docker and Docker Compose are installed on your system.
  2. Build the Docker images and start the containers using Docker Compose: **docker-compose up**
  3. The client application will be accessible at `http://localhost:80/`.




