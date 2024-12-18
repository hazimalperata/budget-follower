import Label from "@/components/atoms/Label";
import {CategoryType, CategoryTypeDict} from "@/types/category";


type CategoryTypeCellProps = {
  type: CategoryType;
}

export default function CategoryTypeCell({type}: CategoryTypeCellProps) {

  const text = CategoryTypeDict[type];

  return (
    <Label
      preset='filled'
      color={type === "mixed" ? 'grey' : type === 'income' ? 'green' : 'red'}
    >
      {text}
    </Label>
  )
}
