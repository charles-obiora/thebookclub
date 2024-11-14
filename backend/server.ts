import dotenv from "dotenv";
dotenv.config({ path: "backend/.env" });

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

const port = process.env.PORT || 5000;
console.log(port);

connectDB();

const app = express();

app.use(express.json());

console.log("REACT_APP_API_BASE_URL:", process.env.REACT_APP_API_BASE_URL); // Add this line to debug

// Debugging: Log each incoming request to verify CORS middleware is applied
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.path}`);
  next();
});

const allowedOrigin = process.env.REACT_APP_API_BASE_URL;
console.log("allowedOrigin:", allowedOrigin);

app.use(
  cors({
    origin: allowedOrigin, // Use the environment variable
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    allowedHeaders:
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    credentials: true, // If you need to include credentials like cookies
  })
);

// Routes
console.log(
  "REACT_APP_API_BASE_URL_SECOND:",
  process.env.REACT_APP_API_BASE_URL
); // Add this line to debug

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//console.log("Hello");

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
