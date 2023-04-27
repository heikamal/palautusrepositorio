import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { Discharge, NewEntry, SickLeave } from "../../types"

interface Props {
    onSubmit: (entry: NewEntry) => void;
}

const AddEntryForm = ({ onSubmit }: Props) => {

    const [showHealthCheckForm, setShowHealthCheckForm] = useState<boolean>(false);
	const [showHospitalForm, setShowHospitalForm] = useState<boolean>(false);
	const [showOccupationalForm, setShowOccupationalForm] = useState<boolean>(false);

    if (!showHealthCheckForm && !showHospitalForm && !showOccupationalForm){
        return (
            <div>
                <Button
                    color="secondary"
                    variant="contained"
                    style={{ float: "left" }}
                    type="button"
                    onClick={() => setShowHealthCheckForm(true)}
                >Health Check Entry</Button><br/><br/>
                <Button
                    color="secondary"
                    variant="contained"
                    style={{ float: "left" }}
                    type="button"
                    onClick={() => setShowHospitalForm(true)}
                >Hospital Entry</Button><br/><br/>
                <Button
                    color="secondary"
                    variant="contained"
                    style={{ float: "left" }}
                    type="button"
                    onClick={() => setShowOccupationalForm(true)}
                >Occupational Health Entry</Button><br/>
            </div>
        )
    }

    if (showHealthCheckForm){
        return (
            <HealthCheckForm 
            onSubmit={onSubmit}
            setShow={setShowHealthCheckForm}/>
        )
    }

    if (showHospitalForm) {
        return (
            <HospitalForm
            onSubmit={onSubmit}
            setShow={setShowHospitalForm}
            />
        )
    }

    if (showOccupationalForm) {
        return (
            <OccupationalForm
            onSubmit={onSubmit}
            setShow={setShowOccupationalForm}
            />
        )
    }

    return (
        <p>
            nyt meni jokin pieleen
        </p>
    )
}

interface HealthCheckProps {
    onSubmit: (entry: NewEntry) => void;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
}
const HealthCheckForm = ({ onSubmit, setShow }: HealthCheckProps) => {
    const [description, setDescription] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [specialist, setSpecialist] = useState<string>('');
    const [rating, setRating] = useState<string>('');
    const [codes, setCodes] = useState<string>('');

    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const entry: NewEntry = {
            type: 'HealthCheck',
            description: description,
            date: date,
            specialist: specialist,
            diagnosisCodes: codes.split(', '),
            healthCheckRating: Number(rating),
        };

        onSubmit(entry);
        setShow(false)
    }

    return (
        <form onSubmit={submitHandler}>
            <TextField
            label="Description"
            fullWidth 
            value={description}
            onChange={({ target }) => setDescription(target.value)}
            /><br/>
            <TextField
            label="Date"
            value={date}
            onChange={({ target }) => setDate(target.value)}
            /><br/>
            <TextField
            label="Specialist"
            value={specialist}
            onChange={({ target }) => setSpecialist(target.value)}
            /><br/>
            <TextField
            label="HealthCheck Rating"
            value={rating}
            onChange={({ target }) => setRating(target.value)}
            /><br/>
            <TextField
            label="Diagnosis Codes"
            value={codes}
            onChange={({target}) => setCodes(target.value)}
            /><br/>
            <Button
                    color="secondary"
                    variant="contained"
                    style={{ float: "left" }}
                    type="submit"
            >Submit</Button>
        </form>
    )
}

interface HospitalProps {
    onSubmit: (entry: NewEntry) => void;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const HospitalForm = ({ onSubmit, setShow }: HospitalProps) => {
    const [description, setDescription] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [specialist, setSpecialist] = useState<string>('');
    const [release, setRelease] = useState<string>('');
    const [criteria, setCriteria] = useState<string>('');
    const [codes, setCodes] = useState<string>('');

    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const discharge: Discharge = {
            date: release,
            criteria: criteria,
        } 
        const entry: NewEntry = {
            type: 'Hospital',
            description: description,
            date: date,
            specialist: specialist,
            diagnosisCodes: codes.split(', '),
            discharge: discharge,
        }
        onSubmit(entry);
        setShow(false)
    }

    return (
        <form onSubmit={submitHandler}>
            <TextField
            label="Description"
            fullWidth 
            value={description}
            onChange={({ target }) => setDescription(target.value)}
            /><br/>
            <TextField
            label="Date"
            value={date}
            onChange={({ target }) => setDate(target.value)}
            /><br/>
            <TextField
            label="Specialist"
            value={specialist}
            onChange={({ target }) => setSpecialist(target.value)}
            /><br/>
            <TextField
            label="Diagnosis Codes"
            value={codes}
            onChange={({target}) => setCodes(target.value)}
            /><br/>
            <h4>Discharge:</h4>
            <TextField
            label="Date"
            value={release}
            onChange={({ target }) => setRelease(target.value)}
            /><br/>
            <TextField
            label="Criteria"
            value={criteria}
            onChange={({ target }) => setCriteria(target.value)}
            /><br/>
            <Button
                    color="secondary"
                    variant="contained"
                    style={{ float: "left" }}
                    type="submit"
            >Submit</Button>
        </form>
    )
}

interface OccupationalProps {
    onSubmit: (entry: NewEntry) => void;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const OccupationalForm = ({ onSubmit, setShow }: OccupationalProps) => {
    const [description, setDescription] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [specialist, setSpecialist] = useState<string>('');
    const [startD, setStartD] = useState<string>('');
    const [endD, setEndD] = useState<string>('');
    const [employer, setEmployer] = useState<string>('');
    const [codes, setCodes] = useState<string>('');

    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const sickLeave: SickLeave = {
            startDate: startD,
            endDate: endD,
        }
        const entry: NewEntry = {
            type: 'OccupationalHealthcare',
            description: description,
            date: date,
            specialist: specialist,
            diagnosisCodes: codes.split(', '),
            employerName: employer,
            sickLeave: sickLeave,
        }
        onSubmit(entry);
        setShow(false)
    }

    return (
        <form onSubmit={submitHandler}>
            <TextField
            label="Description"
            fullWidth 
            value={description}
            onChange={({ target }) => setDescription(target.value)}
            /><br/>
            <TextField
            label="Date"
            value={date}
            onChange={({ target }) => setDate(target.value)}
            /><br/>
            <TextField
            label="Specialist"
            value={specialist}
            onChange={({ target }) => setSpecialist(target.value)}
            /><br/>
            <TextField
            label="Diagnosis Codes"
            value={codes}
            onChange={({target}) => setCodes(target.value)}
            /><br/>
            <TextField
            label="Employer Name"
            value={employer}
            onChange={({target}) => setEmployer(target.value)}
            /><br/>
            <h4>Sick leave:</h4>
            <TextField
            label="Start Date"
            value={startD}
            onChange={({ target }) => setStartD(target.value)}
            /><br/>
            <TextField
            label="End Date"
            value={endD}
            onChange={({ target }) => setEndD(target.value)}
            /><br/>
            <Button
                    color="secondary"
                    variant="contained"
                    style={{ float: "left" }}
                    type="submit"
            >Submit</Button>
        </form>
    )
}
export default AddEntryForm;