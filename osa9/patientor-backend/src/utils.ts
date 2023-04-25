import { Gender, NewPatient } from "./types";

const toNewPatient = (object: unknown): NewPatient => {
    console.log(object)
    if ( !object || typeof object !== 'object' ) {
        throw new Error('Incorrect or missing data');
    }
    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
        const newPatient: NewPatient = {
            name: parseName(object.name),
            dateOfBirth: parseDOB(object.dateOfBirth),
            ssn: parseSsn(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation)
        };
    
        return newPatient
    }

    throw new Error('Incorrect data: some fields are missing');
}

const parseName = (name: unknown): string => {
    if (!isString(name)) {
        throw new Error('Incorrect name');
    }
    return name;
}

const parseDOB = (dob: unknown): string => {
    if (!isString(dob) || !isDate(dob)) {
        throw new Error('Incorrect date of birth');
    }
    return dob;
}

const parseSsn = (ssn: unknown): string => {
    if (!isString(ssn)) {
        throw new Error('Incorrect ssn');
    }
    return ssn;
}

// TODO: enum
const parseGender = (gender: unknown): string => {
    if (!isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect gender');
    }
    return gender;
}

const parseOccupation = (occupation: unknown): string => {
    if (!isString(occupation)) {
        throw new Error('Incorrect occupation');
    }
    return occupation;
}

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
}

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
}

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(param);
}

export default toNewPatient;