//ts-nocheck

import dotenv from "dotenv";
dotenv.config({ path: "dist/.env" });
import morgan from "morgan";

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import userRouter from "./routers/userRouter.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const port = process.env.PORT || 5000;
console.log(port);

const app = express();

app.use(express.json());

console.log("REACT_APP_API_BASE_URL:", process.env.REACT_APP_API_BASE_URL); // Add this line to debug

// Debugging: Log each incoming request to verify CORS middleware is applied
{
  /*app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.path}`);
  next();
});*/
}

app.use(morgan("dev"));

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

connectDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", userRouter);

// 404 page
{
  /*app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});*/
}

//console.log("Hello");

app.use(notFound);
app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
