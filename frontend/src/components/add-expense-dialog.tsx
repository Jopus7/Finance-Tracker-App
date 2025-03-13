import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem } from "@mui/material"
import { useState, useEffect } from "react"
import axiosInstance from "../api"
import { DateField } from '@mui/x-date-pickers/DateField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from "dayjs";
import { Category } from "./expenses-list";

type ExpenseData = {
    name: string
    description: string
    amount: number
    date: Dayjs | null
    categoryId: number
    currency: string
}



type AddExpenseDialogProps = {
    open: boolean;
    onClose: () => void;
    onExpenseAdd: () => void;
    categories: Category[]
    currency_codes: string[]
}



export const AddExpenseDialog = ({open, onClose, onExpenseAdd, categories, currency_codes} : AddExpenseDialogProps) => {
    const [expenseData, setExpenseData] = useState<ExpenseData>({name: '', description: '', amount: 0, date: dayjs(), categoryId: 1, currency: "USD"})


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setExpenseData({
            ...expenseData,
            [event.target.name]: event.target.value,
        });
    };


    const handleDateChange = (newValue: Dayjs | null) => {
        setExpenseData((prevData) => ({
            ...prevData,
            date: newValue,
        }));
        };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/api/expenses', {
                ...expenseData,
                date: expenseData.date ? expenseData.date.format("YYYY-MM-DD") : null,
                category_id: expenseData.categoryId
            });

            if (response.status === 200) {
                onClose()
                onExpenseAdd()
            }
          }
          catch (error) {
            console.error('Adding expense failed:', error);
          }
    }
    


    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle align="center" >Add Expense</DialogTitle>
            <form onSubmit={handleSubmit}>
            <DialogContent >
                <TextField autoFocus select name="categoryId" value={expenseData.categoryId} label="Category" onChange={handleInputChange} fullWidth required>
                    {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                    ))}
                </TextField>
                <TextField autoFocus label="Name" name="name" type="text" variant="outlined" value={expenseData.name} onChange={handleInputChange} margin="normal" fullWidth required></TextField>
                <TextField autoFocus label="Description" name="description" type="text" variant="outlined" value={expenseData.description} onChange={handleInputChange} margin="normal" fullWidth required></TextField>
                <TextField autoFocus label="Amount" name="amount" type="number" variant="outlined" value={expenseData.amount} onChange={handleInputChange} margin="normal" fullWidth required></TextField>
                <TextField autoFocus select name="currency" value={expenseData.currency} label="Currency" onChange={handleInputChange} fullWidth required>
                    {currency_codes.map((currency) => (
                    <MenuItem key={currency} value={currency}>{currency}</MenuItem>
                    ))}
                </TextField>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateField autoFocus label="Date" name="date" value={expenseData.date} onChange={handleDateChange} margin="normal" required></DateField>
                </LocalizationProvider>

                
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">Cancel</Button>
                <Button type="submit" color="primary">Save</Button>
            </DialogActions>
            </form>
        </Dialog>
    )
} 