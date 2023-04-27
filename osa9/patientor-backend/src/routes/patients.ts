import express from 'express';
import patientService from '../services/patientService';
import utilities from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
	res.send(patientService.getDiscreetPatients());
});

router.post('/', (req, res) => {
	try {
		const newPatient = utilities.toNewPatient(req.body);
		const addedPatient = patientService.addPatient(newPatient);
		res.json(addedPatient);
	} catch (error: unknown) {
		let errorMessage = 'Something went wrong';
		if (error instanceof Error) {
			errorMessage += ' Error: ' + error.message;
		}
		res.status(400).send(errorMessage);
	}
});

router.get('/:id', (req, res) => {
	const id = req.params.id;
	const patients = patientService.getAllPatiens();
	res.send(patients.find(patient => patient.id.toString() === id.toString()));
});

router.post('/:id/entries', (req, res) => {
	const id = req.params.id;
	try {
		const newEntry = utilities.toNewEntry(req.body);
		const addedEntry = patientService.updatePatientEntry(id, newEntry);
		res.json(addedEntry);
	} catch (error: unknown) {
		let errorMessage = 'Something went wrong';
		if (error instanceof Error) {
			errorMessage += ' Error ' + error.message;
		}
		res.status(400).send(errorMessage);
	}
});

export default router;