import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";


type ConfirmationDialogProps = {
  title: string;
  message: string;
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export const ConfirmationDialog = ({
  title,
  message,
  open,
  onCancel,
  onConfirm,
}: ConfirmationDialogProps) => {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={onConfirm} color="error">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};
