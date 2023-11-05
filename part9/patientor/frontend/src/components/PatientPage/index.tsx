import { useEffect, useState } from 'react';
import { Diagnosis, Entry, Patient } from '../../types';
import { useParams } from 'react-router-dom';
import patientService from '../../services/patients';
import EntryDetails from './EntryDetails';

interface Props {
  diagnoses: Diagnosis[];
}

const PatientPage = ({ diagnoses }: Props) => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchPatient = () => {
      if (!id) return;
      patientService.getPatient(id).then((patient) => {
        setPatient(patient);
      });
    };
    fetchPatient();
  }, [id]);

  if (!patient) return <p>Loading...</p>;

  return (
    <div>
      <h3>
        {patient.name} ({patient.gender})
      </h3>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <h3>Entries</h3>
      {patient.entries?.map((entry: Entry) => {
        return (
          <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
        );
      })}
    </div>
  );
};

export default PatientPage;

