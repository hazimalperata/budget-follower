import {CategoryState} from "@/lib/features/categories/types";
import {Category} from "@/types/category";
import {CategoryAlert} from "@/types/categoryAlert";
import {Transaction} from "@/types/transaction";

export const findCategory = (state: CategoryState, categoryId: string) =>
  state.categories.find((x) => x.id === categoryId);

export const calculateTotalAmount = (category: Category, transactions: Transaction[]): number => {
  const filteredTransactions = transactions.filter((transaction) => transaction.categoryId === category.id);
  if (category.type === "mixed") {
    return filteredTransactions.reduce((sum, transaction) => sum + ((transaction.type === 'outcome' ? -1 : 1) * transaction.amount), 0);
  } else {
    return filteredTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);
  }
};

export const getThresholdForAlert = (category: Category, alert: CategoryAlert): number => {
  return (category.limitAmount! * alert.percentage) / 100;
};

export const updateAlertStatus = (alert: CategoryAlert, totalAmount: number, threshold: number): CategoryAlert => {
  return {
    ...alert,
    isActive: totalAmount >= threshold,
  };
};

export const updateAlertsForCategory = (
  category: Category,
  totalAmount: number
): CategoryAlert[] => {
  return category.alerts.map((alert) => {
    const threshold = getThresholdForAlert(category, alert);
    return updateAlertStatus(alert, totalAmount, threshold);
  });
};
