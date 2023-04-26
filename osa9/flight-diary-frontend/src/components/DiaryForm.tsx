import { FormEvent, useState } from "react";
import { Diary } from "../types";
import { createDiary } from "../services/diaryService";

interface DiaryFormProps {
	diaries: Diary[],
	setDiaries: React.Dispatch<React.SetStateAction<Diary[]>>
}

const DiaryForm = (props: DiaryFormProps) => {
	const [date, setDate] = useState('');
	const [visibility, setVisibility] = useState('');
	const [weather, setWeather] = useState('');
	const [comment, setComment] = useState('');

	const addFormHandler = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log('merkintä lisätty!');
		createDiary({ date: date, visibility: visibility, weather: weather, comment: comment }).then(data => {
			props.setDiaries(props.diaries.concat(data)) 
		});

		setDate('');
		setVisibility('');
		setWeather('');
		setComment('');
	};

	return (
		<div>
			<h3>Add new entry</h3>
			<form onSubmit={addFormHandler}>
				date <input type="text" value={date} onChange={(event) => setDate(event.currentTarget.value)}></input><br/>
				visibility <input type="text" value={visibility} onChange={(event) => setVisibility(event.currentTarget.value)}></input><br/>
				weather <input type="text" value={weather} onChange={(event) => setWeather(event.currentTarget.value)}></input><br/>
				comment <input type="text" value={comment} onChange={(event) => setComment(event.currentTarget.value)}></input><br/>
				<button type="submit">add</button>
			</form>
		</div>
	);
}

export default DiaryForm;