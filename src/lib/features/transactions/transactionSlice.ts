import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Transaction} from "@/types/transaction";
import {TransactionState} from "@/lib/features/transactions/types";


const initialState: TransactionState = {
  transactions: {},
};

export const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions[action.payload.id] = action.payload;
    },
    deleteTransaction: (state, action: PayloadAction<string>) => {
      delete state.transactions[action.payload];
    },
  },
});

export const {addTransaction, deleteTransaction} = transactionsSlice.actions;
export const transactionReducer = transactionsSlice.reducer;
