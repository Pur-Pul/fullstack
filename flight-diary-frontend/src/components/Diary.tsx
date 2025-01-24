import { useParams } from 'react-router';
import diaryService from "../services/diaries";
import { useState, useEffect } from 'react';
import { DiaryEntry } from '../types';

type Params = {
	id: string;
}

const Diary = () => {
    const { id } = useParams<Params>();
    const [diary, setDiary] = useState<DiaryEntry>();
    useEffect(() => {
        const getDiary = async () => {
            if (id != undefined ) { 
                const diary = await diaryService.get(id);
                setDiary(diary)
            }
        };
        getDiary();

    }, [id]);
    if (diary === undefined) { return null }
    return (
        <div>
            <h3>{diary.date}</h3>
            Weather: {diary.weather}<br/>
            Visibility: {diary.visibility}<br/>
            Comment: {diary.comment}
        </div>
    );
};

export default Diary