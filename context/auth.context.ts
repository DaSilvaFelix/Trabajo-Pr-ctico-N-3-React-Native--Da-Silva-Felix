import { createContext } from "react";

export const authContext = createContext<{
  isLogin: boolean;
  setIsLogin: (value: boolean) => void;
}>({
  isLogin: false,
  setIsLogin: () => {},
});
