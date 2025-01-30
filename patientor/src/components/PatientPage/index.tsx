import { Patient, EntryFormValues, Entry } from "../../types";
import { useParams } from "react-router-dom";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import patientService from '../../services/patients';
import { useEffect, useState } from "react";
import { Diagnosis } from "../../types";
import EntryList from "../EntryList";
import { Button } from "@mui/material";
import AddEntryModal from "../AddEntryModal";
import axios from "axios";



interface PatientPageProps {
    diagnoses: Diagnosis[]
}

const PatientPage = ({ diagnoses } : PatientPageProps) => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [error, setError] = useState<string>();
    const [entries, setEntries] = useState<Entry[]>([]);

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const submitNewEntry = async (id: string, values: EntryFormValues) => {
        try {
        const entry = await patientService.createEntry(id, values);
        setEntries(entries.concat(entry));
        setModalOpen(false);
        } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
            if (e?.response?.data && typeof e?.response?.data === "string") {
                const message = e.response.data.replace('Something went wrong. Error: ', '');
                console.error(message);
                setError(message);
            } else {
                setError("Unrecognized axios error");
            }
        } else {
            console.error("Unknown error", e);
            setError("Unknown error");
        }
        }
    };

    const { id } = useParams();
    const [patient, setPatient] = useState<Patient | null>(null);

    useEffect(() => {
        if (id) {
            const getPatient = async () => {
                const patient = await patientService.get(id);
                setPatient(patient);
                setEntries(patient.entries)
            };
            getPatient();
        }

    }, [id]);
    
    if (!patient || !id) { return null; }
    let GenderIcon = undefined;
    switch(patient.gender) {
        case "male": {
            GenderIcon = MaleIcon;
            break;
        }
        case "female": {
            GenderIcon = FemaleIcon;
            break;
        }
        default: {
            GenderIcon = QuestionMarkIcon;
            break;
        }
    }
    return (
        <div>
            <h3>{ patient.name } <GenderIcon></GenderIcon></h3>
            <span>ssn: { patient.ssn ? patient.ssn : '-' }</span><br/>
            <span>date of birth: { patient.dateOfBirth ? patient.dateOfBirth : '-' }</span><br/>
            <span>occupation: { patient.occupation }</span>
            <EntryList entries = { entries } diagnoses={ diagnoses }/>

            <AddEntryModal
                id={id}
                diagnoses={diagnoses}
                modalOpen={modalOpen}
                onSubmit={submitNewEntry}
                error={error}
                onClose={closeModal}
            />
            <Button variant="contained" onClick={() => openModal()}>
                Add New Entry
            </Button>
        </div>
    );
};

export default PatientPage;