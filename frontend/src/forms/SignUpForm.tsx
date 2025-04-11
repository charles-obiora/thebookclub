import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { signUpSchema, signUpData } from "@/schemas/signUpandLoginSchema";
import useSignUp from "@/hooks/useSignUp";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const [signUpError, setSignUpError] = useState<AxiosError | null>(null);
  const navigate = useNavigate();

  const signUp = useSignUp();
  const {
    register,
    handleSubmit,
    //setError,
    formState: { errors, isSubmitting },
  } = useForm<signUpData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSignUpSubmit: SubmitHandler<signUpData> = async ({
    userName,
    email,
    password,
  }: signUpData) => {
    // Here you would typically handle the sign-up logic
    console.log({ userName, email, password });

    try {
      const signedUpUser = await signUp(userName, email, password);

      console.log(signedUpUser);

      navigate("/dashboard");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // Log the error response from the backend
        console.log("Sign-up failed:", error.response.data);

        // Call the signUp function
        setSignUpError(error.response.data);
      }
    }

    //console.log(signedUpUser);
  };

  return (
    <form
      onSubmit={handleSubmit(onSignUpSubmit)}
      className="space-y-4"
      noValidate
    >
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700"
        >
          Username
        </label>
        <input
          {...register("userName")}
          type="text"
          placeholder="Username"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
        />
        {errors.userName && (
          <p className="text-red-500 text-xs mt-1">{errors.userName.message}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
        />
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
        )}
      </div>
      {signUpError && (
        <p className="text-red-500 text-xs mt-1">{signUpError.message}</p>
      )}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gray-800 text-white py-2 px-4 rounded-md shadow hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      >
        Register
      </button>
    </form>
  );
};

export default SignUpForm;
