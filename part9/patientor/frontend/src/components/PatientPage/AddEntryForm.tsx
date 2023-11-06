import { Alert, Button, TextField } from '@mui/material';
import { useState } from 'react';
import { EntryWithoutId, HealthCheckRating } from '../../types';

interface Props {
  patientId: string;
  onSubmit: (id: string, entry: EntryWithoutId) => void;
  error: string | null;
}

const AddEntryForm = ({ patientId, onSubmit, error }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [rating, setRating] = useState(HealthCheckRating.Healthy);
  const [diagnosisCodes, setDiagnosisCodes] = useState('');

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    onSubmit(patientId, {
      type: 'HealthCheck',
      description,
      date,
      specialist,
      healthCheckRating: rating,
      diagnosisCodes: diagnosisCodes.split(', '),
    });

    // reset fields ? doesn't handle this if it's a success or not so don't reset for now
    // also doesn't clear error alert message
    // setDescription('');
    // setDate('');
    // setSpecialist('');
    // setRating(HealthCheckRating.Healthy);
    // setDiagnosisCodes('');
  };

  const onRatingChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    if (typeof e.target.value === 'string') {
      const value = e.target.value;
      const healthRating = Object.values(HealthCheckRating).find(
        (r) => r === Number(value)
      );
      if (healthRating) {
        setRating(Number(healthRating));
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        border: '1px dotted black',
        padding: '0.5rem 1rem',
        marginBlock: '1rem',
      }}
    >
      <h3>New HealthCheck entry</h3>

      {error ? <Alert severity="error">{error}</Alert> : null}

      <TextField
        label="Description"
        fullWidth
        value={description}
        onChange={({ target }) => setDescription(target.value)}
      />
      <TextField
        label="Date"
        placeholder="YYYY-MM-DD"
        fullWidth
        value={date}
        onChange={({ target }) => setDate(target.value)}
      />
      <TextField
        label="Specialist"
        fullWidth
        value={specialist}
        onChange={({ target }) => setSpecialist(target.value)}
      />
      <TextField
        label="HealthCheck Rating"
        fullWidth
        value={rating}
        onChange={(event) => onRatingChange(event)}
      />
      <TextField
        label="Diagnosis Codes (comma separated)"
        fullWidth
        value={diagnosisCodes}
        onChange={({ target }) => setDiagnosisCodes(target.value)}
      />
      <Button type="submit" variant="contained">
        Add
      </Button>
    </form>
  );
};

export default AddEntryForm;

