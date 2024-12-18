import React from "react";

export type ModalAnimatorProps = {
  children: React.ReactNode;
  showModal: boolean;
  onClose: () => void;
  disableBackdrop?: boolean;
}
