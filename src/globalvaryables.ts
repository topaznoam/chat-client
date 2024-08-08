import { SocketType } from "./GlobalContext";

export let currentUserId: number | null = null;
export let currentGroupId: number | null = null;
export let currentUsername: string | null = null;
export let currentSocket: SocketType | null = null;
export let currentUserImg: string | null = null;

export const setCurrentUserImg = (img: string | null) => {
  currentUserImg = img;
};
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
export const resetglobals = () => {
  currentUserId = null;
  currentGroupId = null;
  currentSocket = null;
  currentUsername = null;
};
