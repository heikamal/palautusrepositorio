import patientData from '../../data/patients';
import { DiscreetPatient } from '../types';


const getDiscreetPatients = (): DiscreetPatient[] => {
	return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation
	}));
};

export default {
	getDiscreetPatients
};