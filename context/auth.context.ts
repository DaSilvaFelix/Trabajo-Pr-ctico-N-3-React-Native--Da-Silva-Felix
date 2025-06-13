import { createContext } from "react";

export const authContext = createContext<{ getter: string | undefined; setGetter: (v: string) => void } | undefined>(undefined);
