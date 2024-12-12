import { UserModel } from "../models/userModel.js";
import { Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import jsonwebtoken from "jsonwebtoken";

const generateToken = (_id: string): string => {
  if (!_id) {
    throw new Error("User id is invalid");
  }

  if (!process.env.SECRET_KEY) {
    throw new Error("Secret Key is not defined");
  }
  return jsonwebtoken.sign({ _id }, process.env.SECRET_KEY, {
    expiresIn: "3d",
  });
};

export const userSignUp = asyncHandler(async (req: Request, res: Response) => {
  const { userName, email, password } = req.body;

  const newUser = await UserModel.signUp(userName, email, password);

  //const userId = newUser._id;

  {
    /*if (!userId || typeof userId !== "string") {
    throw new Error("User id is invalid");
}*/
  }

  //const token = generateToken(userId);

  if (!newUser._id) {
    throw new Error("User id is invalid");
  }

  const token = generateToken(newUser._id as string);

  res.status(201).json({ message: "User created", newUser, token });
});

export const userLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await UserModel.login(email, password);

  if (!user._id) {
    throw new Error("User id is invalid");
  }

  const token = generateToken(user._id as string);

  if (!token) {
    throw new Error("Token was not successfully created");
  }

  res.status(200).json({ message: "Login successful", user, token });
};
