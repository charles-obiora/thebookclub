//note: you can set a httpserver using express without manually set up a http server first and then passing the

import dotenv from "dotenv";
dotenv.config({ path: "dist/.env" });
import morgan from "morgan";
import { createServer } from "http";
import { Socket, Server } from "socket.io";

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import userRouter from "./routers/userRouter.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const port = process.env.PORT || 5000;
console.log(port);

connectDB();

const app = express(); // cant destructure the properties at this point because app is a special function

const httpServer = createServer(app); //

const { use, get, listen } = app; // at this point it acts like an object so you destructure the properties. You can read more about it

app.use(express.json());

console.log("REACT_APP_API_BASE_URL:", process.env.REACT_APP_API_BASE_URL); // Add this line to debug

// Debugging: Log each incoming request to verify CORS middleware is applied
// I am using morgan below for this purpose
{
  /*use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.path}`);
  next();
});*/
}

const allowedOrigin = process.env.REACT_APP_API_BASE_URL;
console.log("allowedOrigin:", allowedOrigin);

use(morgan("dev"));

use(
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

get("/", (req, res) => {
  res.send("Hello World!");
});

use("/api/auth", userRouter);

const io = new Server(httpServer, {
  cors: {
    origin: allowedOrigin, // Adjust based on your frontend
  },
});

io.on("connection", (socket: Socket) => {
  console.log(`New client connected: ${socket.id}`);

  socket.on("message", (msg: string) => {
    console.log(`Received message: ${msg}`);
    io.emit("message", msg); // Broadcast message to all connected clients
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

use(notFound);
use(errorHandler);
listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
