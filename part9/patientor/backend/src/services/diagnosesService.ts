import data from '../data/diagnoses';
import type { Diagnosis } from '../types';

const getDiagnoses = (): Diagnosis[] => {
  return data;
};

export default {
  getDiagnoses,
};
