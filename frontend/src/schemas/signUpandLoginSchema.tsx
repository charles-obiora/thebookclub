import { z } from "zod";
export const signUpSchema = z.object({
  userName: z.string().min(1, { message: "DisplayName is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export type loginData = z.infer<typeof loginSchema>;
export type signUpData = z.infer<typeof signUpSchema>;
