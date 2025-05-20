import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    MenuItem,
  } from "@mui/material";


export type EditProfileDialogProps = {
    open: boolean
    onClose: () => void;
}

export const EditProfileDialog =  ({open, onClose}: EditProfileDialogProps) => {

    const handleSubmit = () => {}

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle align="center">Edit your personal information</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent></DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="secondary">Cancel</Button>
                </DialogActions>
            </form>
        </Dialog>
    
    )
}   