import axios from "axios";
import { Diagnosis } from "../types";
import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Diagnosis[]>(
    `${apiBaseUrl}/diagnoses`
  );

  return data;
};

const get = async (id: string) => {
  const { data } = await axios.get<Diagnosis>(
    `${apiBaseUrl}/diagnoses/${id}`
  );

  return data;
};

/*
const create = async (object: DiagnosisFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/diagnoses`,
    object
  );

  return data;
};
*/

export default {
  getAll, get
};

