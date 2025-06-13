import { ProviderContext } from "@/context/provider.context";
import style from "@/styles/index.styles";
import { router, Stack } from "expo-router";
import SecureStore from "expo-secure-store";
import { Text, TouchableOpacity } from "react-native";

export default function RootLayout() {
  return (
    <ProviderContext>
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
              <TouchableOpacity style={style.registerRedirection} onPress={() => router.push("/Register")}>
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
                  await SecureStore.deleteItemAsync("user_session");
                  router.push("/Login");
                }}
              >
                <Text style={{ fontSize: 17 }}>Log Out</Text>
              </TouchableOpacity>
            ),
          }}
        />
      </Stack>
    </ProviderContext>
  );
}
