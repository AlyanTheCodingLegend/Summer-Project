import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// add corsOptions here



app.listen(3000, () => { console.log("Server is running on port 3000") });

// add app routers here


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