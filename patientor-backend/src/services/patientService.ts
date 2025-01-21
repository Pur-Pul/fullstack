import patientData from '../../data/patients';
import { NonSensitivePatient, Patient } from '../types';

const diagnoses: Patient[] = patientData;

const getPatients = (): Patient[] => {
  return diagnoses
}

const getNonSensitivePatients = (): NonSensitivePatient[] => {
    return diagnoses.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
  }

const addPatient = () => {
  return null;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient
};