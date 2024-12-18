import {MdDelete} from "react-icons/md";
import Button from "@/components/atoms/Button";
import {useCallback} from "react";
import {useAppDispatch} from "@/lib/hooks";
import {Transaction} from "@/types/transaction";
import {deleteTransaction} from "@/lib/features/transactions/transactionSlice";
import {removeTransactionIdFromCategory} from "@/lib/features/categories/categorySlice";

type TransactionOptionsCellProps = {
  transaction: Transaction;
}

export default function TransactionOptionsCell(props: TransactionOptionsCellProps) {
  const {transaction} = props;

  const dispatch = useAppDispatch();

  const onDeleteTransaction = useCallback(() => {
    dispatch(deleteTransaction(transaction.id));
    if (transaction.categoryId) {
      dispatch(removeTransactionIdFromCategory({categoryId: transaction.categoryId, transactionId: transaction.id}));
    }
  }, [dispatch, transaction.id, transaction.categoryId]);

  return (
    <Button
      variant="borderless"
      size="medium"
      icon={MdDelete}
      onClick={onDeleteTransaction}
    />
  )
}
