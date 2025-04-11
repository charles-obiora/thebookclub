import mongoose, { Schema, Document, Model } from "mongoose";

// Define the TypeScript interface for a User
interface IChat extends Document {
  senderId: string;
  senderUserName: string;
  message: string;
}

// Define the Mongoose schema
const chatSchema: Schema<IChat> = new Schema(
  {
    senderId: { type: String, required: true },
    senderUserName: { type: String, required: true },
    message: { type: String, required: true },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Export the Mongoose model with the extended interface
export const ChatModel = mongoose.model<IChat, Model<IChat>>(
  "Chat",
  chatSchema
);
