import express from "express";
import jsonwebtoken from "jsonwebtoken";

// Middleware function to authenticate users based on JWT
const authMiddleware = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    // Retrieve the "Authorization" header from the incoming request
    const authHeader = req.headers.authorization;

    // If the authorization header is missing, throw an error
    if (!authHeader) {
      throw new Error("Authorization header not found");
    }

    // Extract the token from the "Authorization" header (format: "Bearer <token>")
    const token = authHeader.split(" ")[1];

    // If the token is missing, throw an error
    if (!token) {
      throw new Error("Token not found");
    }

    // Verify and decode the token using the secret key stored in environment variables
    // Explicitly cast the result as `jsonwebtoken.JwtPayload` to avoid TypeScript errors
    // The payload you passed while signing the token was an object with an id property and that is why the payload been returned after verification is also an object
    const decodedToken = jsonwebtoken.verify(
      token,
      process.env.SECRET_KEY as string
    ) as jsonwebtoken.JwtPayload;

    // Ensure that the decoded token contains a valid user ID
    if (!decodedToken.id) {
      throw new Error("Token does not contain a valid user ID");
    }

    // Extract the `id` from the decoded token (optional, since we are not using it here)
    const { id } = decodedToken;

    // Call `next()` to pass control to the next middleware or route handler
    next();
  } catch (error) {
    // Handle authentication errors by sending a 401 Unauthorized response
    if (error instanceof Error) {
      res.status(401).json({ message: error.message });
    }
  }
};

export default authMiddleware; // Exporting the middleware for use in routes
