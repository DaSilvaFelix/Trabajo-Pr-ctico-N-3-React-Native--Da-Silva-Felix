import style from "@/styles/index.styles";
import { TasksList } from "@/types/propsInput";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView } from "react-native";
import Task from "./Tasks";

export default function ViewTasks({ tasks }: TasksList) {
  return (
    <LinearGradient colors={["#6600a4", "#000000"]} style={style.background}>
      <ScrollView contentContainerStyle={style.generalScroll} style={{ width: "100%" }}>
        {tasks.map((task) => (
          <Task key={task.id} title={task.title} descriptions={task.descriptions} instance={task.instance} />
        ))}
      </ScrollView>
    </LinearGradient>
  );
}
