import { useState, SyntheticEvent } from "react";

import {  TextField, Grid, Button } from '@mui/material';

import { EntryFormValues, EntryTypes } from "../../types";

interface Props {
  id: string,
  onCancel: () => void;
  onSubmit: (id: string, values: EntryFormValues) => void;
}

const AddOccupationalHealthcareEntryForm = ({ id, onCancel, onSubmit }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [employerName, setEmployerName] = useState('')
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit(id, {
      type:EntryTypes.OccupationalHealthcare,
      description,
      date,
      specialist,
      sickLeave: startDate || endDate ? {startDate:startDate, endDate:endDate} : undefined,
      employerName,
      diagnosisCodes
    });
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <TextField
          label="Description"
          fullWidth 
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <TextField
          label="Date"
          placeholder="YYYY-MM-DD"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="Sick leave start date"
          placeholder="YYYY-MM-DD"
          fullWidth
          value={startDate}
          onChange={({ target }) => setStartDate(target.value)}
        />
        <TextField
          label="Sick leave end date"
          placeholder="YYYY-MM-DD"
          fullWidth
          value={endDate}
          onChange={({ target }) => setEndDate(target.value)}
        />
        <TextField
          label="Employer name"
          fullWidth
          value={employerName}
          onChange={({ target }) => setEmployerName(target.value)}
        />
        <TextField
          label="Diagnosis codes"
          fullWidth
          value={diagnosisCodes}
          onChange={({ target }) => setDiagnosisCodes(target.value.split(',').map(code => code.trim()))}
        />
        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddOccupationalHealthcareEntryForm;