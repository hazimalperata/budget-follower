import {Transaction} from "@/types/transaction";

export interface TransactionState {
  transactions: { [transactionId: string]: Transaction };
}
