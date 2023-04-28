import { Button, TextField } from "@mui/material";
import { Discharge, NewEntry } from "../../../types";
import { useState } from "react";

interface FormProps {
    onSubmit: (entry: NewEntry) => void;
    setShow: React.Dispatch<React.SetStateAction<string>>;
    formStyle: object;
}

const HospitalForm = ({ onSubmit, setShow, formStyle }: FormProps) => {
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
            <Button
                color="secondary"
                variant="contained"
                style={{ float: "left", marginLeft: 10 }}
                onClick={() => setShow('')}
            >Cancel</Button>
        </form>
    )
}

export default HospitalForm;