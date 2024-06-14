# Awesome Chat App

Welcome to the Awesome Chat App! This project combines a WebSocket server with an Express application for the backend and a Vite-powered frontend. Follow the instructions below to set up and run the project.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Installation

### Backend Setup

1. Navigate to the backend directory:
    ```bash
    cd backend
    ```

2. Install the necessary dependencies:
    ```bash
    npm install
    ```

3. Start the backend server:
    ```bash
    node src/index.js
    ```

### Frontend Setup

1. Navigate to the frontend directory:
    ```bash
    cd frontend
    ```

2. Install the necessary dependencies:
    ```bash
    npm install
    ```

3. Start the frontend development server:
    ```bash
    npm run dev
    ```

## Usage

Once both the backend and frontend servers are running, you can start chatting away! Open your browser and navigate to the address provided by the Vite development server (usually `http://localhost:5173`).

## Project Structure

Here's an overview of the project's structure:

```
Awesome-Chat-App/
├── backend/
│   ├── src/
│   │   ├── index.js
│   ├── package.json
├── frontend/
│   ├── src/
│   │   ├── main.js
│   ├── package.json
├── README.md
```

- **backend/**: Contains the WebSocket server and Express application.
- **frontend/**: Contains the Vite-powered frontend application.

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/YourFeatureName`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/YourFeatureName`.
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

