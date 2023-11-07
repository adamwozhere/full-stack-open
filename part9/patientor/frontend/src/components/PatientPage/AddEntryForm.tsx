import {
  Alert,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { EntryWithoutId, HealthCheckRating } from '../../types';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
// import just the array of codes as 'diagnosisOptions' for the Select input to map over
import diagnosisOptions from './DiagnosisCodes';

interface Props {
  patientId: string;
  onSubmit: (id: string, entry: EntryWithoutId) => void;
  error: string | null;
}

const AddEntryForm = ({ patientId, onSubmit, error }: Props) => {
  const [entryType, setEntryType] = useState('HealthCheck');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState<Dayjs | null>(dayjs(new Date()));
  const [specialist, setSpecialist] = useState('');
  const [rating, setRating] = useState(HealthCheckRating.Healthy);
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  const [employerName, setEmployerName] = useState('');
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [dischargeDate, setDischargeDate] = useState<Dayjs | null>(
    dayjs(new Date())
  );
  const [dischargeCriteria, setDischargeCriteria] = useState('');

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (entryType === 'HealthCheck') {
      onSubmit(patientId, {
        type: 'HealthCheck',
        description,
        date: dayjs(date).format('YYYY-MM-DD'),
        specialist,
        diagnosisCodes,
        healthCheckRating: rating,
      });
    } else if (entryType === 'Hospital') {
      onSubmit(patientId, {
        type: 'Hospital',
        description,
        date: dayjs(date).format('YYYY-MM-DD'),
        specialist,
        diagnosisCodes,
        discharge: {
          date: dayjs(dischargeDate).format('YYYY-MM-DD'),
          criteria: dischargeCriteria,
        },
      });
    } else if (entryType === 'OccupationalHealthcare') {
      const entry: EntryWithoutId = {
        type: 'OccupationalHealthcare',
        description,
        date: dayjs(date).format('YYYY-MM-DD'),
        specialist,
        diagnosisCodes,
        employerName,
        sickLeave: {
          startDate: dayjs(startDate).format('YYYY-MM-DD'),
          endDate: dayjs(endDate).format('YYYY-MM-DD'),
        },
      };

      if (startDate === null && endDate === null) {
        delete entry.sickLeave;
      }
      onSubmit(patientId, entry);
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

  const handleDiagnosesChange = (
    event: SelectChangeEvent<typeof diagnosisCodes>
  ) => {
    const {
      target: { value },
    } = event;

    setDiagnosisCodes(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
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

        <DatePicker
          label="Date"
          value={date}
          onChange={(val) => setDate(val)}
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
            <DatePicker
              label="Discharge Date"
              value={dischargeDate}
              onChange={(val) => setDischargeDate(val)}
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
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(val) => setStartDate(val)}
            />
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(val) => setEndDate(val)}
            />
          </div>
        ) : null}

        <FormControl fullWidth>
          <InputLabel>Diagnosis Codes</InputLabel>
          <Select
            multiple
            value={diagnosisCodes}
            onChange={handleDiagnosesChange}
          >
            {diagnosisOptions.map((opt) => (
              <MenuItem key={opt} value={opt}>
                {opt}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button type="submit" variant="contained">
          Add
        </Button>
      </form>
    </LocalizationProvider>
  );
};

export default AddEntryForm;

