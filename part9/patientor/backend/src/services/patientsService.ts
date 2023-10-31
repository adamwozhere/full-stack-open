import data from '../data/patients';
import { SensitivePatientDetails } from '../types';

const getPatients = (): SensitivePatientDetails[] => {
  return data.map((d) => ({
    id: d.id,
    name: d.name,
    dateOfBirth: d.dateOfBirth,
    gender: d.gender,
    occupation: d.occupation,
  }));
};

export default {
  getPatients,
};

