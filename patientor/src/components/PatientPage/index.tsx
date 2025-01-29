import { Patient } from "../../types";
import { useParams } from "react-router-dom";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import patientService from '../../services/patients';
import { useEffect, useState } from "react";
import { Entry } from "../../types";

interface EntryProps {
    entries: Entry[]
};

const Entries = ({ entries }: EntryProps) => {
    return entries.map(entry => 
        <div key={ entry.id }>
            <p>{ entry.date } <i>{ entry.description }</i></p>
            { entry.diagnosisCodes ? <ul>{ entry.diagnosisCodes.map(code => <li key={ code }>{ code }</li>) }</ul> : null }
        </div>
    );
};

const PatientPage = () => {
    const { id } = useParams()
    const [patient, setPatient] = useState<Patient | null>(null)

    useEffect(() => {
        if (id) {
            const getPatient = async () => {
                const patient = await patientService.get(id);
                setPatient(patient);
            }
            getPatient();
        }

    }, [id]);
    
    if (!patient) { return null }
    let GenderIcon = undefined;
    switch(patient.gender) {
        case "male": {
            GenderIcon = MaleIcon
            break;
        }
        case "female": {
            GenderIcon = FemaleIcon
            break;
        }
        default: {
            GenderIcon = QuestionMarkIcon
            break;
        }
    }
    return (
        <div>
            <h3>{ patient.name } <GenderIcon></GenderIcon></h3>
            <span>ssn: { patient.ssn ? patient.ssn : '-' }</span><br/>
            <span>date of birth: { patient.dateOfBirth ? patient.dateOfBirth : '-' }</span><br/>
            <span>occupation: { patient.occupation }</span>
            <Entries entries = { patient.entries }/>
        </div>
    );
};

export default PatientPage;