import { useEffect, useState } from "react"
import axiosInstance from "../api";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel, Button, Container, Box, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { AddExpenseDialog } from "./add-expense-dialog";
import { CategoryDropdown } from "./category-dropdown";
import { ConfirmationDialog } from "./confirmation-dialog";


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
      const newOrder = order === "asc" ? "desc" : "asc"
      setOrder(newOrder)
      setSortBy(column)

    }

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
      <Box sx={{marginTop: 2, marginBottom: 2 }}>
          <CategoryDropdown 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              categories={categories}
              label="fiilter by category"
              showAllCategories={true}
          />
      </Box>
        <TableContainer component={Paper} style={{ marginTop: "10px", width: "100%", alignItems: "center" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                <TableSortLabel
                  active={sortBy == "date"}
                  direction={order}
                  onClick={() => handleSort("date")}
                >
                    Date
                </TableSortLabel>
                </TableCell>
                <TableCell>
                    Name
                </TableCell>
                <TableCell>Description</TableCell>
                <TableCell>
                    Category
                </TableCell>
                <TableCell>
                <TableSortLabel
                  active={sortBy === "amount"}
                  direction={order}
                  onClick={() => handleSort("amount")}
                >
                    Amount
                </TableSortLabel>
                </TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {expenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell>{expense.date}</TableCell>
                  <TableCell>{expense.name}</TableCell>
                  <TableCell>{expense.description}</TableCell>
                  <TableCell>{expense.category_name}</TableCell>
                  <TableCell>{expense.amount.toFixed(2)} zł</TableCell>
                  <TableCell>
                  <IconButton
                      onClick={() => {
                        setDeleteDialogOpen(true);
                        setExpenseToDelete(expense.id)
                      }}
                  >
                      <DeleteIcon />
                      </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box textAlign="center" margin={2}>
          <Button variant="contained" color="primary" onClick={handleClickOpen}>Add Expense</Button>
       </Box>
            <AddExpenseDialog open={dialogOpen} onClose={handleDialogClose} onExpenseAdd={fetchExpenses} categories={categories} />
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