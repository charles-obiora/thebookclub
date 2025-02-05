import axios from "axios";
import { useAuthContext } from "./authContext";

const useSignUp = () => {
  const { dispatch } = useAuthContext();
  const signUp = async (userName: string, email: string, password: string) => {
    const { data } = await axios.post("http://localhost:4000/api/auth/signUp", {
      userName,
      email,
      password,
    });

    console.log(data);

    const { newUser, token } = data;

    {
      /*if (!newUser) {
      throw new Error("User sign failed");
    }*/
    }

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

    return newUser;
  };

  return signUp;
};

export default useSignUp;
