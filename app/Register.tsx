import InputPassword from "@/elements/InputPassword";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Keyboard, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import InputText from "../elements/InputText";
import style from "../styles/index.styles";
import { useEffect } from "react";

export default function Register() {
  const [username, setUsername] = useState("username");
  const [email, setEmail] = useState("@email");
  const [password, setPassword] = useState("password");
  const [isRegister, setIsRegister] = useState("");
  const [status, setStatus] = useState(false);
  const router = useRouter();

  const handlerFuncion = async () => {
    try {
      const res = await fetch("http://192.168.0.14:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username, email: email, password: password }),
      });
      setStatus(res.ok);

      const data = await res.json();

      setIsRegister(data.msg);
    } catch (error) {
      console.error("Error en el registro:", error);
    }
  };

  useEffect(() => {
    if (status) {
      alert(isRegister);
      router.push("/Login");
    }
  }, [isRegister]);

  return (
    <LinearGradient colors={["#6600a4", "#000000"]} style={style.background}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: "center" }} style={{ width: "100%" }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={style.registerForm}>
            <Text style={style.title}>Register</Text>
            <InputText placeholder="username" styles={style.formInput} setValue={setUsername} />
            <InputText placeholder="@email" styles={style.formInput} setValue={setEmail} />
            <InputPassword placeholder="password" styles={style.formInput} setValue={setPassword} />
            <TouchableOpacity onPress={handlerFuncion}>
              <Text style={style.registerFormButton}>enviar</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </LinearGradient>
  );
}
