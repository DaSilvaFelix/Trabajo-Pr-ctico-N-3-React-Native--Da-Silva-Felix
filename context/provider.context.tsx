import React, { ReactNode, useEffect, useState } from "react";
import { authContext } from "./auth.context";

export const ProviderContext: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [getter, setGetter] = useState<string | undefined>(undefined);

  const getData = async () => {
    const data = "hola mundo";
    return data;
  };

  useEffect(() => {
    (async () => {
      const data = await getData();
      setGetter(data);
    })();
  }, []);

  return <authContext.Provider value={{ getter, setGetter }}>{children}</authContext.Provider>;
};
