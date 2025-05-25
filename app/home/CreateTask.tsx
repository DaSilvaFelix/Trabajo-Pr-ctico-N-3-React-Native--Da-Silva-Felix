import InputText from "@/elements/InputText";
import style from "@/styles/index.styles";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Keyboard, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";

export default function CreateTask() {
  const [title, setTitle] = useState("");
  const [task, setTask] = useState("");
  return (
    <LinearGradient colors={["#6600a4", "#000000"]} style={style.background}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={style.loginForm}>
          <Text style={style.subTitle}>Create Task</Text>
          <InputText setValue={setTitle} placeholder="title" styles={style.textTitle} />
          <TextInput
            style={style.textArea}
            placeholder="write your homework here "
            placeholderTextColor="#b0b0b0"
            multiline={true}
            numberOfLines={4}
            onChangeText={(text) => setTask(text)}
          />
          <TouchableOpacity
            onPress={() => {
              console.log(title);
              console.log(task);
            }}
          >
            <Text style={style.registerFormButton}>create</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </LinearGradient>
  );
}
