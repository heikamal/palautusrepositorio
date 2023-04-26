import { useParams } from 'react-router-dom';
import { Diagnosis, Patient } from '../../types'
import { useEffect, useState } from 'react';
import patientService from '../../services/patients'

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

	return (
		<div>
			<h2>{patient.name}</h2>
			<p>gender: {patient.gender}<br/>
			ssn: {patient.ssn}<br/>
			occupation: {patient.occupation}</p>

			<h3>entries</h3>
			<ul style={{ listStyle: "none", padding: 0 }}>
				{patient.entries?.map(entry => <li key={entry.id}>
					{entry.date} {entry.description} 
					<ul>{entry.diagnosisCodes?.map(code => <li key={entry.diagnosisCodes?.indexOf(code)}>
						{code} {diagnoses.find(d => d.code === code)?.name}</li>)}
					</ul>
				</li>)}
			</ul>

		</div>
	)
}

export default PatientInfo;