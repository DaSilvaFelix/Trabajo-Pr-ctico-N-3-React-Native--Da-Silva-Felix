import style from "@/styles/index.styles";
import type { PropInput } from "@/types/propsInput";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity } from "react-native";

export default function InputPassword({ placeholder, styles, setValue, value }: PropInput) {
  const [isVisible, setIsVisible] = useState(true);
  return (
    <>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#b0b0b0"
        secureTextEntry={isVisible}
        style={styles}
        value={value}
        onChangeText={setValue}
      />
      <TouchableOpacity style={style.toggleButton} onPress={() => setIsVisible(!isVisible)}>
        <Text style={style.toggleText}>{isVisible ? "Mostrar" : "Ocultar"}</Text>
      </TouchableOpacity>
    </>
  );
}
