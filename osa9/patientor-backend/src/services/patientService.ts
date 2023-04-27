import patientData from '../../data/patients-full';
import { DiscreetPatient, Entry, NewEntry, NewPatient, Patient } from '../types';
import { v1 as uuid } from 'uuid';


const getDiscreetPatients = (): DiscreetPatient[] => {
	return patientData.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation,
		entries
	}));
};

const getAllPatiens = (): Patient[] => {
	return patientData.map(({ id, name, dateOfBirth, ssn, gender, occupation, entries }) => ({
		id,
		name,
		dateOfBirth,
		ssn,
		gender,
		occupation,
		entries
	}));
};

const addPatient = ( patient: NewPatient ): Patient => {
	const newPatient = {
		id: uuid(),
		...patient
	};
	patientData.push(newPatient);
	return newPatient;
};

const updatePatientEntry = ( id: string, entry: NewEntry ): Patient => {
	const newEntry: Entry = {
		id: uuid(),
		...entry
	};
	const patientIndex = patientData.findIndex(p => p.id.toString() === id.toString());
	if (patientIndex >= 0){
		const patient = patientData[patientIndex];
		const updatedPatient: Patient = {...patient, entries: patient.entries.concat(newEntry)};
		patientData[patientIndex] = updatedPatient;
		
		return patientData[patientIndex];
	}
	throw new Error('Something went wrong updating the patient');
}

export default {
	getDiscreetPatients,
	addPatient,
	getAllPatiens,
	updatePatientEntry
};