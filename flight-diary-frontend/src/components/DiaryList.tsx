import SimpleDiary from "./SimpleDiary";
import { NonSensitiveDiaryEntry } from "../types";
import { Link } from "react-router";

interface DiaryListProps {
    diaries: NonSensitiveDiaryEntry[]
};

const DiaryList = ({ diaries } : DiaryListProps) => {
    return (
        <div>
            {diaries.map((diary) => <SimpleDiary key={diary.id} diary={ diary }/>)}
            <Link to={`/new-diary`}><button>New diary entry</button></Link><br/>
        </div>
        
    );
};

export default DiaryList;