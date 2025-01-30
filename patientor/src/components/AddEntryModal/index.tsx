import { Dialog, DialogTitle, DialogContent, Divider, Alert, InputLabel, Select, MenuItem, SelectChangeEvent} from '@mui/material';
import { useState } from 'react';
import AddHealthCheckEntryForm from "./AddHealthCheckEntryForm";
import AddHospitalEntryForm from './AddHospitalEntryForm';
import AddOccupationalHealthcareEntryForm from "./AddOccupationalHealthcareEntryForm";
import { EntryFormValues, EntryTypes } from "../../types";

interface Props {
  id: string;
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (id: string, values: EntryFormValues) => void;
  error?: string;
}

const AddEntryModal = ({ id, modalOpen, onClose, onSubmit, error }: Props) => {
  const [entryType, setEntryType] = useState<EntryTypes>();

  interface EntryTypeOption{
    value: EntryTypes;
    label: string;
  }
  
  const entryTypeOptions: EntryTypeOption[] = Object.values(EntryTypes).map(v => ({
    value: v, label: v.toString()
  }));

  const onEntryTypeChange = (event: SelectChangeEvent<string>) => {
      event.preventDefault();
      if ( typeof event.target.value === "string") {
        const value = event.target.value;
        const entryType = Object.values(EntryTypes).find(ent => ent.toString() === value);
        if (entryType) {
          setEntryType(entryType);
        }
      }
    };
  return(
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>Add a new entry</DialogTitle>
    <Divider />
    <InputLabel style={{ marginTop: 20 }}>Entry type</InputLabel>
    <Select
      label="Entry type"
      fullWidth
      value={entryType}
      onChange={onEntryTypeChange}
    >
    {entryTypeOptions.map(option =>
      <MenuItem
        key={option.label}
        value={option.value}
      >
        {option.label
      }</MenuItem>
    )}
    </Select>
    <DialogContent>
      {error && <Alert severity="error">{error}</Alert>}
      {(() => {
        switch (entryType) {
          case EntryTypes.HealthCheck:
            return <AddHealthCheckEntryForm id={id} onSubmit={onSubmit} onCancel={onClose}/>
          case EntryTypes.Hospital:
            return <AddHospitalEntryForm id={id} onSubmit={onSubmit} onCancel={onClose}/>
          case EntryTypes.OccupationalHealthcare:
            return <AddOccupationalHealthcareEntryForm id={id} onSubmit={onSubmit} onCancel={onClose}/>
          default:
            return null
        }
      
      })()}
    </DialogContent>
  </Dialog>
)};

export default AddEntryModal;
