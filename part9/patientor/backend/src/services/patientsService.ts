// import data from '../data/patients';
import patients from '../data/patients';
import { v1 as uuid } from 'uuid';
import {
  Patient,
  NewPatientEntry,
  NonSensitivePatient,
  Gender,
  EntryWithoutId,
  Entry,
} from '../types';

// const patients = data;

const getPatients = (): NonSensitivePatient[] => {
  return patients.map((d) => ({
    id: d.id,
    name: d.name,
    dateOfBirth: d.dateOfBirth,
    gender: d.gender as Gender,
    occupation: d.occupation,
    entries: d.entries,
  }));
};

const getPatient = (id: string): Patient | null => {
  const p = patients.find((p) => p.id === id);
  if (p) {
    return {
      ...p,
      gender: p.gender as Gender,
    };
  }
  return null;
};

const addPatient = (patient: NewPatientEntry): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient,
  };
  patients.push(newPatient);
  return newPatient;
};

const addEntry = (id: string, entry: EntryWithoutId): Entry => {
  const newEntry = {
    id: uuid(),
    ...entry,
  };
  patients.find((p) => p.id === id)?.entries.push(newEntry);
  return newEntry;
};

export default {
  getPatients,
  addPatient,
  getPatient,
  addEntry,
};

