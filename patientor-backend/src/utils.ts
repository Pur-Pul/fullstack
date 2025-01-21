import { NewPatient, Gender } from "./types";
const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name.');
    }
    return name;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date.');
    }
    return date;
};

const isSsn = (ssn: string): boolean => {
    return Boolean(ssn.length == 11 && Number(ssn.substring(0, 6) && Number(ssn.substring(7,10))));
};

const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn) || !isSsn(ssn)) {
        throw new Error('Incorrect or missing ssn.');
    }
    return ssn;
};

const isGender = (gender: string): gender is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(gender);
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender.');
    }
    return gender;
};

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation.');
    }
    return occupation;
};

const toNewPatient = (body: unknown): NewPatient => {
    if (!body || typeof body !== 'object') {
        throw new Error('Incorrect or missing data.');
    }
    if ('name' in body && 'dateOfBirth' in body && 'ssn' in body && 'gender' in body && 'occupation' in body) {
        const newPatient: NewPatient = {
            name: parseName(body.name),
            dateOfBirth: parseDate(body.dateOfBirth),
            ssn: parseSsn(body.ssn),
            gender: parseGender(body.gender),
            occupation: parseOccupation(body.occupation)
        };
        return newPatient;
    }
    throw new Error('Incorrect data: some fields are missing.');
};

export default toNewPatient;