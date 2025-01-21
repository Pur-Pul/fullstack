import express from 'express';
import { Response } from 'express';
import { NonSensitivePatient } from '../types';
import patientService from '../services/patientService';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
    res.send(patientService.getNonSensitivePatients());
});

router.post('/', (req, res: Response<NonSensitivePatient>) => {
    const addedPatient = patientService.addPatient(toNewPatient(req.body));
    res.json(addedPatient);
});

export default router;