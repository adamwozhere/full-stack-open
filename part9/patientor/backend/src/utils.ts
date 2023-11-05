import {
  Entry,
  Gender,
  NewPatientEntry,
  Diagnosis,
  HealthCheckRating,
  EntryWithoutId,
} from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isNumber = (num: unknown): num is number => {
  return typeof num === 'number' || num instanceof Number;
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error('Incorrect or missing name');
  }

  return name;
};

const parseSSN = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error('Incorrect or missing SSN');
  }

  return ssn;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }

  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }

  return occupation;
};

const isDate = (date: string) => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }

  return date;
};

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'gender' in object &&
    'occupation' in object
  ) {
    const newPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSSN(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: [],
    };
    return newPatient;
  }

  throw new Error('Incorrect data: some fields are missing');
};

const parseDescription = (description: unknown): string => {
  if (!isString(description)) {
    throw new Error('Incorrect or missing description');
  }

  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!isString(specialist)) {
    throw new Error('Incorrect or missing specialist');
  }

  return specialist;
};

const parseCriteria = (criteria: unknown): string => {
  if (!isString(criteria)) {
    throw new Error('Incorrect or missing criteria');
  }

  return criteria;
};

const parseEmployerName = (employerName: unknown): string => {
  if (!isString(employerName)) {
    throw new Error('Incorrect or missing employerName');
  }

  return employerName;
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating)
    .map((v) => Number(v))
    .includes(param);
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (!isNumber(rating) || !isHealthCheckRating(rating)) {
    throw new Error('Incorrect or missing health check rating: ' + rating);
  }

  return rating;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
  if (!object || !(object instanceof Array)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }

  return object as Array<Diagnosis['code']>;
};

export const toNewEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'description' in object &&
    'date' in object &&
    'specialist' in object &&
    'type' in object
  ) {
    const newEntry = {
      description: parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
    };

    if ('diagnosisCodes' in object) {
      Object.assign(newEntry, {
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
      });
    }

    if (
      object.type === 'Hospital' &&
      'discharge' in object &&
      typeof object.discharge === 'object' &&
      object.discharge !== null &&
      'date' in object.discharge &&
      'criteria' in object.discharge
    ) {
      Object.assign(newEntry, {
        discharge: {
          date: parseDate(object.discharge.date),
          criteria: parseCriteria(object.discharge.criteria),
        },
      });
    } else if (
      object.type === 'OccupationalHealthcare' &&
      'employerName' in object
    ) {
      Object.assign(newEntry, {
        employerName: parseEmployerName(object.employerName),
      });

      if (
        'sickLeave' in object &&
        typeof object.sickLeave === 'object' &&
        object.sickLeave !== null &&
        'startDate' in object.sickLeave &&
        'endDate' in object.sickLeave
      ) {
        Object.assign(newEntry, {
          sickLeave: {
            startDate: parseDate(object.sickLeave.startDate),
            endDate: parseDate(object.sickLeave.endDate),
          },
        });
      }
    } else if (object.type === 'HealthCheck' && 'healthCheckRating' in object) {
      Object.assign(newEntry, {
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      });
    } else {
      throw new Error('Incompatible Entry type');
    }

    return newEntry as Entry;
  }

  throw new Error('Incompatible Entry');
};

export default toNewPatientEntry;

