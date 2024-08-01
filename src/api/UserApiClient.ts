import axios from "axios";
import { ICON, SERVER_URL } from "../Constants";

export const signUp = async (userUsername: string, userPassword: string) => {
  try {
    const response = await axios.post(`${SERVER_URL}/users/signup`, {
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

export const logIn = async (userUsername: string, userPassword: string) => {
  try {
    const response = await axios.post(`${SERVER_URL}/users/login`, {
      username: userUsername,
      password: userPassword,
    });
    return response.data;
  } catch (error) {
    console.error("Log In Error:", error);
    throw error;
  }
};
