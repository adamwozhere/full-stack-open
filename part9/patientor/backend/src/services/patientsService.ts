import data from '../data/patients';
import { v1 as uuid } from 'uuid';
import { Patient, NewPatientEntry, NonSensitivePatientDetails } from '../types';

const patients = data;

const getPatients = (): NonSensitivePatientDetails[] => {
  return patients.map((d) => ({
    id: d.id,
    name: d.name,
    dateOfBirth: d.dateOfBirth,
    gender: d.gender,
    occupation: d.occupation,
  }));
};

const addPatient = (patient: NewPatientEntry): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient,
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  addPatient,
};

