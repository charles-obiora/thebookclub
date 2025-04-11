import dotenv from "dotenv";
dotenv.config({ path: "dist/.env" });
import morgan from "morgan";
import { createServer } from "http";
import { Socket, Server } from "socket.io"; // The Socket is a type setting of the main object for interacting with a client which is usually called    socket.

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import userRouter from "./routers/userRouter.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import { ChatModel } from "./models/chatModel.js";
import jsonwebtoken, { JwtPayload } from "jsonwebtoken";

// Extend the default Socket interface
interface CustomSocket extends Socket {
  userId?: string;
}

const port = process.env.PORT || 5000;
console.log(port);

connectDB();

const app = express(); // cant destructure the properties at this point because app is a special function

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

app.use(morgan("dev"));

app.use(
  cors({
    origin: allowedOrigin, // Use the environment variable
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    allowedHeaders:
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    credentials: true, // If you need to include credentials like cookies
  })
);

app.use("/api/auth", userRouter);
app.use(notFound);
app.use(errorHandler);

const httpServer = createServer(app); //

const io = new Server(httpServer, {
  cors: {
    origin: allowedOrigin, // Adjust based on your frontend
    methods: ["GET", "POST"],

    allowedHeaders:
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    credentials: true, // If you need to include credentials like cookies
  },
});

io.on("connection", (socket: CustomSocket) => {
  try {
    console.log("Auth data from client:", socket.handshake.auth); // ✅ Debugging

    const token = socket.handshake.auth.token; // Get token from connection

    console.log("Token:", token);

    if (!token || !process.env.SECRET_KEY) {
      socket.emit("con", "Token or secret key is not available");

      socket.disconnect();

      throw new Error("Token or secret key is not available");
    }

    const decodedToken = jsonwebtoken.verify(
      token,
      process.env.SECRET_KEY
    ) as JwtPayload;

    console.log(decodedToken);

    const { id } = decodedToken;

    socket.userId = id;

    console.log(socket.userId);

    console.log(`New client connected: ${socket.id}`);
    socket.emit("con", "Hello from the server!");
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }

  const retrieveChats = async () => {
    try {
      const storedChats = await ChatModel.find({}).sort({ createdAt: 1 }); // Sort by oldest first;

      if (storedChats.length === 0) {
        throw new Error("No messages found");
      }
      socket.emit("storedChats", storedChats);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  retrieveChats();

  socket.on("sentChat", async (chat) => {
    console.log(chat);
    chat.senderId = socket.userId;
    console.log(chat);
    console.log(`📩 New chat received: ${chat}`);

    // 1️⃣ Save message to database
    const newChat = new ChatModel(chat);
    await newChat.save();

    // 2️⃣ Broadcast the message to all connected clients
    io.emit("newChat", newChat);

    // 3️⃣ Send confirmation to sender only
    socket.emit("messageStatus", { status: "delivered", message: chat });
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

httpServer.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
