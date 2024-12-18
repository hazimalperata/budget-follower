import {motion} from "framer-motion";
import React from "react";
import clsx from "clsx";
import {inter} from "@/app/fonts";
import {BackdropProps} from "@/components/molecules/ModalAnimator/Backdrop/types";
import useAnim from "@/hooks/useAnim";
import {backdropAnimations} from "@/components/molecules/ModalAnimator/Backdrop/variants";


export default function Backdrop(props: BackdropProps) {
  const {children, onClick} = props;

  return (
    <motion.div
      onClick={onClick}
      tabIndex={-1}
      className={clsx("fixed flex h-full w-full z-modal top-0 left-0 will-change-transform bg-black/30 dark:bg-black/60", inter.className)}
      {...useAnim(backdropAnimations)}
    >
      {children}
    </motion.div>
  )
}
