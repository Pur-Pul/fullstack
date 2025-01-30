import express from 'express';
import { Response, Request, NextFunction } from 'express';
import { NonSensitivePatient, Patient, NewPatient, Entry, NewEntry} from '../types';
import patientService from '../services/patientService';
import { newPatientSchema, newEntrySchema, parseDiagnosisCodes } from '../utils';
import z from 'zod';

const router = express.Router();
const newPatientParser = (req: Request, _res: Response, next: NextFunction) => { 
    try {
        newPatientSchema.parse(req.body);
        next();
    } catch (error: unknown) {
        next(error);
    }
};
const newEntryParser = (req: Request, _res: Response, next: NextFunction) => {
    try {
        newEntrySchema.parse(req.body);
        next();
    } catch (error: unknown) {
        next(error);
    }
};
const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => { 
    if (error instanceof z.ZodError) {
        res.status(400).send({ error: error.issues });
    } else {
        next(error);
    }
};

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
    res.send(patientService.getNonSensitivePatients());
});

router.get('/:id', (req, res: Response<Patient>) => {
    const patient = patientService.findById(req.params.id);

    if (patient) {
        res.send(patient);
    } else {
        res.sendStatus(404);
    }
});

router.post('/', newPatientParser, (req : Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
    const addedPatient = patientService.addPatient(req.body);
    res.json(addedPatient);
});

router.post('/:id/entries', newEntryParser, (req : Request<{id: string}, unknown, NewEntry>, res: Response<Entry>) => {
    const patient = patientService.findById(req.params.id);
    if (patient) {
        const addedEntry = patientService.addEntry(patient, {...req.body, diagnosisCodes:parseDiagnosisCodes(req.body)});
        res.json(addedEntry);
    } else {
        res.sendStatus(404);
    }
});

router.use(errorMiddleware);
export default router;