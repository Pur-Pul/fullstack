import { Gender } from "./types";
import z from "zod";

export const baseEntrySchema = z.object({
    id: z.string(),
    date: z.string().date(),
    description: z.string(),
    specialist: z.string(),
    diagnosisCodes: z.array(z.string()).optional()
});

export const healthCheckEntrySchema = baseEntrySchema.extend({
    type: z.literal("HealthCheck"),
    healthCheckRating: z.number()
});

export const occupationalHealthcareEntrySchema = baseEntrySchema.extend({
    type: z.literal("OccupationalHealthcare"),
    employerName: z.string(),
    sickLeave: z.optional(z.object({
        startDate: z.string().date(),
        endDate: z.string().date()
    }))
});

export const hospitalEntrySchema = baseEntrySchema.extend({
    type: z.literal("Hospital"),
    discharge: z.object({
        date: z.string().date(),
        criteria: z.string(),
    })
})

export const newPatientSchema = z.object({
    name: z.string(),
    dateOfBirth: z.string().date(),
    ssn: z.string(),
    gender: z.nativeEnum(Gender),
    occupation: z.string(),
    entries: z.array(z.union([hospitalEntrySchema, occupationalHealthcareEntrySchema, healthCheckEntrySchema]))
});