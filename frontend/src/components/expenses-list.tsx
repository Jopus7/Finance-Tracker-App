import { useEffect, useState } from "react"
import axiosInstance from "../api";
import { Button, Container, Box } from "@mui/material";
import { AddExpenseDialog } from "./add-expense-dialog";
import { CategoryDropdown } from "./category-dropdown";
import { ConfirmationDialog } from "./confirmation-dialog";
import ExpenseTable from "./expense-table";


type Expense = {
    id: number
    name: string
    description: string
    amount: number
    date: string
    category_name: string
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
  const [categories, setCategories] = useState<Category[]>([]);
  const [expenseToDelete, setExpenseToDelete] = useState<number | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);

  const handleClickOpen = () => {
    setDialogOpen(true)
  }

  const handleDialogClose = () => {
    setDialogOpen(false)
  }

  const handleSort = (column: string) => {
    const isAsc = sortBy === column && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setSortBy(column);
  };
    const handleDeleteExpenseConfirm = async (expenseId: number) => {
        try{
          await axiosInstance.delete(`/api/expenses/${expenseId}`)
          fetchExpenses();
        } catch (err) {
          console.error("Deleting expense failed", err)
        }
        setDeleteDialogOpen(false);
        setExpenseToDelete(null);
    }

    const fetchExpenses = async () => {
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
  }

    useEffect(() => {
      const fetchCategories = async () => {
          try {
              const response = await axiosInstance.get('/api/categories');
              setCategories(response.data);
          } catch(err) {
              console.error('Fetching categories failed', err)
          }
      };
      fetchCategories();
    }, [])

    useEffect(() => {
        fetchExpenses();
    }, [sortBy, order, selectedCategory])

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

            <ExpenseTable
                expenses={expenses}
                onDelete={(id) => {
                    setDeleteDialogOpen(true);
                    setExpenseToDelete(id);
                }}
                sortBy={sortBy}
                order={order}
                onSort={handleSort}
            />

            <AddExpenseDialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                onExpenseAdd={fetchExpenses}
                categories={categories}
            />

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
