import { Patient } from "../../types";
import { useParams } from "react-router-dom";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import patientService from '../../services/patients';
import { useEffect, useState } from "react";



const PatientPage = () => {
    const { id } = useParams()
    const [patient, setPatient] = useState<Patient | null>(null)

    useEffect(() => {
        if (id) {
            const getPatient = async () => {
                const patient = await patientService.get(id)
                setPatient(patient)
            }
            getPatient()
        }

    }, [id]);
    
    if (!patient) { return null }
    let GenderIcon = undefined
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
        </div>
    )
};

export default PatientPage;