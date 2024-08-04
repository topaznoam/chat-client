import axios from "axios";
import { SERVER_URL } from "../Constants";

export const createGroup = async (
  groupName: string,
  usersList: number[],
  avatarImg: string
) => {
  try {
    const response = await axios.post(`${SERVER_URL}/groups`, {
      name: groupName,
      users: usersList,
      avatar: avatarImg,
    });
    return response.data;
  } catch (error) {
    console.error("Sign Up Error:", error);
    throw error;
  }
};
