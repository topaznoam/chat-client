import axios from "axios";
import { SERVER_URL } from "../Constants";
import { currentSocket } from "../globalvaryables";

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

export const getMyGroups = async (UserId: number) => {
  try {
    const response = await axios.get(`${SERVER_URL}/groups/${UserId}`);
    return response.data;
  } catch (error) {
    console.error("Sign Up Error:", error);
    throw error;
  }
};

export const sendCurrentGroupId = async (groupId: number) => {
  if (groupId) {
    const message = {
      groupId: groupId,
    };
    try {
      if (currentSocket) {
        currentSocket.emit("newMessage", message);
      } else {
        console.error("Socket is not connected");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }
};
