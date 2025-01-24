import DiaryList from "./components/DiaryList";
import Diary from "./components/Diary";
import diaryService from "./services/diaries";
import { NonSensitiveDiaryEntry } from "./types";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router";

function App() {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);
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
      <BrowserRouter>
        <Routes> 
          <Route path="/" element={<DiaryList diaries={ diaries }/>} />
          <Route path="diaries/:id" element={<Diary />} />
        </Routes>
      </BrowserRouter>
      
    </div>
  )
};

export default App;
