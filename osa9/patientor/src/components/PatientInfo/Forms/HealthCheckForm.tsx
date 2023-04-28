import { Button, FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField } from "@mui/material";
import { Diagnosis, NewEntry } from "../../../types";
import { useState } from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from "moment";

interface FormProps {
    onSubmit: (entry: NewEntry) => void;
    setShow: React.Dispatch<React.SetStateAction<string>>;
    formStyle: object;
    diagnoses: Diagnosis[];
}

const HealthCheckForm = ({ onSubmit, setShow, formStyle, diagnoses }: FormProps) => {
    const [description, setDescription] = useState<string>('');
    const [date, setDate] = useState<Date | null>(null);
    const [specialist, setSpecialist] = useState<string>('');
    const [rating, setRating] = useState<string>('');
    const [codes, setCodes] = useState<string[]>([]);

    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const entry: NewEntry = {
            type: 'HealthCheck',
            description: description,
            date: moment(date).format('YYYY-MM-DD'),
            specialist: specialist,
            diagnosisCodes: codes,
            healthCheckRating: Number(rating),
        };

        onSubmit(entry);
        setShow('')
    };

    const handleChange = (event: SelectChangeEvent<typeof codes>) => {
        const {
          target: { value },
        } = event;
        setCodes(
          typeof value === 'string' ? value.split(',') : value,
        );
    };

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
            },
        },
    };

    return (
        <form onSubmit={submitHandler} style={formStyle}>
            <TextField
            label="Description"
            fullWidth 
            value={description}
            onChange={({ target }) => setDescription(target.value)}
            /><br/>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                label="Date"
                value={date}
                format="YYYY-MM-DD"
                onChange={(newDate) => setDate(newDate)}
                />
            </LocalizationProvider><br/>
            <TextField
            label="Specialist"
            value={specialist}
            onChange={({ target }) => setSpecialist(target.value)}
            /><br/>
            <FormControl sx={{ width: 150 }}>
                <InputLabel>Health Check Rating</InputLabel>
                <Select
                    value={rating}
                    label="Age"
                    onChange={({ target }) => setRating(target.value)}
                >
                    <MenuItem value={'0'}>Healthy</MenuItem>
                    <MenuItem value={'1'}>LowRisk</MenuItem>
                    <MenuItem value={'2'}>HighRisk</MenuItem>
                    <MenuItem value={'3'}>CriticalRisk</MenuItem>
                </Select>
            </FormControl><br/>
            <FormControl fullWidth>
                <InputLabel>Diagnose Codes</InputLabel>
                <Select
                    multiple
                    value={codes}
                    onChange={handleChange}
                    input={<OutlinedInput label="Diagnoses Codes" />}
                    MenuProps={MenuProps}
                >
                {diagnoses.map((diagnose) => (
                    <MenuItem
                        key={diagnose.code}
                        value={diagnose.code}
                        >
                        {diagnose.code}
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
            <br/>
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
