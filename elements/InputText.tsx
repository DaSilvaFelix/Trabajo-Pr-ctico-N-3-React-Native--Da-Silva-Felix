import type { PropInput } from "@/types/propsInput";
import { TextInput } from "react-native";
export default function InputText({ placeholder, styles, setValue }: PropInput) {
  return <TextInput maxLength={25} placeholder={placeholder} placeholderTextColor="#b0b0b0" style={styles} onChangeText={(text) => setValue(text)} />;
}
