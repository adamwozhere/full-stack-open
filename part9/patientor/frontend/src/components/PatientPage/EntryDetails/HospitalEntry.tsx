import type { HospitalEntry, Diagnosis } from '../../../types';

interface Props {
  entry: HospitalEntry;
  diagnoses: Diagnosis[];
}

const HospitalEntry = ({ entry, diagnoses }: Props) => {
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
        <b>{entry.discharge.date} DISCHARGED</b>&nbsp; reason:{' '}
        {entry.discharge.criteria}
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

export default HospitalEntry;

