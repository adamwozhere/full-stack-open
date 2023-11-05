import type { Diagnosis, HealthCheckEntry } from '../../../types';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface Props {
  entry: HealthCheckEntry;
  diagnoses: Diagnosis[];
}

const HealthCheckEntry = ({ entry, diagnoses }: Props) => {
  const healthColor = ['green', 'yellow', 'orange', 'red'];

  return (
    <div
      style={{
        border: 1,
        borderColor: 'black',
        borderStyle: 'solid',
        padding: '0.5rem 1rem',
        marginTop: '1rem',
      }}
    >
      <p>
        <b>{entry.date}</b> {entry.description}
      </p>
      <p>
        <b>health check rating:</b>&nbsp;
        <FavoriteIcon sx={{ color: healthColor[entry.healthCheckRating] }} />
      </p>
      <p>
        <b>diagnosed by:</b> {entry.specialist}
      </p>
      <ul>
        {entry.diagnosisCodes?.map((code) => {
          return (
            <li key={code}>
              {code} {diagnoses.find((d) => d.code === code)?.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default HealthCheckEntry;

