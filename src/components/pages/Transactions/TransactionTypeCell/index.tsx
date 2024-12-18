import Label from "@/components/atoms/Label";
import {TransactionType, TransactionTypeDict} from "@/types/transaction";


type TransactionTypeCellProps = {
  type: TransactionType;
}

export default function TransactionTypeCell({type}: TransactionTypeCellProps) {

  const text = TransactionTypeDict[type];

  return (
    <Label
      preset='filled'
      color={type === 'income' ? 'green' : 'red'}
    >
      {text}
    </Label>
  )
}
