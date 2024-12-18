export type TransactionType = 'income' | 'outcome'

export const TransactionTypeDict: Record<TransactionType, string> = {
  income: "Gelir",
  outcome: "Gider",
}


export type Transaction = {
  id: string;
  description: string;
  type: TransactionType;
  amount: number;
  date: string;
  categoryId?: string;
}
