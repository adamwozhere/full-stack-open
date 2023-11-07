import {
  Alert,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { EntryWithoutId, HealthCheckRating } from '../../types';

interface Props {
  patientId: string;
  onSubmit: (id: string, entry: EntryWithoutId) => void;
  error: string | null;
}

const AddEntryForm = ({ patientId, onSubmit, error }: Props) => {
  const [entryType, setEntryType] = useState('HealthCheck');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [rating, setRating] = useState(HealthCheckRating.Healthy);
  const [diagnosisCodes, setDiagnosisCodes] = useState('');

  const [employerName, setEmployerName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (entryType === 'HealthCheck') {
      onSubmit(patientId, {
        type: 'HealthCheck',
        description,
        date,
        specialist,
        diagnosisCodes: diagnosisCodes.split(', '),
        healthCheckRating: rating,
      });
    } else if (entryType === 'Hospital') {
      onSubmit(patientId, {
        type: 'Hospital',
        description,
        date,
        specialist,
        diagnosisCodes: diagnosisCodes.split(', '),
        discharge: {
          date: dischargeDate,
          criteria: dischargeCriteria,
        },
      });
    } else if (entryType === 'OccupationalHealthcare') {
      onSubmit(patientId, {
        type: 'OccupationalHealthcare',
        description,
        date,
        specialist,
        diagnosisCodes: diagnosisCodes.split(', '),
        employerName,
        sickLeave: {
          startDate,
          endDate,
        },
      });
    } else {
      console.error('unhandled entry type');
    }

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
      <h3>New {entryType} entry</h3>

      <FormControl>
        <FormLabel>Entry type</FormLabel>
        <RadioGroup
          row
          name="entry-type"
          value={entryType}
          onChange={({ target }) => setEntryType(target.value)}
        >
          <FormControlLabel
            value="HealthCheck"
            control={<Radio />}
            label="Health Check"
          />
          <FormControlLabel
            value="Hospital"
            control={<Radio />}
            label="Hospital"
          />
          <FormControlLabel
            value="OccupationalHealthcare"
            control={<Radio />}
            label="Occupational Healthcare"
          />
        </RadioGroup>
      </FormControl>

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

      {entryType === 'HealthCheck' ? (
        <TextField
          label="HealthCheck Rating"
          fullWidth
          value={rating}
          onChange={(event) => onRatingChange(event)}
        />
      ) : null}

      {entryType === 'Hospital' ? (
        <div>
          <TextField
            label="Discharge Date"
            fullWidth
            value={dischargeDate}
            onChange={({ target }) => setDischargeDate(target.value)}
          />
          <TextField
            label="Discharge Criteria"
            fullWidth
            value={dischargeCriteria}
            onChange={({ target }) => setDischargeCriteria(target.value)}
          />
        </div>
      ) : null}

      {entryType === 'OccupationalHealthcare' ? (
        <div>
          <TextField
            label="Employer Name"
            fullWidth
            value={employerName}
            onChange={({ target }) => setEmployerName(target.value)}
          />
          <h4>Sick Leave</h4>
          <TextField
            label="Start Date"
            value={startDate}
            onChange={({ target }) => setStartDate(target.value)}
          />
          <TextField
            label="End Date"
            value={endDate}
            onChange={({ target }) => setEndDate(target.value)}
          />
        </div>
      ) : null}

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

