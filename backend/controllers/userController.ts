import { UserModel } from "../models/userModel.js";
import { Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import jsonwebtoken from "jsonwebtoken";

const generateToken = (id: string): string => {
  if (!id) {
    throw new Error("User id is invalid");
  }

  if (!process.env.SECRET_KEY) {
    throw new Error("Secret Key is not defined");
  }
  return jsonwebtoken.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: "3d",
  });
};

export const userSignUp = asyncHandler(async (req: Request, res: Response) => {
  const { userName, email, password } = req.body;

  try {
    const newUser = await UserModel.signUp(userName, email, password);

    console.log(newUser);

    if (!newUser._id) {
      console.log("user id not available");
      throw new Error("User id is invalid");
    }

    const token = generateToken(newUser._id as string);

    res.status(201).json({ newUser, token });
  } catch (error) {
    if (error instanceof Error) {
      if (
        error.message === "Email already exists" ||
        error.message === "Password is incorrect"
      ) {
        res.status(409).json({ message: error.message });
      }
      console.log(error.message);
      res.status(409).json({ message: "There is an issue with the server" });
    }
    console.log("Error is not an instance of error");
  }
});

export const userLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const existingUser = await UserModel.login(email, password);

    if (!existingUser._id) {
      throw new Error("User id is invalid");
    }

    const token = generateToken(existingUser._id as string);

    if (!token) {
      throw new Error("Token was not successfully created");
    }
    // the existingUser contains all the necessary information required for state management on the frontend.
    console.log(existingUser);
    res.status(200).json({ existingUser, token });
  } catch (error) {
    if (error instanceof Error) {
      if (
        // there was no need setting up the "Email is required error and Password is required to be displayed on the frontend by the userController because I am also handling the email and password validation on the frontend"
        error.message === "Email does not exist"
      ) {
        res.status(409).json({ message: error.message });
      }
      console.log(error.message);
      res.status(409).json({ message: "There is an issue with the server" });
    }
    console.log("Error is not an instance of error");
  }
};
