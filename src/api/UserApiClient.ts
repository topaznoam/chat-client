import axios from "axios";
import { ICON } from "../Constants";

export const SignUp = async (userUsername: string, userPassword: string) => {
  try {
    const response = await axios.post("http://localhost:3000/users/signup", {
      username: userUsername,
      password: userPassword,
      avatar: ICON,
    });
    return response.data;
  } catch (error) {
    console.error("Sign Up Error:", error);
    throw error;
  }
};

export const LogIn = async (userUsername: string, userPassword: string) => {
  try {
    const response = await axios.post("http://localhost:3000/users/login", {
      username: userUsername,
      password: userPassword,
    });
    return response.data;
  } catch (error) {
    console.error("Log In Error:", error);
    throw error;
  }
};
