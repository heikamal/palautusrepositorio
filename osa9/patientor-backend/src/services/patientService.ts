import patientData from '../../data/patients';
import { DiscreetPatient, NewPatient, Patient } from '../types';
import { v1 as uuid } from 'uuid';


const getDiscreetPatients = (): DiscreetPatient[] => {
	return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation
	}));
};

const addPatient = ( patient: NewPatient ): Patient => {
	const newPatient = {
		id: uuid(),
		...patient
	}
	patientData.push(newPatient)
	return newPatient;
}

export default {
	getDiscreetPatients,
	addPatient
};