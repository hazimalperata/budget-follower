import {cva} from "class-variance-authority";

export const searchingComponentClassName = cva("relative border hover:border-blue focus-within:border focus-within:border-blue flex flex-row items-center", {
  variants: {
    size: {
      small: "h-9 text-13 leading-4",
      medium: "h-10 text-tiny leading-5",
    },
    round: {
      rectangle: "rounded-lg",
      fullRounded: "rounded-full",
    }
  }
});
