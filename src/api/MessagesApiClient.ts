import axios from "axios";
import { Message } from "../components/MessageBar";
import { currentSocket } from "../globalvaryables";
import { SERVER_URL } from "../Constants";

export const getGroupMessages = async (groupId: number) => {
  try {
    const response = await axios.get(`${SERVER_URL}/messages/${groupId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching group messages:", error);
    throw error;
  }
};
export const sendMessage = async (msg: Message) => {
  const message = {
    data: msg.data,
    user: msg.user,
    group: 1,
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
};
