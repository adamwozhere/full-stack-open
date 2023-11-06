import express from 'express';
import patientsService from '../services/patientsService';
import toNewPatientEntry, { toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(patientsService.getPatients());
});

router.get('/:id', (req, res) => {
  const patient = patientsService.getPatient(req.params.id);
  if (patient) {
    res.json(patient);
  } else {
    res.sendStatus(404);
  }
});
router.post('/:id/entries', (req, res) => {
  try {
    const newEntry = toNewEntry(req.body);

    const addedEntry = patientsService.addEntry(req.params.id, newEntry);
    res.json(addedEntry);
  } catch (error) {
    let errorMessage = 'Something went wrong. ';
    if (error instanceof Error) {
      errorMessage += 'Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);

    const addedPatient = patientsService.addPatient(newPatientEntry);
    res.json(addedPatient);
  } catch (error) {
    let errorMessage = 'Something went wrong. ';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;

