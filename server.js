import express from "express";
import connectDB from "./utils/connectDb.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

// Routes importation...
import authRoute from "./routes/authRoute.js";
import feedbackRoute from "./routes/feedbackRoute.js";
import propertyListingRoute from "./routes/propertyListingRoute.js";
import agentRoute from "./routes/agentRoute.js";
import uploadRoute from "./routes/uploadRoute.js";
import userRoute from "./routes/userRoute.js";


const app = express();
const PORT = process.env.PORT || 9000;
const corsOptions = {
  origin: ["http://localhost:3000", "https://konnar-v1.vercel.app", "http://localhost:3001"],
};

// Middlewares...
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: false }));
app.use(cookieParser());
app.use(cors(corsOptions));

//
app.use(express.static("public"));
app.use("/images", express.static("images"));

app.get('/', (req, res, next) => res.status(200).send('service is up'));

// Routes initialization...
app.use("/auth", authRoute);
app.use("/feedback", feedbackRoute);
app.use("/property", propertyListingRoute);
app.use("/agent", agentRoute);
app.use("/upload", uploadRoute);
app.use("/user", userRoute);

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () =>
    console.log(`server running on http://localhost:${PORT}...`)
  );
};

startServer();
