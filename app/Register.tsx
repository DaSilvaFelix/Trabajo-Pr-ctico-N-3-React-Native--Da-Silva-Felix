import { authContext } from "@/context/auth.context";
import InputPassword from "@/elements/InputPassword";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { Keyboard, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import InputText from "../elements/InputText";
import style from "../styles/index.styles";

// Componente principal de la pantalla de registro
export default function Register() {
  const router = useRouter(); // Hook de navegación
  const auth = useContext(authContext); // Acceso al contexto de autenticación

  // Estados locales para almacenar los datos del formulario
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Si el usuario ya está logueado, redirigimos automáticamente al home

  useEffect(() => {
    if (auth?.isLogin) {
      router.replace("/home/CreateTask");
    }
  }, [auth.isLogin]);

  // Función que maneja el registro del usuario
  const handleRegister = async () => {
    try {
      // Enviamos los datos de registro al backend
      const res = await fetch("http://192.168.0.21:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" }, // Indicamos que enviamos JSON
        body: JSON.stringify({ username, email, password }), // Enviamos los datos ingresados
      });

      const data = await res.json(); // Parseamos la respuesta a JSON

      // Si el servidor respondió con éxito
      if (res.ok) {
        alert(data.msg); // Mostramos el mensaje de éxito
        router.replace("/Login"); // Redirigimos a la pantalla de login
      } else {
        alert(data.msg || "Error al registrar usuario"); // Mostramos error si algo salió mal
      }
    } catch (error) {
      console.error("Error en el registro:", error); // Log en consola por si hubo una excepción
      alert("Hubo un problema con el registro. Intenta nuevamente."); // Feedback para el usuario
    }
  };

  // Render del formulario de registro
  return (
    !auth.isLogin && (
      <LinearGradient colors={["#6600a4", "#000000"]} style={style.background}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: "center" }} style={{ width: "100%" }}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={style.registerForm}>
              <Text style={style.title}>Register</Text>
              {/* Campos del formulario */}
              <InputText placeholder="username" styles={style.formInput} setValue={setUsername} />
              <InputText placeholder="@email" styles={style.formInput} setValue={setEmail} />
              <InputPassword placeholder="password" styles={style.formInput} setValue={setPassword} />
              {/* Botón que ejecuta el registro */}
              <TouchableOpacity onPress={handleRegister}>
                <Text style={style.registerFormButton}>Enviar</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </LinearGradient>
    )
  );
}
