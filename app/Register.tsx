import InputPassword from "@/elements/InputPassword";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Keyboard, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import InputText from "../elements/InputText";
import style from "../styles/index.styles";

export default function Register() {
  const [username, setUsername] = useState("username");
  const [email, setEmail] = useState("@email");
  const [password, setPassword] = useState("password");
  const router = useRouter();

  return (
    <LinearGradient colors={["#6600a4", "#000000"]} style={style.background}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: "center" }} style={{ width: "100%" }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={style.registerForm}>
            <Text style={style.title}>Register</Text>
            <InputText placeholder="username" styles={style.formInput} setValue={setUsername} />
            <InputText placeholder="@email" styles={style.formInput} setValue={setEmail} />
            <InputPassword placeholder="password" styles={style.formInput} setValue={setPassword} />
            <TouchableOpacity
              onPress={() => {
                console.log(username);
                console.log(email);
                console.log(password);
                router.push("/home/CreateTask");
              }}
            >
              <Text style={style.registerFormButton}>enviar</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </LinearGradient>
  );
}
