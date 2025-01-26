import DiaryList from "./components/DiaryList";
import Diary from "./components/Diary";
import diaryService from "./services/diaries";
import DiaryForm from "./components/DiaryForm";
import Notification from "./components/Notification";
import { NonSensitiveDiaryEntry } from "./types";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route} from "react-router";
import { Message } from "./types";

function App() {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);
  const [message, setMessage] = useState<Message | null>(null)
  useEffect(() => {
    const fetchDiaryList = async () => {
      const diaries = await diaryService.getAll();
      setDiaries(diaries);
    };
    void fetchDiaryList();
  }, []);

  return (
    <div>
      <h1>Flight diaries</h1>
      <Notification message={ message }/>
      <BrowserRouter>
        <Routes> 
          <Route path="/" element={<DiaryList diaries={ diaries }/>} />
          <Route path="diaries/:id" element={<Diary />} />
          <Route path="/new-diary" element={<DiaryForm setDiaries={ setDiaries } diaries = { diaries } setMessage={ setMessage }/>} />
        </Routes>

      </BrowserRouter>
    </div>
  )
};

export default App;
