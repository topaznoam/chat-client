import axios from "axios";
import { ICON, SERVER_URL } from "../Constants";

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${SERVER_URL}/users`);
    return response.data;
  } catch (error) {
    console.error("Error fetching group messages:", error);
    throw error;
  }
};

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

export const updateUserImageInServer = async (
  imageData: string,
  userId: number
) => {
  try {
    const response = await axios.put(
      `${SERVER_URL}/users/${userId}/img`,
      { imageSrc: imageData },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error uploading image to server:", error);
  }
};
