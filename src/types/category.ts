import {CategoryAlert} from "@/types/categoryAlert";

export type CategoryType = 'income' | 'outcome' | 'mixed';

export const CategoryTypeDict: Record<CategoryType, string> = {
  income: "Gelir",
  outcome: "Gider",
  mixed: "Karışık",
}

export type Category = {
  id: string;
  name: string;
  description: string;
  type: CategoryType;
  transactionIds: string[];
  limitAmount?: number;
  alerts: CategoryAlert[];
}
