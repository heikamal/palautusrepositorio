import { useState } from "react";
import { Diary } from "./types";
const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([
    {
      "id": 1,
      "date": "2017-01-01",
      "weather": "rainy",
      "visibility": "poor"
    },
    {
      "id": 2,
      "date": "2017-04-01",
      "weather": "sunny",
      "visibility": "good"
    },
    {
      "id": 3,
      "date": "2017-04-15",
      "weather": "windy",
      "visibility": "good"
    },
    {
      "id": 4,
      "date": "2017-05-11",
      "weather": "cloudy",
      "visibility": "good"
    }
  ]);

  return (
    <div>
      <h2>Diary entries</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {diaries.map(diary => <li key={diary.id}>
          <h3>{diary.date}</h3>
          visibility: {diary.visibility}<br/>
          weather: {diary.weather}
          </li>)}
      </ul>
    </div>
  );
}

export default App;
