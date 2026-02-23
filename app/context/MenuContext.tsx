"use client";
import { createContext, useContext, useState } from "react";

type MenuContextType = {
  activeTitle: string;
  setActiveTitle: (title: string) => void;
};

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeTitle, setActiveTitle] = useState("Dashboard");

  return (
    <MenuContext.Provider value={{ activeTitle, setActiveTitle }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) throw new Error("useMenu must be used within MenuProvider");
  return context;
};