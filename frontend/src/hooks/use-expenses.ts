import { useState, useEffect, useCallback } from 'react';
import axiosInstance from "../api";

type Expense = {
  id: number
  name: string
  description: string
  amount: number
  date: string
  category_name: string
  currency: string
}

export function useExpenses(sortBy: string, order: "asc" | "desc", selectedCategory: string) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchExpenses = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get<Expense[]>("/api/expenses/", {
        params: {
          sort_by: sortBy,
          order: order,
          category_name: selectedCategory !== "All Categories" ? selectedCategory : null
        }
      });
      setExpenses(response.data);
      setError(null);
    } catch(err) {
      console.error('Fetching expenses failed', err);
      setError("Failed to load expenses");
    } finally {
      setIsLoading(false);
    }
  }, [sortBy, order, selectedCategory]);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  return { expenses, isLoading, error, fetchExpenses };
}