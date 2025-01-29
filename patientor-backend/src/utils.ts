import { Gender } from "./types";
import z from "zod";

export const entrySchema = z.object({})

export const newPatientSchema = z.object({
    name: z.string(),
    dateOfBirth: z.string().date(),
    ssn: z.string(),
    gender: z.nativeEnum(Gender),
    occupation: z.string(),
    entries: z.array(entrySchema)
});