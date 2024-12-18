import React from "react";
import clsx from "clsx";
import {cva} from "class-variance-authority";

export type LabelColors = "red" | "blue" | "green" | "black" | "orange" | "purple" | "pink" | "white" | "grey";
export type LabelPresets = "borderless" | "outline" | "filled";

const labelClassname = cva("flex flex-row items-center gap-x-[5px] py-[5px] px-[11px] text-sm w-fit select-none rounded-full border-solid", {
  variants: {
    preset: {
      borderless: "border border-transparent",
      outline: "border bg-white",
      filled: "border",
    },
    color: {
      red: "text-red-900 bg-red-100 border-red-900",
      blue: "text-blue-900 bg-blue-100 border-blue-900",
      green: "text-green-900 bg-green-100 border-green-900",
      black: "text-black-700 bg-gray-50 border-black-700",
      orange: "text-orange-900 bg-orange-50 border-orange-900",
      purple: "text-purple-900 bg-purple-50 border-purple-900",
      pink: "text-pink-900 bg-pink-100 border-pink-900",
      white: "text-black-700 bg-white border-gray-300",
      grey: "text-gray-700 bg-gray-50 border-gray-300",
    }
  }
});

type LabelProps = {
  children: React.ReactNode | string;
  preset: LabelPresets;
  color: LabelColors;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  showDot?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function Label(props: LabelProps) {
  const {
    children,
    preset,
    color,
    rightIcon,
    leftIcon,
    showDot,
    className,
    onClick
  } = props;

  return (
    <div
      onClick={onClick}
      className={clsx(labelClassname({preset, color}), className)}
    >
      {showDot && <div className="h-1.5 w-1.5 rounded-full bg-current" style={{minWidth: 6, minHeight: 6}}/>}
      {leftIcon !== undefined && leftIcon}
      {children}
      {rightIcon !== undefined && rightIcon}
    </div>
  )
}
