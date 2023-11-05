import type { OccupationalHealthcareEntry, Diagnosis } from '../../../types';

interface Props {
  entry: OccupationalHealthcareEntry;
  diagnoses: Diagnosis[];
}

const OccupationalHealthcareEntry = ({ entry, diagnoses }: Props) => {
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
        <b>employer:</b> {entry.employerName}
      </p>
      {entry.sickLeave ? (
        <p>
          <b>sick leave:</b>&nbsp;
          {entry.sickLeave?.startDate} --- {entry.sickLeave?.endDate}
        </p>
      ) : null}

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

export default OccupationalHealthcareEntry;

