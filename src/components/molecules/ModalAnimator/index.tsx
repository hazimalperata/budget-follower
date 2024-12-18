import {AnimatePresence} from "framer-motion";
import React, {createContext, useEffect, useRef, useState} from "react";
import {createPortal} from "react-dom";
import useKeyPressEvent from "@/hooks/useKeyPressEvent";
import {ModalAnimatorProps} from "@/components/molecules/ModalAnimator/types";
import Backdrop from "@/components/molecules/ModalAnimator/Backdrop";


export const ModalAnimatorContext = createContext({
  showModal: false,
  onClose: () => {
  },
});

export default function ModalAnimator(props: ModalAnimatorProps) {
  const {children, showModal, onClose, disableBackdrop} = props;

  const ref = useRef<Element>(null);

  const [mounted, setMounted] = useState(false);

  const disableScroll = () => {
    document.body.style.overflow = 'hidden';
  }

  const enableScroll = () => {
    document.body.style.overflow = 'unset';
  }

  useKeyPressEvent("Escape", onClose, showModal);

  useEffect(() => {
    ref.current = document.getElementById('modal-root') as Element;
    setMounted(true);
  }, [showModal]);

  useEffect(() => {
    if (mounted && showModal) {
      disableScroll();
    }
  }, [mounted, showModal]);

  if (!mounted) return null;

  return createPortal(
    <ModalAnimatorContext.Provider value={{showModal, onClose}}>
      <AnimatePresence
        initial={false}
        mode="wait"
        onExitComplete={() => enableScroll()}
      >
        {showModal && (
          <Backdrop onClick={disableBackdrop ? () => undefined : onClose}>
            {children}
          </Backdrop>
        )}
      </AnimatePresence>
    </ModalAnimatorContext.Provider>, ref.current as Element);
}
