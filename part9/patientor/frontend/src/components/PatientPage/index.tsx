import { useEffect, useState } from 'react';
import { Diagnosis, Entry, EntryWithoutId, Patient } from '../../types';
import { useParams } from 'react-router-dom';
import patientService from '../../services/patients';
import EntryDetails from './EntryDetails';
import AddEntryForm from './AddEntryForm';
import axios from 'axios';

interface Props {
  diagnoses: Diagnosis[];
}

const PatientPage = ({ diagnoses }: Props) => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [error, setError] = useState<string | null>(null);
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

  const addEntry = async (id: string, values: EntryWithoutId) => {
    try {
      const entry = await patientService.addEntry(id, values);

      setPatient((p) => {
        if (!p) return null;

        return {
          ...p,
          entries: p.entries.concat(entry),
        };
      });
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === 'string') {
          const message = e.response.data.replace(
            'Something went wrong. Error: ',
            ''
          );
          console.error(message);
          setError(message);
        } else {
          console.error('Unrecognised axios error');
          setError('Unrecognised axios error');
        }
      } else {
        console.error('Unknown error');
        setError('Unknown error');
      }
    }
  };

  if (!patient) return <p>Loading...</p>;

  return (
    <div>
      <h3>
        {patient.name} ({patient.gender})
      </h3>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <AddEntryForm patientId={patient.id} onSubmit={addEntry} error={error} />
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

