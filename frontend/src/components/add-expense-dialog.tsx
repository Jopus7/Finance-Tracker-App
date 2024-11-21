import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem } from "@mui/material"
import { useState, useEffect } from "react"
import axiosInstance from "../api"
import { DateField } from '@mui/x-date-pickers/DateField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from "dayjs";

type ExpenseData = {
    name: string
    description: string
    amount: number
    date: Dayjs | null
    category_id: number
}

type Category = {
    id: number,
    name: string
}

type AddExpenseDialogProps = {
    open: boolean;
    onClose: () => void;
}



export const AddExpenseDialog = ({open, onClose} : AddExpenseDialogProps) => {
    const [expenseData, setExpenseData] = useState<ExpenseData>({name: '', description: '', amount: 0, date: dayjs(), category_id: 0})

    const [categories, setCategories] = useState<Category[]>([])

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
            <DialogTitle align="center" >Add Expense</DialogTitle>
            <form onSubmit={handleSubmit}>
            <DialogContent >
                <TextField autoFocus select name="categoryId" value={expenseData.category_id} label="Category" onChange={handleInputChange} fullWidth required>
                    {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                    ))}
                </TextField>
                <TextField autoFocus label="Name" name="name" type="text" variant="outlined" value={expenseData.name} onChange={handleInputChange} margin="normal" fullWidth required></TextField>
                <TextField autoFocus label="Description" name="description" type="text" variant="outlined" value={expenseData.description} onChange={handleInputChange} margin="normal" fullWidth required></TextField>
                <TextField autoFocus label="Amount" name="amount" type="number" variant="outlined" value={expenseData.amount} onChange={handleInputChange} margin="normal" fullWidth required></TextField>
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