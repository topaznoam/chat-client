import axios from "axios";
import { Message } from "../components/MessageBar";
import { SERVER_URL } from "../Constants";
import { SocketType } from "../GlobalContext";

export const getGroupMessages = async (groupId: number) => {
  try {
    const response = await axios.get(`${SERVER_URL}/messages/${groupId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching group messages:", error);
    throw error;
  }
};

export const sendMessage = async (msg: Message, socket: SocketType) => {
  if (msg.group && msg.data && msg.user) {
    const message = {
      data: msg.data,
      user: msg.user,
      group: msg.group,
    };
    try {
      socket.emit("newMessage", message);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  } else {
    console.error("Message details are incomplete");
  }
};
