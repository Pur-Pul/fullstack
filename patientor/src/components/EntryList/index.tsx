import { Entry, HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry, Diagnosis } from "../../types";
import WorkIcon from '@mui/icons-material/Work';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MoodIcon from '@mui/icons-material/Mood';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

interface EntryListProps {
    entries: Entry[]
    diagnoses: Diagnosis[]
}
interface DiagnosisListProps {
    codes : Array<Diagnosis['code']>
    diagnoses: Diagnosis[]
}
const DiagnosisList = ({ codes, diagnoses } : DiagnosisListProps) => {
    return (
        <div>
            <h4>Diagnoses</h4>
            <ul>
                {codes.map((code) => { 
                    const diagnosis = diagnoses.find(diagnosis => diagnosis.code == code);
                    return (
                        <li key={ code }>
                            { code } { diagnosis ? diagnosis.name : "unknown diagnosis" }
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

interface BaseEntryDetailsProps {
    entry: Entry
    diagnoses: Diagnosis[]
}

const BaseEntryDetails = ({ entry, diagnoses } : BaseEntryDetailsProps) => {
    return (
        <div key={ entry.id }>
            <span>{ entry.date } <i>{ entry.description }</i></span>
            { entry.diagnosisCodes ? <DiagnosisList codes={ entry.diagnosisCodes } diagnoses={ diagnoses }/>: null }
        </div>
    );
};

interface HospitalEntryDetailsProps {
    entry: HospitalEntry
    diagnoses: Diagnosis[]
}

const HospitalEntryDetails = ({ entry, diagnoses } : HospitalEntryDetailsProps) => {
    return (
        <div>
            <LocalHospitalIcon />
            <BaseEntryDetails entry ={ entry } diagnoses={ diagnoses }/>
            Discharge { entry.discharge.date }: { entry.discharge.criteria }
        </div>
    );
};

interface OccupationalHealthcareEntryDetailsProps {
    entry: OccupationalHealthcareEntry
    diagnoses: Diagnosis[]
}

const OccupationalHealthcareEntryDetails = ({ entry, diagnoses } : OccupationalHealthcareEntryDetailsProps) => {
    return (
        <div>
            <WorkIcon />
            <BaseEntryDetails entry ={ entry } diagnoses={ diagnoses }/>
            Employer: { entry.employerName }<br/>
            { entry.sickLeave ? <span>Sick leave: { entry.sickLeave.startDate } - { entry.sickLeave.endDate }</span> : null }
        </div>
    );
};

interface HealthCheckEntryDetailsProps {
    entry: HealthCheckEntry
    diagnoses: Diagnosis[]
}

const HealthCheckEntryDetails =({ entry, diagnoses } : HealthCheckEntryDetailsProps) => {
    let StatusIcon = undefined;
    switch (entry.healthCheckRating) {
        case 0:
            StatusIcon = MoodIcon;
            break;
        case 1:
            StatusIcon = PriorityHighIcon;
            break;
        case 2:
            StatusIcon = () => {return (<span><PriorityHighIcon/><PriorityHighIcon/></span>);};
            break;
        case 3:
            StatusIcon = () => {return (<span><PriorityHighIcon/><PriorityHighIcon/><PriorityHighIcon/></span>);};
            break;
        default:
            break;
    }
    return (
        <div>
            <CheckCircleIcon />
            <BaseEntryDetails entry ={ entry } diagnoses={ diagnoses }/>
            {StatusIcon ? <StatusIcon /> : null}
        </div>
    );
};

const EntryList = ({ entries, diagnoses }: EntryListProps) => {
    return (
        <div>
            <h3>Entries</h3>
            {
                entries.map(entry =>
                    {
                        switch (entry.type) {
                            case "Hospital":
                                return <fieldset key={ entry.id } ><HospitalEntryDetails entry= { entry } diagnoses={ diagnoses }/></fieldset>;
                            case "OccupationalHealthcare":
                                return <fieldset key={ entry.id }><OccupationalHealthcareEntryDetails entry= { entry } diagnoses={ diagnoses }/></fieldset>;
                            case "HealthCheck":
                                return <fieldset key={ entry.id }><HealthCheckEntryDetails entry= { entry } diagnoses={ diagnoses }/></fieldset>;
                            default:
                                return;
                        }
                    }
                )
            }
        </div>
    );
};

export default EntryList;