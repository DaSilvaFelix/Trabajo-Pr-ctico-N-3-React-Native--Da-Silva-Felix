import { authContext } from "@/context/auth.context";
import { ProviderContext } from "@/context/provider.context";
import style from "@/styles/index.styles";
import { router, Stack } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useContext } from "react";
import { Text, TouchableOpacity } from "react-native";

// función principal para pasar el contexto a toda la aplicación
export default function RootLayout() {
  return (
    <ProviderContext>
      <ViewScreen />
    </ProviderContext>
  );
}

// función auxiliar para contener toda las Vistas de la aplicación y poder pasar el contexto mucho mas fácil
const ViewScreen = () => {
  const auth = useContext(authContext);
  return (
    <Stack>
      <Stack.Screen
        name="Register"
        options={{
          title: "your tasks",
          headerStyle: { backgroundColor: "#26262a" },
          headerTintColor: "white",
          headerBackVisible: false,
          headerRight: () => (
            <TouchableOpacity style={style.registerRedirection} onPress={() => router.push("/Login")}>
              <Text style={{ fontSize: 17 }}>login</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="Login"
        options={{
          title: "your tasks",
          headerStyle: { backgroundColor: "#26262a" },
          headerTintColor: "white",
          headerBackVisible: false,
          headerRight: () => (
            <TouchableOpacity style={style.registerRedirection} onPress={() => router.replace("/Register")}>
              <Text style={{ fontSize: 17 }}>Register</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="home"
        options={{
          title: "Tasks",
          headerStyle: { backgroundColor: "#26262a" },
          headerTintColor: "white",
          headerBackVisible: false,
          headerRight: () => (
            <TouchableOpacity
              style={style.registerRedirection}
              onPress={async () => {
                const tokenBefore = await SecureStore.getItemAsync("token");

                console.log("token antes de eliminar:", tokenBefore);

                await SecureStore.deleteItemAsync("token");

                const tokenAfter = await SecureStore.getItemAsync("token");

                console.log("token después de eliminar:", tokenAfter);

                if (!tokenAfter) {
                  auth.setIsLogin(false);
                  console.log(auth.isLogin);
                }

                router.replace("/Login");
              }}
            >
              <Text style={{ fontSize: 17 }}>Log Out</Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
};
