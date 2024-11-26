import axios from "axios";
import { useEffect, useState } from "react"
import axiosInstance from "../api";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel, Button, Container, Box} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AddExpenseDialog } from "./add-expense-dialog";


type Expense = {
    id: number
    name: string
    description: string
    amount: number
    date: string
    category_name: string
}

export const ExpensesList = () => {

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const handleClickOpen = () => {
    setDialogOpen(true)
  }

  const handleDialogClose = () => {
    setDialogOpen(false)
  }
  
    const [expenses, setExpenses] = useState<Expense[]>([])

    const fetchExpenses = async () => {
      try {
          const response = await axiosInstance.get<Expense[]>("/api/expenses")
          setExpenses(response.data)
      } catch(err) {
          console.error('Fetching expenses failed', err)
      }
  }

    useEffect(() => {
        fetchExpenses();
    }, [])

    return (
      <Container>
        <TableContainer component={Paper} style={{ marginTop: "10px", width: "100%", alignItems: "center" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                    Date
                </TableCell>
                <TableCell>
                    Name
                </TableCell>
                <TableCell>Description</TableCell>
                <TableCell>
                    Category
                </TableCell>
                <TableCell>
                    Amount
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box textAlign="center" margin={2}>
          <Button variant="contained" color="primary" onClick={handleClickOpen}>Add Expense</Button>
       </Box>
            <AddExpenseDialog open={dialogOpen} onClose={handleDialogClose} onExpenseAdd={fetchExpenses}/>
        </Container>
      );
    };