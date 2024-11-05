import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import { useState } from "react"
import axiosInstance from "../api"
import { DateField } from '@mui/x-date-pickers/DateField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from "dayjs";

type ExpenseData = {
    name: string
    description: string
    amount: number
    date: Dayjs
}

type AddExpenseDialogProps = {
    open: boolean;
    onClose: () => void;
}

export const AddExpenseDialog = ({open, onClose} : AddExpenseDialogProps) => {
    const [expenseData, setExpenseData] = useState<ExpenseData>({name: '', description: '', amount: 0, date: dayjs()})

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
            });

            if (response.status === 200) {
                onClose()
            }
          }
          catch (error) {
            console.error('Adding expense failed:', error);
          }
    }
    


    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add Expense</DialogTitle>
            <form onSubmit={handleSubmit}>
            <DialogContent>
                <TextField autoFocus label="Name" name="name" type="text" variant="outlined" value={expenseData.name} onChange={handleInputChange} fullWidth required></TextField>
                <TextField autoFocus label="Description" name="description" type="text" variant="outlined" value={expenseData.description} onChange={handleInputChange} fullWidth required></TextField>
                <TextField autoFocus label="Amount" name="amount" type="number" variant="outlined" value={expenseData.amount} onChange={handleInputChange} fullWidth required></TextField>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateField autoFocus label="Date" name="date" value={expenseData.date} onChange={handleDateChange} required></DateField>
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