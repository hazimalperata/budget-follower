import React, {ReactNode} from "react";

export type BasicModalPresetProps = {
  children: React.ReactNode;
  title?: string;
  description?: string | ReactNode;
  hideCloseButton?: boolean;
  style?: React.CSSProperties;
  className?: string;
}
