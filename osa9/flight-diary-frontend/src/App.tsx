import { useEffect, useState } from "react";
import { Diary } from "./types";
import axios from "axios";
import Entries from "./components/Entries";
const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    axios.get<Diary[]>('http://localhost:3000/api/diaries').then(response  => {
      setDiaries(response.data)
    });
  }, []);

  return (
    <div>
      <Entries entries={diaries}/>
    </div>
  );
}

export default App;
