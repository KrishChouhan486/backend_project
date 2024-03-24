// Importing necessary modules from their respective packages
import express from "express"; // Express is imported for creating the web application
import cors from "cors"; // CORS is imported for handling Cross-Origin Resource Sharing
import cookieParser from "cookie-parser"; // Cookie Parser is imported for parsing cookies

// Creating an Express application instance
const app = express();

// Using CORS middleware to allow requests from a specific origin and with credentials
app.use(cors({
  origin: process.env.CORS_ORIGIN, // Specifies the allowed origin from environment variables
  credentials:true // Allows credentials like cookies to be included in the request
}));

// Using JSON parser middleware to handle JSON data in the request and setting a data limit
app.use(express.json({limit: "16kb"}));

// Using URL-encoded data middleware to handle data sent from URLs
app.use(express.urlencoded({extended: true, limit:"16kb"}));

// Serving static files from the "public" directory
app.use(express.static("public"));

// Using Cookie Parser middleware to parse cookies in the incoming request
app.use(cookieParser());

//routes import

import userRouter from './routes/user.routes.js';

//routes declaration
app.use("/api/v1/users",userRouter);

// Exporting the Express application
export default app;
