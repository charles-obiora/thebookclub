import axios from "axios";
import { useAuthContext } from "./authContext";

const useLogin = () => {
  const { dispatch } = useAuthContext();

  {
    /* the structure of an axios success response is
    {
  data: {},            // The response data from the server
  status: 200,         // HTTP status code (e.g., 200, 201)
  statusText: "OK",    // HTTP status text (e.g., "OK", "Created")
  headers: {},         // Response headers
  config: {},          // Axios config used for the request
  request: {}          // The request object (in Node.js, this is the instance of http.ClientRequest)
}
  what you send from the server will be attached to the data property. You can define a type for the data property to make it more specific because it is generic(can be of any type). The data property of the error response is also the same.
 */
  }
  const login = async (email: string, password: string) => {
    const { data } = await axios.post("http://localhost:4000/api/auth/login", {
      email,
      password,
    });

    const { newUser, token } = data;

    localStorage.setItem(
      "user",
      JSON.stringify({
        userName: newUser.userName,
        email: newUser.email,
      })
    );

    localStorage.setItem("token", JSON.stringify(token));

    dispatch({
      type: "LOGIN",
      payload: { userName: newUser.userName, email: newUser.email },
    });

    return { userName: newUser.userName, email: newUser.email };
  };

  return login;
};

export default useLogin;
