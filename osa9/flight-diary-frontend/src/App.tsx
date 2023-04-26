import { useEffect, useState } from "react";
import { Diary } from "./types";
import Entries from "./components/Entries";
import DiaryForm from "./components/DiaryForm";
import { getAllDiaries } from "./services/diaryService";
const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data)
    })
  }, []);

  return (
    <div>
      <DiaryForm diaries={diaries} setDiaries={setDiaries} />
      <Entries entries={diaries}/>
    </div>
  );
}

export default App;
