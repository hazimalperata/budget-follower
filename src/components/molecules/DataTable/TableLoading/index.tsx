import React from "react";

type TableLoadingProps = {
  colNum: number;
}

export default function TableLoading({colNum}: TableLoadingProps) {
  const ROW_COUNT = 5;

  return [...new Array(ROW_COUNT)].map((_, i) => (
    <tr key={i}>
      <td colSpan={colNum} className="p-2.5">
        <div className="pulse" style={{width: "100%", height: 40}}/>
      </td>
      {/*{[...new Array(colNum)].map((_, y) => (*/}
      {/*  <td key={`${y}-${i}`} className="p-2.5">*/}
      {/*    <div className="pulse" style={{width: "100%", height: 40}}/>*/}
      {/*  </td>*/}
      {/*))}*/}
    </tr>
  ))
}
