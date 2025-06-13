import { authContext } from "@/context/auth.context";
import InputPassword from "@/elements/InputPassword";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useContext, useEffect, useState } from "react";
import { Keyboard, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import InputText from "../elements/InputText";
import style from "../styles/index.styles";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useContext(authContext);

  // verificamos si la sección esta activa para redirigir al usuario
  useEffect(() => {
    if (auth?.isLogin) {
      router.replace("/home/CreateTask");
    }
  }, [auth.isLogin]);

  // función para obtener el token y iniciar sesión
  const handleLogin = async () => {
    try {
      // llamamos a servidor en la ruta donde nos proporcionara el token generado
      const req = await fetch("http://192.168.0.21:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Device-Type": "mobile" }, // avisamos que es para un dispositivo mobile
        body: JSON.stringify({ email, password }), // pasamos el correo y la contraseña
      });

      const res = await req.json(); // convertimos las respuesta en json

      // verificamos que la respuesta allá salido correctamente
      if (!req.ok) {
        alert(res.msg || "Credenciales incorrectas"); // si salio mal mandamos una alerta del mensaje del servidor para ver que nos dice
        return; // terminamos al ejecución del código
      }

      // guardamos el token proporcionado en SecureStore
      await SecureStore.setItemAsync("token", res.token);

      // solicitamos la verificación del token al servidor
      const userReq = await fetch("http://192.168.0.21:3000/getUser", {
        headers: {
          "Content-Type": "application/json",
          authorization: res.token, // mandamos el token por cabecera
        },
      });

      const userRes = await userReq.json(); // convertimos la respuesta en formato json

      // verificamos que la petición y si devolvió la respuesta correctamente
      if (!userReq.ok || !userRes) {
        alert("No se pudo obtener el usuario"); // si alguno de los dos sale mal alertamos que nos e pudo obtener los datos del usuario
        return; // paramos las ejecución de los siguientes códigos
      }

      auth?.setIsLogin(true); // llamamos al método para activar la sección del usuario y la activamos si todo los anteriores código salieron correctamente

      alert(res.msg); // alertamos con el mensaje de que todo salio bien de parte del servidor

      router.replace("/home/CreateTask"); // redirigimos al usuario al home

      // bloque de código para atrapar cualquier error
    } catch (error) {
      console.error("Error en login:", error); // mostramos el error por consola
      alert("Error de conexión"); // alertamos de manera que ubo un error de conexión nada mas
    }
  };

  return (
    <LinearGradient colors={["#6600a4", "#000000"]} style={style.background}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: "center" }} style={{ width: "100%" }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={style.loginForm}>
            <Text style={style.title}>Login</Text>
            <InputText placeholder="@email" styles={style.formInput} setValue={setEmail} />
            <InputPassword placeholder="password" styles={style.formInput} setValue={setPassword} />
            <TouchableOpacity onPress={handleLogin}>
              <Text style={style.registerFormButton}>enviar</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </LinearGradient>
  );
}
