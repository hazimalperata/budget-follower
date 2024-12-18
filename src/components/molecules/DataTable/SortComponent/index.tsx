import React from "react";
import {MdOutlineTextRotateVertical} from "react-icons/md";

type SortComponentProps = {
  state: 'asc' | 'desc' | false;
}

export function SortComponent(props: SortComponentProps) {
  const {state} = props;

  return state === false ? (
    <MdOutlineTextRotateVertical width={15} height={15} style={{minWidth: 15, minHeight: 15}}/>
  ) : <div className={`${state === "desc" && "rotate-180"} flex justify-center items-center rounded-full border-0.5 border-gray-300 px-1.5 py-0.5`} style={{backgroundColor: "rgba(242, 241, 254, 1)"}}>
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.57129 14V3" stroke="#544DC9" strokeWidth="1.2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4.07129 7.5L8.57129 3L13.0713 7.5" stroke="#544DC9" strokeWidth="1.2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </div>;
}
