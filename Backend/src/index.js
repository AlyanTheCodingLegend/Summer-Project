import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { WebSocket, WebSocketServer } from 'ws';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 3000;

// add corsOptions here

const server = app.listen(PORT, () => { console.log("Server is running on port 3000") });

// add app routers here


// initialise ws server
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => { 
    console.log('New client connected!'); 

    ws.on('message', (message) => 
    {
        console.log(`Received: ${message}`);
        wss.clients.forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {client.send(message)}    
        });
    });

    ws.on('close', () => console.log("Client disconnected!"))
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