import data from '../data/patients';
import { NonSensitivePatientDetails } from '../types';

const getPatients = (): NonSensitivePatientDetails[] => {
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

