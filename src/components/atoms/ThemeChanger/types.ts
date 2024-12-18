import {IconType} from "react-icons";

export type Theme = {
  icon: IconType;
  key: "system" | "dark" | "light";
  text: string;
}
