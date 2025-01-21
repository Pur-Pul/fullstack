import patientData from '../../data/patients';
import { NonSensitivePatient, Patient, NewPatient } from '../types';
import { v1 as uuid } from 'uuid';

const patients: Patient[] = patientData;

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
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

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient
};