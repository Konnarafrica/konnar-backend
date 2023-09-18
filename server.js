import express from 'express';
import connectDB from './utils/connectDb.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 9000;

// Middlewares...
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());

// Routes initialization...


const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => console.log(`server running on http://localhost:${PORT}...`));
}

startServer();