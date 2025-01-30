import { Gender, Diagnosis} from "./types";
import z from "zod";

export const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
      // we will just trust the data to be in correct form
      return [] as Array<Diagnosis['code']>;
    }
  
    return object.diagnosisCodes as Array<Diagnosis['code']>;
};

export const newBaseEntrySchema = z.object({
    date: z.string().date(),
    description: z.string(),
    specialist: z.string(),
    diagnosisCodes: z.array(z.string()).optional()
});

export const newHealthCheckEntrySchema = newBaseEntrySchema.extend({
    type: z.literal("HealthCheck"),
    healthCheckRating: z.number()
});
export const healthCheckEntrySchema = newHealthCheckEntrySchema.extend({ id: z.string() });

export const newOccupationalHealthcareEntrySchema = newBaseEntrySchema.extend({
    type: z.literal("OccupationalHealthcare"),
    employerName: z.string(),
    sickLeave: z.optional(z.object({
        startDate: z.string().date(),
        endDate: z.string().date()
    }))
});
export const occupationalHealthcareEntrySchema = newOccupationalHealthcareEntrySchema.extend({ id: z.string() });

export const newHospitalEntrySchema = newBaseEntrySchema.extend({
    type: z.literal("Hospital"),
    discharge: z.object({
        date: z.string().date(),
        criteria: z.string(),
    })
});
export const hospitalEntrySchema = newHospitalEntrySchema.extend({ id: z.string() });


export const newEntrySchema = z.union([newHospitalEntrySchema, newOccupationalHealthcareEntrySchema, newHealthCheckEntrySchema]);
export const entrySchema = z.union([hospitalEntrySchema, occupationalHealthcareEntrySchema, healthCheckEntrySchema]);

export const newPatientSchema = z.object({
    name: z.string(),
    dateOfBirth: z.string().date(),
    ssn: z.string(),
    gender: z.nativeEnum(Gender),
    occupation: z.string(),
    entries: z.array(entrySchema)
});
