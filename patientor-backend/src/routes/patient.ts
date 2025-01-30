import express from 'express';
import { Response, Request, NextFunction } from 'express';
import { NonSensitivePatient, Patient, NewPatient, Entry, NewEntry} from '../types';
import patientService from '../services/patientService';
import { newPatientSchema, newHealthCheckEntrySchema, newOccupationalHealthcareEntrySchema, newHospitalEntrySchema, parseDiagnosisCodes } from '../utils';
import z from 'zod';

class InvalidEntryType extends Error {
    public name = 'InvalidEntryType'

    constructor( public arg: string ) {
        super( arg )
    }
}

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
        if (req.body.type) {
            switch (req.body.type) {
                case "Hospital":
                    newHospitalEntrySchema.parse(req.body);
                    break;
                case "OccupationalHealthcare":
                    newOccupationalHealthcareEntrySchema.parse(req.body);
                    break;
                case "HealthCheck":
                    newHealthCheckEntrySchema.parse(req.body);
                    break;
                default:
                    throw new InvalidEntryType("Invalid entry type");

            } 
        } else {
            throw new InvalidEntryType("Invalid entry type");
        }
        next();
    } catch (error: unknown) {
        next(error);
    }
};
const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => { 
    if (error instanceof z.ZodError) {
        if (error.issues[0].code == "invalid_enum_value") {
            res.status(400).send(`Value of ${error.issues[0].path[0]} incorrect: ${error.issues[0].received}`);
        } else {
            res.status(400).send(error.issues[0].message)
        }
    } else if (error instanceof InvalidEntryType) {
        res.status(400).send(error.arg);
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