import { useState } from "react";
import LoginForm from "@/forms/LoginForm";
import SignUpForm from "@/forms/SignUpForm";

const AuthhPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold mb-2 text-center">
          Digital Book Club
        </h1>
        <p className="text-sm text-gray-600 text-center mb-4">
          Login or create an account to join the discussion
        </p>
        <div className="flex justify-center mb-6">
          <button
            className={`px-4 py-2 font-medium ${
              isLogin
                ? "text-gray-800 border-b-2 border-gray-800"
                : "text-gray-600"
            } hover:border-gray-800 focus:border-gray-800`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              !isLogin
                ? "text-gray-800 border-b-2 border-gray-800"
                : "text-gray-600"
            } hover:border-gray-800 focus:border-gray-800`}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>
        {isLogin ? <LoginForm /> : <SignUpForm />}
        <p className="text-xs text-gray-500 text-center mt-4">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default AuthhPage;
