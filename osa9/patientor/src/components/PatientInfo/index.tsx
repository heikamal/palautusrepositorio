import { useParams } from 'react-router-dom';
import { Diagnosis, Entry, Gender, HealthCheckEntry, HealthCheckRating, HospitalEntry, NewEntry, OccupationalHealthcareEntry, Patient } from '../../types'
import React, { useEffect, useState } from 'react';
import patientService from '../../services/patients'

import BedIcon from '@mui/icons-material/Bed';
import WorkIcon from '@mui/icons-material/Work';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FavoriteIcon from '@mui/icons-material/Favorite';

import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import StarIcon from '@mui/icons-material/Star';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import AddEntryForm from './AddEntryForm';

interface Props {
	diagnoses: Diagnosis[]
}

const PatientInfo = ({ diagnoses }: Props) => {
	const [patient, setPatient] = useState<Patient>()
	

	const id = String(useParams().id);

	useEffect(() => {
		const fetchPatientList = async () => {
		  const patient = await patientService.getPatient(id);
		  setPatient(patient);
		};
		void fetchPatientList();
	}, [id]);

	if (!patient) {return <p>loading...</p>}

	const submitNewEntry = async (entry: NewEntry) => {
		console.log(entry);
		try {
			const patient = await patientService.addEntry(id, entry);
			console.log(patient);
			console.log('lisätty!');
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div>
			<h2>{patient.name} {genderIcon(patient.gender)}</h2>
			<p>ssn: {patient.ssn}<br/>
			occupation: {patient.occupation}</p>

			<AddEntryForm
			onSubmit={submitNewEntry}
			/><br/>

			<br/><h3>entries</h3>
			<ul style={{ listStyle: "none", padding: 0 }}>
				{patient.entries?.map(entry => <EntryDetails key={entry.id} entry={entry}/>)}
			</ul>

		</div>
	)
}

const genderIcon = (gender: Gender) => {
	switch(gender) {
		case "male":
			return <MaleIcon />
		case "female":
			return <FemaleIcon />
		case "other":
			return <StarIcon />
		default:
			return <DoNotDisturbIcon />
	}
}

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
	switch (entry.type) {
		case 'Hospital':
			return <li style={{ padding: 5, border: "1px solid black" }}><Hospital entry={entry}/></li>
		case 'OccupationalHealthcare':
			return <li style={{ padding: 5, border: "1px solid black" }}><OccupationalHealthcare entry={entry}/></li>
		case 'HealthCheck':
			return <li style={{ padding: 5, border: "1px solid black" }}><HealthCheck entry={entry} /></li>
	}
}

const Hospital: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
	return (
		<div>
			{entry.date} <BedIcon/><br/>
			<i>{entry.description}</i><br/>
			diagnose by {entry.specialist}
			{entry.discharge && <p>discharge: {entry.discharge.date}<br/>
			{entry.discharge.criteria}</p>}
		</div>
	)
}

const OccupationalHealthcare: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {
	return (
		<div>
			{entry.date} <WorkIcon /> <i>{entry.employerName}</i><br/>
			<i>{entry.description}</i><br/>
			diagnose by {entry.specialist}
		</div>
	)
}

const HealthCheck: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
	return (
		<div>
			{entry.date} <MedicalServicesIcon /><br/>
			<i>{entry.description}</i><br/>
			<FavoriteIcon style={{ color: decideColour(entry.healthCheckRating) }}/><br/>
			diagnose by {entry.specialist}
		</div>
	)
}

const decideColour = (rating: HealthCheckRating): string => {
	switch (rating) {
		case 0:
			return "green";
		case 1:
			return "yellow";
		case 2:
			return "red";
		case 3:
			return "black";
		default:
			return "white";
	}
}

export default PatientInfo;