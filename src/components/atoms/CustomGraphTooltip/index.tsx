import {getFormattedCurrency} from "@/utils/format";

export default function CustomGraphTooltip(props: { active?: boolean; payload?: { name: string, value: number }[]; label?: string; }) {
  if (props.active && props.payload && props.payload.length) {
    return (
      <div className="bg-background outline-0 p-2.5 border border-gray-300 rounded-md w-full">
        {props.payload.map(x => (
          <div key={x.name} className="flex flex-row items-center h-4 font-normal">
            <div className="border-2 rounded-full mr-1 w-2.5 h-2.5"/>
            <div className="text-tiny mr-4">{getFormattedCurrency(x.value)}</div>
            <div className="ml-auto text-xs">{x.name}</div>
          </div>
        ))}
      </div>
    );
  }
  return null;
}
