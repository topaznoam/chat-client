// src/contexts/GlobalContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Socket } from "socket.io-client";
export type SocketType = Socket<any, any>;

export type GroupProps = {
  id: number;
  name: string;
  avatar: string;
  onClick: () => void | null;
};

export type selfUserProps = {
  myId: number;
  myAvatar: string | null;
  myUserName: string | null;
};

export type GlobalContextProps = {
  currentUser: selfUserProps | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<selfUserProps | null>>;
  currentGroup: GroupProps | null;
  setCurrentGroup: React.Dispatch<React.SetStateAction<GroupProps | null>>;
  currentSocket: SocketType | null;
  setCurrentSocket: React.Dispatch<React.SetStateAction<SocketType | null>>;
};

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

export const GlobalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<selfUserProps | null>(null);
  const [currentGroup, setCurrentGroup] = useState<GroupProps | null>(null);
  const [currentSocket, setCurrentSocket] = useState<SocketType | null>(null);

  return (
    <GlobalContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        currentGroup,
        setCurrentGroup,
        currentSocket,
        setCurrentSocket,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
