import React from "react";

type TableEmptyProps = {
  colNum: number;
}

export default function TableEmpty({colNum}: TableEmptyProps) {
  return (
    <tr>
      <td colSpan={colNum}>
        <div className="flex flex-col items-center gap-y-[15px] my-[50px]">
          <div className="font-medium text-xl">Henüz veri yok</div>
          <div className="text-sm text-black-500 text-center">Aksiyonlara göre listeler burada oluşturulur.</div>
        </div>
      </td>
    </tr>
  )
}
