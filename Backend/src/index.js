import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { WebSocket, WebSocketServer } from 'ws';
import { ChatManager } from './ChatManager';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 3000;

// add corsOptions here

const server = app.listen(PORT, () => { console.log("Server is running on port 3000") });

// add app routers here


// create a ChatManager instance to handle chats and users

const chatManager = new ChatManager();

// initialise ws server
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => { 
    chatManager.addHandler(ws)
});

// error middleware (use in catch blocks in endpoints)
app.use((error, request, response, next) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal Server Error";
    return response.status(statusCode).json(
    {
        success: false,
        statusCode,
        message,
    });
});