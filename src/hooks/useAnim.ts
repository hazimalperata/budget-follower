import {Variants} from "framer-motion";

export default function useAnim(variants: Variants) {
  return {
    initial: "initial",
    animate: "enter",
    exit: "exit",
    variants
  }
}
