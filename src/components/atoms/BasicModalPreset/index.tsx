import {BasicModalPresetProps} from "@/components/atoms/BasicModalPreset/types";
import React, {useContext} from "react";
import {MdClose} from "react-icons/md";
import {ModalAnimatorContext} from "@/components/molecules/ModalAnimator";
import {motion} from "framer-motion";
import {centerModalAnimations} from "@/components/atoms/BasicModalPreset/variants";
import useAnim from "@/hooks/useAnim";
import clsx from "clsx";

const MODAL_VERTICAL_GAP = 80;
const MODAL_HORIZONTAL_GAP = 80;

export default function BasicModalPreset(props: BasicModalPresetProps) {
  const {children, title, description, hideCloseButton, style, className} = props;

  const {onClose} = useContext(ModalAnimatorContext);

  return (
    <motion.div
      tabIndex={0}
      onClick={(e) => e.stopPropagation()}
      className={clsx("flex flex-col bg-background rounded-2.5 self-center mx-auto rounded-lg shadow-xl", className)}
      style={{maxHeight: `calc(100vh - ${MODAL_VERTICAL_GAP}px)`, maxWidth: `calc(100vw - ${MODAL_HORIZONTAL_GAP}px)`, ...style}}
      {...useAnim(centerModalAnimations)}
    >
      {(title || description || !hideCloseButton) && (
        <div className="flex flex-row justify-between gap-5 p-5">
          {(title !== undefined || description !== undefined) && (
            <div className="flex flex-col gap-5px">
              {title !== undefined && <div className="text-base font-medium">{title}</div>}
              {description !== undefined && <div className="text-xs">{description}</div>}
            </div>
          )}
          {!hideCloseButton && (
            <button tabIndex={0} className="h-fit" onClick={onClose}>
              <MdClose size={24}/>
            </button>
          )}
        </div>
      )}
      {children}
    </motion.div>
  )
}
