import { useEffect, useState, useCallback } from "react"
import axiosInstance from "../api";
import { Button, Container, Box, CircularProgress } from "@mui/material";
import { AddExpenseDialog } from "./add-expense-dialog";
import { CategoryDropdown } from "./category-dropdown";
import { ConfirmationDialog } from "./confirmation-dialog";
import ExpenseTable from "./expense-table";
import { freecurrencyapi } from "../pages/register-page";



type Expense = {
    id: number
    name: string
    description: string
    amount: number
    date: string
    category_name: string
    currency: string
    currencySymbol?: string
}

type Currency = {
  symbol: string;
  name: string;
  code: string;
}

export type Category = {
  id: number,
  name: string
}

export const ExpensesList = () => {

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [sortBy, setSortBy] = useState<string>("date");
  const [order, setOrder] =  useState<"asc" | "desc">("desc");
  const [selectedCategory, setSelectedCategory] = useState<string>("All Categories"); 
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [expenseToDelete, setExpenseToDelete] = useState<number | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);


  const handleSort = (column: string) => {
    const isAsc = sortBy === column && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setSortBy(column);
  };
    const handleDeleteExpenseConfirm = async (expenseId: number) => {
        try {
            await axiosInstance.delete(`/api/expenses/${expenseId}`);
            fetchExpenses();
        } catch (err) {
            console.error("Deleting expense failed", err);
        }
        setDeleteDialogOpen(false);
        setExpenseToDelete(null);
    };

    const fetchExpenses = useCallback(async () => {
      try {
          const response = await axiosInstance.get<Expense[]>("/api/expenses/", {
            params: {
              sort_by: sortBy,
              order: order,
              category_name: selectedCategory || null
            }
          })
          setExpenses(response.data)
      } catch(err) {
          console.error('Fetching expenses failed', err)
      }
  }, [sortBy, order, selectedCategory]);

    useEffect(() => {
      const fetchCategories = async () => {
        try {
          const response = await axiosInstance.get('/api/categories');
          setCategories(response.data);
        } catch(err) {
          console.error('Fetching categories failed', err);
        }
      };

      const fetchCurrencies = async () => {
        try {
          const { data } = await freecurrencyapi.currencies();
          
          const convertedData = Object.entries(data).map(([code, details]: [string, any]) => ({
            code,
            symbol: details.symbol,
            name: details.name
          }));

          setCurrencies(convertedData);
        } catch (error) {
          console.error('Failed to fetch currencies:', error);
        }
      }

      const loadInitialData = async () => {
        setIsLoading(true);
        try {
          await Promise.all([
            fetchCategories(),
            fetchCurrencies()
          ]);
          
          const response = await axiosInstance.get<Expense[]>("/api/expenses/", {
            params: {
              sort_by: sortBy,
              order: order,
              category_name: selectedCategory || null
            }
          });
          setExpenses(response.data);
          
        } catch (err) {
          console.error('Failed to load initial data', err);
        } finally {
          setIsLoading(false);
        }
      };
      
      loadInitialData();
    }, [sortBy, order, selectedCategory]);

    const getCurrencySymbol = (currencyCode: string): string => {
      const currency = currencies.find(c => c.code === currencyCode);
      return currency ? currency.symbol : currencyCode;
    };

    return (
      <Container>
            <Box sx={{ marginTop: 2, marginBottom: 2 }}>
                <CategoryDropdown
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    categories={categories}
                    label="Filter by category"
                    showAllCategories={true}
                />
            </Box>
            <Box textAlign="center" margin={2}>
                <Button variant="contained" color="primary" onClick={() => setDialogOpen(true)}>
                    Add Expense
                </Button>
            </Box>

            {isLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                <CircularProgress />
              </Box>
            ) : (
              <ExpenseTable
                expenses={expenses.map(expense => ({
                  ...expense,
                  currencySymbol: getCurrencySymbol(expense.currency)
                }))}
                onDelete={(id) => {
                    setDeleteDialogOpen(true);
                    setExpenseToDelete(id);
                }}
                sortBy={sortBy}
                order={order}
                onSort={handleSort}
              />
            )}
          {!isLoading && (
              <AddExpenseDialog
              open={dialogOpen}
              onClose={() => setDialogOpen(false)}
              onExpenseAdd={fetchExpenses}
              categories={categories}
              currency_codes={currencies.map(currency => currency.code)}
            />
          )
          
          }
          
            <ConfirmationDialog
                title="Delete Expense"
                message="Are you sure you want to delete this expense?"
                open={deleteDialogOpen}
                onConfirm={() => expenseToDelete && handleDeleteExpenseConfirm(expenseToDelete)}
                onCancel={() => {
                    setDeleteDialogOpen(false);
                    setExpenseToDelete(null);
                }}
            />
        </Container>
    );
};
