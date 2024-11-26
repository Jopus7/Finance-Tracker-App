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
    category_id: number
}
type Order = "asc" | "desc"

export const ExpensesList = () => {

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const handleClickOpen = () => {
    setDialogOpen(true)
  }

  const handleDialogClose = () => {
    setDialogOpen(false)
  }



    const [expenses, setExpenses] = useState<Expense[]>([])
    const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([])
    const [order, setOrder] = useState<Order>("asc")
    const [orderBy, setOrderBy] = useState<keyof Expense>("date")

    const fetchExpenses = async () => {
      try {
          const response = await axiosInstance.get<Expense[]>("/api/expenses")
          setExpenses(response.data)
          setFilteredExpenses(response.data)
      } catch(err) {
          console.error('Fetching expenses failed', err)
      }
  }

    useEffect(() => {
        fetchExpenses();
    }, [])

    const handleSort = (property: keyof Expense) => {
        const isAsc = orderBy === property && order === 'asc'
        setOrder(isAsc ? 'desc' : 'asc')
        setOrderBy(property)
    }

    const sortedExpenses = [...filteredExpenses]. sort((a,b) => {
        if (a[orderBy] < b[orderBy]) {
            return order === "asc" ? -1 : 1
          }
          if (a[orderBy] > b[orderBy]) {
            return order === "asc" ? 1 : -1
          }
          return 0
    
    const navigate = useNavigate()
    })
    return (
      <Container>
        <TableContainer component={Paper} style={{ marginTop: "10px", width: "150%", alignItems: "center" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "date"}
                    direction={orderBy === "date" ? order : "asc"}
                    onClick={() => handleSort("date")}
                  >
                    Date
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "name"}
                    direction={orderBy === "name" ? order : "asc"}
                    onClick={() => handleSort("name")}
                  >
                    Name
                  </TableSortLabel>
                </TableCell>
                <TableCell>Description</TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "category_name"}
                    direction={orderBy === "category_name" ? order : "asc"}
                    onClick={() => handleSort("category_name")}
                  >
                    Category
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "amount"}
                    direction={orderBy === "amount" ? order : "asc"}
                    onClick={() => handleSort("amount")}
                  >
                    Amount
                  </TableSortLabel>
                </TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedExpenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell>{expense.date}</TableCell>
                  <TableCell>{expense.name}</TableCell>
                  <TableCell>{expense.description}</TableCell>
                  <TableCell>{expense.category_id}</TableCell>
                  <TableCell>{expense.amount.toFixed(2)} zł</TableCell>
                  <TableCell>
                    <Button
                        variant='contained' 
                        color='primary'
                        onClick={() => navigate(`/expenses/${expense.id}`)} >Detail</Button>
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box textAlign="center">
          <Button variant="contained" color="primary" onClick={handleClickOpen}>Add Expense</Button>
       </Box>
            <AddExpenseDialog open={dialogOpen} onClose={handleDialogClose} onExpenseAdd={fetchExpenses}/>
        </Container>
      );
    };