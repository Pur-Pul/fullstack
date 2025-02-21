import patientData from '../../data/patients';
import { NonSensitivePatient, Patient, NewPatient, Entry, NewEntry} from '../types';
import { v1 as uuid } from 'uuid';

const patients: Patient[] = patientData;

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation}) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation
  }));
};

const addPatient = (patientToAdd: NewPatient): Patient => {
  const newPatient = { id : uuid(), ...patientToAdd};
  patients.push(newPatient);
  return newPatient;
};

const findById = (id: string): Patient | undefined => {
  return patients.find(patient => patient.id == id);
};

const addEntry = (patient: Patient, entryToAdd: NewEntry): Entry => {
  const newEntry = { id : uuid(), ...entryToAdd};
  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient,
  findById,
  addEntry
};