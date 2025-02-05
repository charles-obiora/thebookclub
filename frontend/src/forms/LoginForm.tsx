import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { loginSchema, loginData } from "@/schemas/signUpandLoginSchema";
import useLogin from "@/hooks/useLogin";
import { useState } from "react";
import axios, { AxiosError } from "axios";

const LoginForm = () => {
  const [loggedInError, setloggedInError] = useState<AxiosError | null>(null);
  const login = useLogin();
  const {
    register,
    handleSubmit,
    //setError,
    formState: { errors, isSubmitting },
  } = useForm<loginData>({
    resolver: zodResolver(loginSchema),
  });

  const onLoginSubmit: SubmitHandler<loginData> = async ({
    email,
    password,
  }: loginData) => {
    // Here you would typically handle the login logic
    console.log({ email, password });

    try {
      const theLoggedInUser = await login(email, password);

      console.log(theLoggedInUser);

      {
        /* the structure of an axios error response is
    {
  message: "Request failed with status code 400",
  name: "AxiosError",
  stack: "Error: Request failed with status code 400...",
  config: {
    url: "https://api.example.com/login",
    method: "post",
    data: { email: "john@example.com", password: "wrongpassword" }
  },
  code: "ERR_BAD_REQUEST",
  request: {},
  response: {
    data: { message: "Invalid email or password" },
    status: 400,
    statusText: "Bad Request",
    headers: {
      "content-type": "application/json"
    }
  }
}

  if you set up your server to send a message when an error occurs, the message will be attached to the data property of the response property of the error response/object.You can define a type for the data property to make it more specific because it is generic(can be of any type). The data property of the error response is also the same.
 */
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.log(error.response.data);
        setloggedInError(error.response.data);
      } else {
        console.log("An unexpected error occurred");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onLoginSubmit)}
      className="space-y-4"
      noValidate
    >
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
          onChange={() => setloggedInError(null)}
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
          onChange={() => setloggedInError(null)}
        />
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gray-800 text-white py-2 px-4 rounded-md shadow hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      >
        Login
      </button>
      {loggedInError && (
        <p className="text-red-500 text-xs mt-1">{loggedInError.message}</p>
      )}
    </form>
  );
};

export default LoginForm;
