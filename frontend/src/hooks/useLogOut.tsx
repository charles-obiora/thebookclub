import { useAuthContext } from "./AuthStateContext"; // Import the useAuthContext hook
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook from react-router-dom

// Define the UseLogout hook
const UseLogout = () => {
  // Get the dispatch function from the auth context
  const { dispatch } = useAuthContext();

  // Get the navigate function from react-router-dom
  const navigate = useNavigate();

  // Define the logOut function
  const logOut = () => {
    // Remove the user from local storage
    localStorage.removeItem("user");

    // Dispatch the LOGOUT action to update the auth context
    dispatch({ type: "LOGOUT" });

    // Navigate to the login page
    navigate("/auth/login");
  };

  // Return the logOut function
  return logOut;
};

// Export the UseLogout hook as the default export
export default UseLogout;
