import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Category} from "@/types/category";
import {CategoryState} from "@/lib/features/categories/types";
import {calculateTotalAmount, findCategory, updateAlertsForCategory} from "@/lib/features/categories/helpers";
import {Transaction} from "@/types/transaction";

const initialState: CategoryState = {
  categories: [],
};

export const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<Category>) => {
      state.categories.push(action.payload);
    },
    deleteCategory: (state, action: PayloadAction<string>) => {
      state.categories = state.categories.filter((x) => x.id !== action.payload);
    },
    addTransactionIdToCategory: (state, action: PayloadAction<{ categoryId: string; transactionId: string }>) => {
      const category = findCategory(state, action.payload.categoryId);
      if (category && !category.transactionIds.includes(action.payload.transactionId)) {
        category.transactionIds.push(action.payload.transactionId);
      }
    },
    removeTransactionIdFromCategory: (state, action: PayloadAction<{ categoryId: string; transactionId: string }>) => {
      const category = findCategory(state, action.payload.categoryId);
      if (category && category.transactionIds.includes(action.payload.transactionId)) {
        category.transactionIds = category.transactionIds.filter((id) => id !== action.payload.transactionId);
      }
    },
    checkAlertsForCategory: (
      state,
      action: PayloadAction<{ categoryId: string; transactions: Transaction[] }>
    ) => {
      const {categoryId, transactions} = action.payload;
      const category = state.categories.find((cat) => cat.id === categoryId);

      if (category) {
        const totalAmount = calculateTotalAmount(category, transactions);

        category.alerts = updateAlertsForCategory(category, totalAmount);
      }
    },
    setToggleAlertSeen: (state, action: PayloadAction<{ categoryId: string; alertId: string }>) => {
      const {categoryId, alertId} = action.payload;
      const category = findCategory(state, categoryId);

      if (category) {
        const alert = category.alerts.find((alert) => alert.id === alertId);

        if (alert) {
          alert.isSeen = alert.isSeen ? undefined : true;
        }
      }
    },
  },
});

export const {addCategory, deleteCategory, addTransactionIdToCategory, removeTransactionIdFromCategory, checkAlertsForCategory, setToggleAlertSeen} = categorySlice.actions;
export const categoryReducer = categorySlice.reducer;
