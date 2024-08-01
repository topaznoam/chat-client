import { SocketType } from "./components/ChatPage";

export let currentUserId: number | null = null;
export let currentGroupId: number | null = null;
export let currentUsername: string | null = null;
export let currentSocket: SocketType | null = null;

export const setCurrentUserId = (id: number | null) => {
  currentUserId = id;
};

export const setCurrentGroupId = (id: number | null) => {
  currentGroupId = id;
};

export const setCurrentSocket = (socket: SocketType | null) => {
  currentSocket = socket;
};
export const setCurrentUsername = (username: string | null) => {
  currentUsername = username;
};
