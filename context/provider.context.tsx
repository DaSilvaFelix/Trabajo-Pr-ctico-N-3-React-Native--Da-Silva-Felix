import * as SecureStore from "expo-secure-store";
import React, { ReactNode, useEffect, useState } from "react";
import { authContext } from "./auth.context";

export const ProviderContext: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    // función para llamar la verificación de la session
    const getData = async () => {
      try {
        const token = await SecureStore.getItemAsync("token"); // verificamos que el token exista
        console.log("token de SecureStore:", token); //mostramos el token

        if (!token) {
          setIsLogin(false); // si no existe la session esta inactiva
          return;
        }

        // llamamos al servidor para que verifique el token
        const res = await fetch("http://192.168.0.21:3000/getUser", {
          headers: {
            "Content-Type": "application/json",
            authorization: token, // pasamos el token por cabecera
          },
        });

        const data = await res.json(); // convertimos los datos a json

        console.log("datos de respuesta:", data); // mostramos los datos recibidos

        if (data) {
          setIsLogin(true); // si los datos están correctos la sección se activa
        } else {
          setIsLogin(false); // en el caso contrario estará inactiva
        }
      } catch (error) {
        console.error("Error al obtener el usuario:", error); // mostramos si ocurre un error
        setIsLogin(false); // si ocurrió un error la sección estará inactiva
      }
    };

    getData();
    console.log("estado de la sección", isLogin);
  }, [isLogin]); // importante: no uses isLogin como dependencia para evitar loops

  return <authContext.Provider value={{ isLogin, setIsLogin }}>{children}</authContext.Provider>;
};
