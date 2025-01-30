import { useState, SyntheticEvent } from "react";

import {  TextField, InputLabel, MenuItem, Select, Grid, Button, SelectChangeEvent } from '@mui/material';

import { EntryFormValues } from "../../types";

interface Props {
  id: string,
  onCancel: () => void;
  onSubmit: (id: string, values: EntryFormValues) => void;
}

//interface GenderOption{
//  value: Gender;
//  label: string;
//}

//const genderOptions: GenderOption[] = Object.values(Gender).map(v => ({
//  value: v, label: v.toString()
//}));

const AddEntryForm = ({ id, onCancel, onSubmit }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState(0);
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit(id, {
      type:"HealthCheck",
      description,
      date,
      specialist,
      healthCheckRating,
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
          label="Healthcheck rating"
          fullWidth
          value={healthCheckRating}
          onChange={({ target }) => setHealthCheckRating(Number(target.value))}
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

/*
<InputLabel style={{ marginTop: 20 }}>Gender</InputLabel>
        <Select
          label="Gender"
          fullWidth
          value={gender}
          onChange={onGenderChange}
        >
        {genderOptions.map(option =>
          <MenuItem
            key={option.label}
            value={option.value}
          >
            {option.label
          }</MenuItem>
        )}
        </Select>
*/

export default AddEntryForm;