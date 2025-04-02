import { useEffect, useState } from "react";
import axiosInstance from "../.api";
import {
  Button,
  Container,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import { AddExpenseDialog } from "./add-expense-dialog";
import { CategoryDropdown } from "../category-dropdown";
import { ConfirmationDialog } from "../confirmation-dialog";
import ExpenseTable from "./expense-table";
import { useExpenses } from "../../hooks/use-expenses";
import { useCurrencies } from "../../hooks/use-currencies";
import { Expense, Currency, Category } from "../../types";

export const ExpensesList = () => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>("date");
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [selectedCategory, setSelectedCategory] =
    useState<string>("All Categories");
    
  const [categories, setCategories] = useState<Category[]>([]);
  const [expenseToDelete, setExpenseToDelete] = useState<number | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);

  const {
    expenses,
    isLoading: expensesLoading,
    error,
    fetchExpenses,
  } = useExpenses(sortBy, order, selectedCategory);

  const {currencies, isCurrencyLoading, currencyError } = useCurrencies()

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

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get("/api/categories");
        setCategories(response.data);
      } catch (err) {
        console.error("Fetching categories failed", err);
      }
    };

    

    const loadInitialData = async () => {
      setInitialLoading(true);
      try {
        await Promise.all([fetchCategories()]);
      } catch (err) {
        console.error("Failed to load initial data", err);
      } finally {
        setInitialLoading(false);
      }
    };

    loadInitialData();
  }, []);

  const getCurrencySymbol = (currencyCode: string): string => {
    const currency = currencies.find((c) => c.code === currencyCode);
    return currency ? currency.symbol : currencyCode;
  };

  const isLoading = initialLoading || expensesLoading;

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
        <Button
          variant="contained"
          color="primary"
          onClick={() => setDialogOpen(true)}
        >
          Add Expense
        </Button>
      </Box>

      {error && (
        <Box sx={{ textAlign: "center", color: "error.main", my: 2 }}>
          <Typography>{error}</Typography>
        </Box>
      )}

      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <ExpenseTable
          expenses={expenses.map((expense: Expense) => ({
            ...expense,
            currencySymbol: getCurrencySymbol(expense.currency),
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
          currency_codes={currencies.map((currency) => currency.code)}
        />
      )}

      <ConfirmationDialog
        title="Delete Expense"
        message="Are you sure you want to delete this expense?"
        open={deleteDialogOpen}
        onConfirm={() =>
          expenseToDelete && handleDeleteExpenseConfirm(expenseToDelete)
        }
        onCancel={() => {
          setDeleteDialogOpen(false);
          setExpenseToDelete(null);
        }}
      />
    </Container>
  );
};
