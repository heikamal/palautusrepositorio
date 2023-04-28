import { Button } from "@mui/material";
import { useState } from "react";
import { Diagnosis, NewEntry } from "../../types"
import HealthCheckForm from "./Forms/HealthCheckForm";
import HospitalForm from "./Forms/HospitalForm";
import OccupationalForm from "./Forms/OccupationalForm";
import diagnoses from "../../services/diagnoses";

interface Props {
    onSubmit: (entry: NewEntry) => void;
    diagnoses: Diagnosis[];
}

const AddEntryForm = ({ onSubmit, diagnoses }: Props) => {
    const [formToShow, setFormToShow] = useState<string>('');
    const formStyle = {
        marginBottom: 45, 
        padding: 10, 
        border: "2px dotted #000000"
    };

    switch (formToShow) {
        case 'HealthCheck':
            return (
                <HealthCheckForm 
                onSubmit={onSubmit}
                setShow={setFormToShow}
                formStyle={formStyle}
                diagnoses={diagnoses}
                />
            );
        case 'Hospital':
            return (
                <HospitalForm
                onSubmit={onSubmit}
                setShow={setFormToShow}
                formStyle={formStyle}
                diagnoses={diagnoses}
                />
            );
        case 'Occupational':
            return (
                <OccupationalForm
                onSubmit={onSubmit}
                setShow={setFormToShow}
                formStyle={formStyle}
                diagnoses={diagnoses}
                />
            );
    
        default:
            return (
                <div>
                    <Button
                        color="secondary"
                        variant="contained"
                        style={{ float: "left" }}
                        type="button"
                        onClick={() => setFormToShow('HealthCheck')}
                    >Health Check Entry</Button><br/><br/>
                    <Button
                        color="secondary"
                        variant="contained"
                        style={{ float: "left" }}
                        type="button"
                        onClick={() => setFormToShow('Hospital')}
                    >Hospital Entry</Button><br/><br/>
                    <Button
                        color="secondary"
                        variant="contained"
                        style={{ float: "left" }}
                        type="button"
                        onClick={() => setFormToShow('Occupational')}
                    >Occupational Health Entry</Button><br/>
                </div>
            );
    }
}

export default AddEntryForm;