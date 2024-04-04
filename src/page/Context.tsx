import { createContext, useContext } from "react";
import { MyContextProps } from "./style";



export const Productfeedback = createContext<MyContextProps | undefined>(undefined);

export function Context() {
  const context = useContext(Productfeedback);

  if (context === undefined) {
    throw new Error("useUserContext must be used with a MyContext");
  }

  return context;
}