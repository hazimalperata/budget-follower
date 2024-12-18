import {Variants} from "framer-motion";

export const centerModalAnimations: Variants = {
  initial: {
    scale: 0.95,
    opacity: 0.5,
  },
  enter: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "tween",
      duration: 0.2,
    }
  },
  exit: {
    scale: 0.95,
    opacity: 0.5,
  },
};
