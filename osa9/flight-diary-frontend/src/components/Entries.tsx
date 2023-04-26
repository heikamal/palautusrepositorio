import { Diary } from "../types";

interface EntriesProps {
	entries: Diary[]
}

const Entries = (props: EntriesProps) => {
	const entries = props.entries;
	return (
		<div>
			<h2>Diary entries</h2>
			<ul style={{ listStyle: 'none', padding: 0 }}>
				{entries.map(diary => <li key={diary.id}>
				<h3>{diary.date}</h3>
				visibility: {diary.visibility}<br/>
				weather: {diary.weather}<br/>
				<i>{diary.comment}</i>
				</li>)}
			</ul>
		</div>
	);
}

export default Entries;