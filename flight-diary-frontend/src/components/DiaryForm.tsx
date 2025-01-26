import { Dispatch, SetStateAction, useState } from "react";
import diaryService from "../services/diaries";
import { useNavigate } from "react-router";
import { Message, NonSensitiveDiaryEntry } from "../types";
import axios from "axios";

interface DiaryProps {
    setDiaries: Dispatch<SetStateAction<NonSensitiveDiaryEntry[]>>
    diaries: NonSensitiveDiaryEntry[]
    setMessage: Dispatch<SetStateAction<Message | null>>
};

const DiaryForm = ({ setDiaries, diaries, setMessage } : DiaryProps) => {
    const [date, setDate] = useState<string>("");
    const [weather, setWeather] = useState<string>("");
    const [visibility, setVisibility] = useState<string>("");
    const [comment, setComment] = useState<string>("");
    const navigate = useNavigate();

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            const new_diary = {date, weather, visibility, comment};
            const {...result}: NonSensitiveDiaryEntry = await diaryService.create(new_diary);
            setDiaries(diaries.concat(result));

            setDate("");
            setWeather("");
            setVisibility("");
            setComment("");

            navigate("/");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error(error)
                if (error.response != undefined) {
                    const new_message: Message = {text: error.response.data, type:"error" }
                    setMessage(new_message)
                    setTimeout(() => setMessage(null), 5000)
                }
            } else {
                console.error(error);
            }
        }
    }
    const weathers = ["sunny", "rainy", "cloudy", "stormy", "windy"];
    const visibilities = ["great", "good", "ok", "poor"];

    return (
        <div>
            <h2>New diary entry</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="date">Date:</label>
                <input type="date" name="date" id="date" onChange={({ target }) => setDate(target.value)}/><br/>
                
                <fieldset>
                <legend>Weather</legend>
                    {weathers.map(weather => 
                        <div key={weather}>
                            <input type="radio" id={weather} value={weather} name="weather" onChange={({ target }) => setWeather(target.value)}/>
                            <label htmlFor={weather}>{weather}</label><br/>
                        </div>
                    )}
                </fieldset>
                <fieldset>
                <legend>Visibility</legend>
                    {visibilities.map(visibility =>
                        <div key={visibility}>
                            <input type="radio" id={visibility} value={visibility} name="visibility" onChange={({ target }) => setVisibility(target.value)}/>
                            <label htmlFor={visibility}>{visibility}</label><br/>
                        </div>
                    )}
                </fieldset>
                
                <label htmlFor="comment">Comment:</label>
                <input name="comment" id="comment" onChange={({ target }) => setComment(target.value)}/><br/>
                
                <button type="submit">Submit diary</button>
            </form>
        </div>
    );
};
export default DiaryForm;