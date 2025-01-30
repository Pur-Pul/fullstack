import { useState, SyntheticEvent } from "react";

import {  TextField, Grid, Button, MenuItem, Select, SelectChangeEvent } from '@mui/material';

import { EntryFormValues, EntryTypes, Diagnosis } from "../../types";

interface Props {
  id: string;
  diagnoses: Diagnosis[];
  onCancel: () => void;
  onSubmit: (id: string, values: EntryFormValues) => void;
}

const AddOccupationalHealthcareEntryForm = ({ id, diagnoses, onCancel, onSubmit }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(' ');
  const [specialist, setSpecialist] = useState('');
  const [startDate, setStartDate] = useState(' ');
  const [endDate, setEndDate] = useState(' ');
  const [employerName, setEmployerName] = useState('')
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  const onDiagnosesChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
    event.preventDefault();
    const { target: { value },} = event;
    const values: string[] = typeof value === 'string' ? value.split(',') : value
    const codes = diagnoses.filter((diagnosis) => {
      return values.includes(diagnosis.code)
    }).map(diagnosis => diagnosis.code);
    if (codes) {
      setDiagnosisCodes(codes);
    }
  };

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
          type="date"
          placeholder="YYYY-MM-DD"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="Sick leave start date"
          type="date"
          placeholder="YYYY-MM-DD"
          fullWidth
          value={startDate}
          onChange={({ target }) => setStartDate(target.value)}
        />
        <TextField
          label="Sick leave end date"
          type="date"
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
        <Select
          multiple
          label="Diagnosis codes"
          fullWidth
          value={diagnosisCodes}
          onChange={onDiagnosesChange}
        >
          {diagnoses.map(option =>
            <MenuItem
              key={option.name}
              value={option.code}
            >
              {option.name
            }</MenuItem>
          )}
        </Select>
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