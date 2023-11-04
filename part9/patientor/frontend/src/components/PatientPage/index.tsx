import { useEffect, useState } from 'react';
import { Entry, Patient } from '../../types';
import { useParams } from 'react-router-dom';
import patientService from '../../services/patients';

const PatientPage = () => {
  const [data, setData] = useState<Patient | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchPatient = () => {
      if (!id) return;
      patientService.getPatient(id).then((data) => {
        setData(data);
      });
    };
    fetchPatient();
  }, [id]);

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h3>
        {data.name} ({data.gender})
      </h3>
      <p>ssn: {data.ssn}</p>
      <p>occupation: {data.occupation}</p>
      <h3>Entries</h3>
      {data.entries?.map((entry: Entry) => {
        return (
          <div key={entry.id}>
            <p>
              {entry.date} {entry.description}
            </p>
            <ul>
              {entry.diagnosisCodes?.map((code) => {
                return <li key={code}>{code}</li>;
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default PatientPage;

