import { Diagnosis, Discharge, Gender, HealthCheckRating, NewBaseEntry, NewEntry, NewPatient, SickLeave } from "./types";

const toNewPatient = (object: unknown): NewPatient => {
    console.log(object);
    if ( !object || typeof object !== 'object' ) {
        throw new Error('Incorrect or missing data');
    }
    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
        const newPatient: NewPatient = {
            name: parseName(object.name),
            dateOfBirth: parseDOB(object.dateOfBirth),
            ssn: parseSsn(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation),
            entries: [ ],
        };
    
        return newPatient;
    }

    throw new Error('Incorrect data: some fields are missing');
};

export const toNewEntry = (object: unknown): NewEntry => {
    console.log(object);
    if ( !object || typeof object !== 'object' ) {
        throw new Error('Incorrect or missing data');
    }
    if ('type' in object && 'description' in object && 'date' in object && 'specialist' in object && 'diagnosisCodes' in object){
        const baseEntry: NewBaseEntry = {
            description: parseDescription(object.description),
            date: parseDate(object.date),
            specialist: parseName(object.specialist),
            diagnosisCodes: parseDiagnosisCodes(object),
        }
        

        const type: string = parseType(object.type);

        switch (type) {
            case "HealthCheck":
                return toNewHealthCheckEntry(baseEntry, object);
            case "Hospital":
                return toNewHospitalEntry(baseEntry, object);
            case "OccupationalHealthcare":
                return toNewOccupationalHealthcareEntry(baseEntry, object);
            default:
                throw new Error('Invalid type!');
        }
    }
	throw new Error('Missing type');
};

const toNewHealthCheckEntry = (baseEntry: NewBaseEntry, object: object): NewEntry => {
    if ('healthCheckRating' in object) {
        const newHealthCheckEntry: NewEntry = {
            type: 'HealthCheck',
            healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
            ...baseEntry
        };
        return newHealthCheckEntry;
    }
    throw new Error('Incorrect data: some fields are missing');
};
const toNewHospitalEntry = (baseEntry: NewBaseEntry, object: object): NewEntry => {
    if ('discharge' in object) {
        const newHospitalEntry: NewEntry = {
            type: 'Hospital',
            discharge: parseDischarge(object.discharge),
            ...baseEntry,
        };
        return newHospitalEntry;
    }
    throw new Error('Incorrect data: some fields are missing');
};
const toNewOccupationalHealthcareEntry = (baseEntry: NewBaseEntry, object: object): NewEntry => {
    if ('employerName' in object && 'sickLeave' in object) {
        const newOccupationalHealthcareEntry: NewEntry = {
            type: 'OccupationalHealthcare',
            employerName: parseName(object.employerName),
            sickLeave: parseSickLeave(object.sickLeave),
            ...baseEntry,
        };
        return newOccupationalHealthcareEntry;
    }
    throw new Error('Incorrect data: some fields are missing');
};

const parseDescription = (description: unknown): string => {
	if (!isString(description)) {
        throw new Error('Incorrect description');
    }
    return description;
};

const parseDate = (date: unknown): string => {
    if (!isString(date) || !isDate(date)) {
        throw new Error('Incorrect date');
    }
    return date;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {

    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
      return [] as Array<Diagnosis['code']>;
    }
  
    return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const parseHealthCheckRating = (object: unknown): number => {
    if (!isNumber(object) || !isHealthCheckRating(object)){
        throw new Error('Incorrect healthcheck rating');
    }
    return object;
};


const parseDischarge = (object: unknown): Discharge => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect discharge');
    }

    if ('date' in object && 'criteria' in object) {
        const newDischarge: Discharge = {
            date: parseDate(object.date),
            criteria: parseCriteria(object.criteria),
        };
        return newDischarge;
    }

    throw new Error('Incorrect criteria: some fields are missing');
};

const parseSickLeave = (object: unknown): SickLeave => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect sick leave');
    }

    if ('startDate' in object && 'endDate' in object) {
        const newSickLeave: SickLeave = {
            startDate: parseDate(object.startDate),
            endDate: parseDate(object.endDate),
        };
        return newSickLeave;
    }

    throw new Error('Incorrect sick leave: some fields are missing');
};

const parseCriteria = (criteria: unknown): string => {
    if (!isString(criteria)){
        throw new Error('Incorrect criteria');
    }
    return criteria;
};

const parseType = (type: unknown): string => {
    if (!isString(type)) {
        throw new Error('Incorrect type');
    }
    return type;
};

const parseName = (name: unknown): string => {
    if (!isString(name)) {
        throw new Error('Incorrect name');
    }
    return name;
};

const parseDOB = (dob: unknown): string => {
    if (!isString(dob) || !isDate(dob)) {
        throw new Error('Incorrect date of birth');
    }
    return dob;
};

const parseSsn = (ssn: unknown): string => {
    if (!isString(ssn)) {
        throw new Error('Incorrect ssn');
    }
    return ssn;
};

const parseGender = (gender: unknown): string => {
    if (!isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect gender');
    }
    return gender;
};

const parseOccupation = (occupation: unknown): string => {
    if (!isString(occupation)) {
        throw new Error('Incorrect occupation');
    }
    return occupation;
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(param);
};

const isNumber = (numeral: unknown): numeral is number => {
    return typeof numeral === 'number' || numeral instanceof Number;
};

const isHealthCheckRating = (rating: unknown): rating is HealthCheckRating => {
    return Object.values(HealthCheckRating).map(v => v).includes(Number(rating));
};

export default { toNewPatient, toNewEntry };