import { Button, TextField } from "@mui/material";
import { NewEntry, SickLeave } from "../../../types";
import { useState } from "react";

interface FormProps {
    onSubmit: (entry: NewEntry) => void;
    setShow: React.Dispatch<React.SetStateAction<string>>;
    formStyle: object;
}

const OccupationalForm = ({ onSubmit, setShow, formStyle }: FormProps) => {
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
        };
        
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
        setShow('')
    }

    return (
        <form onSubmit={submitHandler} style={formStyle}>
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
            <Button
                color="secondary"
                variant="contained"
                style={{ float: "left", marginLeft: 10 }}
                onClick={() => setShow('')}
            >Cancel</Button>
        </form>
    )
}

export default OccupationalForm;