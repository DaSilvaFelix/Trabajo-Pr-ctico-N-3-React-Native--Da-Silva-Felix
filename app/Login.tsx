import InputPassword from "@/elements/InputPassword";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { Keyboard, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import InputText from "../elements/InputText";
import style from "../styles/index.styles";
export default function Login() {
  const [email, setEmail] = useState("@email");
  const [password, setPassword] = useState("password");
  const [isLogin, setIsLogin] = useState("");
  const [status, setStatus] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://192.168.0.14:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Device-Type": "mobile",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.sessionToken) await SecureStore.setItemAsync("user_session", data.sessionToken);

      const sessionToken = await SecureStore.getItemAsync("user_session");

      if (!sessionToken) console.log("No hay sesión activa");

      const req = await fetch("http://192.168.0.14:3000/getUser", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${sessionToken}`,
          "Content-Type": "application/json",
        },
      });

      const userData = await req.json();

      if (userData) {
        setStatus(true);
        setIsLogin("acceso concedido");
      } else {
        setStatus(false);
        setIsLogin("acceso denegado");
      }
    } catch (error) {
      console.error("Error en login:", error);
    }
  };

  useEffect(() => {
    if (status) {
      alert(isLogin);
      router.push("/home/CreateTask");
    }
  }, [isLogin]);

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
