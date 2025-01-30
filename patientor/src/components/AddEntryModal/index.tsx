import { Dialog, DialogTitle, DialogContent, Divider, Alert } from '@mui/material';

import AddEntryForm from "./AddEntryForm";
import { EntryFormValues } from "../../types";

interface Props {
  id: string;
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (id: string, values: EntryFormValues) => void;
  error?: string;
}

const AddEntryModal = ({ id, modalOpen, onClose, onSubmit, error }: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>Add a new entry</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity="error">{error}</Alert>}
      <AddEntryForm id={id} onSubmit={onSubmit} onCancel={onClose}/>
    </DialogContent>
  </Dialog>
);

export default AddEntryModal;
