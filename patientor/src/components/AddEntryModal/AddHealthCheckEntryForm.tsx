import { useState, SyntheticEvent } from "react";

import {  TextField, Grid, Button, Select, MenuItem, InputLabel, SelectChangeEvent, FormControlLabel, Radio, RadioGroup, FormLabel } from '@mui/material';

import { EntryFormValues, EntryTypes, Diagnosis, HealthCheckRating } from "../../types";

interface Props {
  id: string;
  diagnoses: Diagnosis[];
  onCancel: () => void;
  onSubmit: (id: string, values: EntryFormValues) => void;
}

const AddHealthCheckEntryForm = ({ id, diagnoses, onCancel, onSubmit }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(' ');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState(0);
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
      type:EntryTypes.HealthCheck,
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
          type="date"
          placeholder="YYYY-MM-DD"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <FormLabel>Healthcheck rating</FormLabel>
        <RadioGroup
          defaultValue="0"
          name="radio-buttons-group"
        > { Object.values(HealthCheckRating).map(rating => typeof rating === 'number' ? <FormControlLabel key={rating} value={rating} control={<Radio />} label={rating} onChange={() => setHealthCheckRating(rating)}/> : null) }
    
        </RadioGroup>
        <InputLabel style={{ marginTop: 20 }}>Entry type</InputLabel>
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

export default AddHealthCheckEntryForm;