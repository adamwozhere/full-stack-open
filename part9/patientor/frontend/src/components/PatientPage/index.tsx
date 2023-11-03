import { useEffect, useState } from 'react';
import { Patient } from '../../types';
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
    </div>
  );
};

export default PatientPage;

