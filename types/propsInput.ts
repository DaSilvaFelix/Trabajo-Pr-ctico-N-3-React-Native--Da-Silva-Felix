import type { DimensionValue } from "react-native";

export interface PropInput {
  placeholder: string;
  value?: string;
  styles: FormInput;
  setValue: (v: string) => void;
}

interface FormInput {
  width: DimensionValue | undefined;
  borderRadius: number;
  textAlign: "auto" | "left" | "right" | "center" | "justify" | undefined;
  fontSize: number;
  color: string;
  borderBottomColor: string;
  borderWidth: number;
}

export interface TasksList {
  tasks: { id: number; title: string; descriptions: string; instance: boolean }[];
}
