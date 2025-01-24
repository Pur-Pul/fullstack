import { NonSensitiveDiaryEntry } from "../types";
import { Link } from "react-router";
interface DiaryProps {
    diary: NonSensitiveDiaryEntry
};

const SimpleDiary = ({ diary }: DiaryProps) => {
    return (
        <p>
            <Link to={`/diaries/${diary.id}`}>{ diary.date }</Link><br/>
            Weather: { diary.weather }<br/>
            Visibility: { diary.visibility }
        </p>
    );
};

export default SimpleDiary;