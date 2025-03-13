import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Paper, TableSortLabel, IconButton, TableContainer } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

type Expense = {
    id: number;
    name: string;
    description: string;
    amount: number;
    date: string;
    category_name: string;
    currency: string;
}

type ExpenseTableProps = {
    expenses: Expense[];
    onDelete: (id: number) => void;
    sortBy: string;
    order: "asc" | "desc";
    onSort: (column: string) => void;
}


const ExpenseTable = ({ expenses, onDelete, sortBy, order, onSort }: ExpenseTableProps) => {
    return (
        <TableContainer component={Paper} style={{ marginTop: "10px", width: "100%" }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <TableSortLabel
                                active={sortBy === "date"}
                                direction={order}
                                onClick={() => onSort("date")}
                            >
                                Date
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={sortBy === "amount"}
                                direction={order}
                                onClick={() => onSort("amount")}
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
                            <TableCell>{expense.amount.toFixed(2)} {expense.currency}</TableCell>
                            <TableCell>
                                <IconButton onClick={() => onDelete(expense.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ExpenseTable;
