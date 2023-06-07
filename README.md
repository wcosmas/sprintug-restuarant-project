# sprintug-restuarant-project

This README file provides instructions for setting up and running the app. These instructions assume that you have basic knowledge of node, react and the command line.

## Prerequisites

Before you can set up and run the app, you will need the following:

- Node.js 10 or later
- npm

## Setting up the backend

1. Open your terminal and navigate to the backend directory and run the command below to install packages

    ```
    npm install
    ```

2. Create `uploads` folder. All uploaded images of resturants will be saved there.
3. Create `.env` file and provide the `DB_URL` for your mongo database and `PORT` for your desired server port.
4. Start the server by running the command below

    ```
    node app.js
    ```

## Setting up the frontend

1. Open your terminal and navigate to the frontend directory and run the command below to install packages

    ```
    npm install
    ```

2. Create `.env` file and provide `VITE_API_URL` for example <http://127.0.0.1:8000/>
3. Run the command below to start the development server

    ```
    npm run dev
    ```

4. Open your web browser and go to <http://127.0.0.1:5173/>. You should see the app
