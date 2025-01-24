import SimpleDiary from "./SimpleDiary";
import { NonSensitiveDiaryEntry } from "../types";

interface DiaryListProps {
    diaries: NonSensitiveDiaryEntry[]
};

const DiaryList = ({ diaries } : DiaryListProps) => {
    return diaries.map((diary) => <SimpleDiary key={diary.id} diary={ diary }/>);
};

export default DiaryList;