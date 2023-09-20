import express from 'express';
import connectDB from './utils/connectDb.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

// Routes importation...
import authRoute from './routes/authRoute.js';
import feedbackRoute from './routes/feedbackRoute.js'
import propertyListingRoute from './routes/propertyListingRoute.js'

const app = express();
const PORT = process.env.PORT || 9000;

// Middlewares...
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: false }));

app.use(cors());

// Routes initialization...
app.use('/auth', authRoute);
app.use('/feedback', feedbackRoute);
app.use('/property', propertyListingRoute);


const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => console.log(`server running on http://localhost:${PORT}...`));
}

startServer();