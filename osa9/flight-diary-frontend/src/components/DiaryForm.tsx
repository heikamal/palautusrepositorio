import { FormEvent, useState } from "react";
import { Diary } from "../types";
import { createDiary } from "../services/diaryService";
import axios from "axios";

interface DiaryFormProps {
	diaries: Diary[],
	setDiaries: React.Dispatch<React.SetStateAction<Diary[]>>
}

const DiaryForm = (props: DiaryFormProps) => {
	const [date, setDate] = useState('');
	const [visibility, setVisibility] = useState('');
	const [weather, setWeather] = useState('');
	const [comment, setComment] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	const addFormHandler = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const data = await createDiary({ date: date, visibility: visibility, weather: weather, comment: comment });
			props.setDiaries(props.diaries.concat(data)) ;
		} catch (error) {
			if (axios.isAxiosError(error)) {
				console.log(error.status);
				console.log(error.response);
				if (error.response){showError(error.response.data);}
			} else {
				console.error(error);
			}
		}

		setDate('');
		setVisibility('');
		setWeather('');
		setComment('');
	};

	const showError = (message: string) => {
		setErrorMessage(message);
		setTimeout(() => setErrorMessage(''), 5000)
	}

	return (
		<div>
			<h3>Add new entry</h3>
			{errorMessage !== '' && <p style={{ color: "#FF0000" }}>{errorMessage}</p>}
			<form onSubmit={addFormHandler}>
				date <input type="date" value={date} onChange={(event) => setDate(event.target.value)}></input><br/>
				visibility:
					great <input type="radio" name="visibility" value="great" onChange={(e) => setVisibility(e.target.value)} />
					good <input type="radio" name="visibility" value="good" onChange={(e) => setVisibility(e.target.value)} />
					ok <input type="radio" name="visibility" value="ok" onChange={(e) => setVisibility(e.target.value)} />
					poor <input type="radio" name="visibility" value="poor" onChange={(e) => setVisibility(e.target.value)} /><br/>
				weather:
					sunny <input type="radio" name="weather" value="sunny" onChange={(event) => setWeather(event.target.value)} />
					rainy <input type="radio" name="weather" value="rainy" onChange={(event) => setWeather(event.target.value)} />
					cloudy <input type="radio" name="weather" value="cloudy" onChange={(event) => setWeather(event.target.value)} />
					stormy <input type="radio" name="weather" value="stormy" onChange={(event) => setWeather(event.target.value)} />
					windy <input type="radio" name="weather" value="windy" onChange={(event) => setWeather(event.target.value)} /><br/>
				comment <input type="text" value={comment} onChange={(event) => setComment(event.target.value)}></input><br/>
				<button type="submit">add</button>
			</form>
		</div>
	);
}

export default DiaryForm;