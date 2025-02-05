import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

// Define the TypeScript interface for a User
interface IUser extends Document {
  userName: string;
  email: string;
  password: string;
  isAdmin?: boolean; // Optional because there's a default value
}

// Define the Mongoose schema
const userSchema: Schema<IUser> = new Schema(
  {
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Extend the Mongoose Model interface to include the signUp and login static method
//******Read up on this, you still don't understand it */
interface IUserModel extends Model<IUser> {
  signUp(userName: string, email: string, password: string): Promise<IUser>;

  login(email: string, password: string): Promise<IUser>;
}

userSchema.statics.signUp = async function (
  this: Model<IUser>,
  userName: string,
  email: string,
  password: string
) {
  if (!userName || !email || !password) {
    throw new Error(
      !userName
        ? "Username is required"
        : !email
        ? "Email is required"
        : "Password is required"
    );
  }

  if (!validator.isEmail(email)) {
    throw new Error("Email is invalid");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong enough");
  }

  // Check if there is an existing user with the same email
  const emailExists = await this.findOne({ email });

  // if a user with the same email exists, throw an error
  if (emailExists) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  if (!hashedPassword) {
    throw new Error("Error hashing password");
  }

  const newUser = await this.create({
    userName,
    email,
    password: hashedPassword,
  });

  await newUser.save();

  return newUser;
};

userSchema.statics.login = async function (
  this: Model<IUser>,
  email: string,
  password: string
) {
  if (!email) {
    throw new Error("Email is required");
  }

  if (!password) {
    throw new Error("Password is required");
  }

  const userWithEmailExists = await this.findOne({ email });

  if (!userWithEmailExists) {
    throw new Error("Email does not exist");
  }

  const validatePassword = await bcrypt.compare(
    password,
    userWithEmailExists.password
  );

  if (!validatePassword) {
    throw new Error("Password is weak");
  }

  return userWithEmailExists;
};

// Export the Mongoose model with the extended interface
export const UserModel = mongoose.model<IUser, IUserModel>("User", userSchema);
