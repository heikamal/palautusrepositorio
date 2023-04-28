import { Button, FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField } from "@mui/material";
import { Diagnosis, Discharge, NewEntry } from "../../../types";
import { useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import moment from "moment";

interface FormProps {
    onSubmit: (entry: NewEntry) => void;
    setShow: React.Dispatch<React.SetStateAction<string>>;
    formStyle: object;
    diagnoses: Diagnosis[];
}

const HospitalForm = ({ onSubmit, setShow, formStyle, diagnoses }: FormProps) => {
    const [description, setDescription] = useState<string>('');
    const [date, setDate] = useState<Date | null>(null);
    const [specialist, setSpecialist] = useState<string>('');
    const [release, setRelease] = useState<Date | null>(null);
    const [criteria, setCriteria] = useState<string>('');
    const [codes, setCodes] = useState<string[]>([]);

    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const discharge: Discharge = {
            date: moment(release).format('YYYY-MM-DD'),
            criteria: criteria,
        } 
        const entry: NewEntry = {
            type: 'Hospital',
            description: description,
            date: moment(date).format('YYYY-MM-DD'),
            specialist: specialist,
            diagnosisCodes: codes,
            discharge: discharge,
        }
        onSubmit(entry);
        setShow('')
    }

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
            </FormControl><br/>
            <h4>Discharge:</h4>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                label="Discharge Date"
                value={date}
                format="YYYY-MM-DD"
                onChange={(newDate) => setRelease(newDate)}
                />
            </LocalizationProvider><br/>
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