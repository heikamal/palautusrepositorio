import { Button, TextField } from "@mui/material";
import { NewEntry } from "../../../types";
import { useState } from "react";

interface FormProps {
    onSubmit: (entry: NewEntry) => void;
    setShow: React.Dispatch<React.SetStateAction<string>>;
    formStyle: object;
}

const HealthCheckForm = ({ onSubmit, setShow, formStyle }: FormProps) => {
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
            <Button
                color="secondary"
                variant="contained"
                style={{ float: "left", marginLeft: 10 }}
                onClick={() => setShow('')}
            >Cancel</Button>
        </form>
    )
}

export default HealthCheckForm;
