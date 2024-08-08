import axios from "axios";
import { SERVER_URL } from "../Constants";
import { SocketType } from "../GlobalContext";

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
    console.error("Error creating group:", error);
    throw error;
  }
};

export const getMyGroups = async (userId: number) => {
  try {
    const response = await axios.get(`${SERVER_URL}/groups/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user groups:", error);
    throw error;
  }
};

export const sendCurrentGroupId = async (
  groupId: number,
  socket: SocketType
) => {
  if (groupId) {
    const message = { groupId };
    try {
      socket.emit("newMessage", message);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }
};

export const updateGroupImageInServer = async (
  imageData: string,
  groupId: number
) => {
  try {
    const response = await axios.put(
      `${SERVER_URL}/groups/${groupId}/img`,
      { imageSrc: imageData },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating group image:", error);
    throw error;
  }
};
