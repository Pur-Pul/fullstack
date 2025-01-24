import axios from "axios";
import { NonSensitiveDiaryEntry, DiaryEntry } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<NonSensitiveDiaryEntry[]>(
    `${apiBaseUrl}/diaries`
  );

  return data;
};

const get = async (id: string) => {
  const { data } = await axios.get<DiaryEntry>(
    `${apiBaseUrl}/diaries/${id}`
  );

  return data;
}

/*
const create = async (object: DiaryFormValues) => {
  const { data } = await axios.post<DiaryEntry>(
    `${apiBaseUrl}/diaries`,
    object
  );

  return data;
};

*/

export default {
  getAll, get
};

