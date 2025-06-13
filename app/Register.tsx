import { authContext } from "@/context/auth.context";
import InputPassword from "@/elements/InputPassword";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { Keyboard, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import InputText from "../elements/InputText";
import style from "../styles/index.styles";

export default function Register() {
  // métodos para el manejo de rutado y uso del contexto global
  const router = useRouter();
  const auth = useContext(authContext);

  // Estados de almacenamiento para los datos del registro
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Estado que maneja el resultado de la petición al servidor de Register
  const [isRegister, setIsRegister] = useState("");
  const [status, setStatus] = useState(false);

  // Efecto que redirige antes de renderizar si el usuario ya está autenticado
  useEffect(() => {
    if (auth?.getter !== undefined) {
      router.push("/home/CreateTask");
    }
  }, [auth]);

  // función para hacer la petición al servidor y hacer un registro
  const handlerFuncion = async () => {
    try {
      const res = await fetch("http://192.168.0.14:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      setStatus(res.ok);

      setIsRegister(data.msg);
    } catch (error) {
      console.error("Error en el registro:", error);
      alert("Hubo un problema con el registro. Intenta nuevamente.");
    }
  };

  // Efecto que maneja si el estado de la petición salio correctamente y aleta del que el usuario ya se registro
  useEffect(() => {
    if (status) {
      alert(isRegister);
      router.push("/Login");
    }
  }, [status, isRegister]);

  return (
    auth?.getter === undefined && (
      <LinearGradient colors={["#6600a4", "#000000"]} style={style.background}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: "center" }} style={{ width: "100%" }}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={style.registerForm}>
              <Text style={style.title}>Register</Text>
              <InputText placeholder="username" styles={style.formInput} setValue={setUsername} />
              <InputText placeholder="@email" styles={style.formInput} setValue={setEmail} />
              <InputPassword placeholder="password" styles={style.formInput} setValue={setPassword} />
              <TouchableOpacity onPress={handlerFuncion}>
                <Text style={style.registerFormButton}>Enviar</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </LinearGradient>
    )
  );
}
