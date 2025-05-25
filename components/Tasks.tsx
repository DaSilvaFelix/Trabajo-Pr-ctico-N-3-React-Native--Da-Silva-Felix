import style from "@/styles/index.styles";
import CheckBox from "expo-checkbox";
import { useState } from "react";
import { Text, View } from "react-native";

interface Props {
  title: string;
  descriptions: string;
  instance: boolean;
}

export default function Task({ title, descriptions, instance }: Props) {
  const [isChecked, setIsChecked] = useState(instance);
  return (
    <View style={style.containerTask}>
      <Text numberOfLines={1} adjustsFontSizeToFit style={style.titleTask}>
        {title}
      </Text>
      <Text numberOfLines={5} style={style.descriptionTask}>
        {descriptions}
      </Text>
      <CheckBox color="#b84ef9" style={style.checkBoxTask} value={isChecked} onValueChange={setIsChecked} />
    </View>
  );
}
