import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import { useState } from "react"

type ExpenseData = {
    name: string
    description: string
    amount: string
}

type AddExpenseDialogProps = {
    open: boolean;
    onClose: () => void;
    onSubmit: (expenseData: ExpenseData) => void;
}

export const AddExpenseDialog = ({open, onClose, onSubmit} : AddExpenseDialogProps) => {
    const [expenseData, setExpenseData] = useState<ExpenseData>({name: '', description: '', amount: ''})

    const handleInpuChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setExpenseData({
            ...expenseData,
            [event.target.name]: event.target.value,
        });
    };


    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add Expense</DialogTitle>
            <form onSubmit={onSubmit}>
            <DialogContent>
                <TextField autoFocus label="Name" name="name" type="text" variant="outlined" value={expenseData.name} onChange={handleInpuChange} fullWidth required></TextField>
                <TextField autoFocus label="Description" name="description" type="text" variant="outlined" value={expenseData.description} onChange={handleInpuChange} fullWidth required></TextField>
                <TextField autoFocus label="Amount" name="amount" type="number" variant="outlined" value={expenseData.amount} onChange={handleInpuChange} fullWidth required></TextField>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">Cancel</Button>
            </DialogActions>
            </form>
        </Dialog>
    )
}