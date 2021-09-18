export type AuthenticationData = {
    id: string,
    login: string
}

///////////////////////////////////////  MEDIC  ///////////////////////////////////////

export type InputUserMedic = {
    login: string,
    password: string,
    fk_especialidade: string
}

export type UserMedicComplete = {
    id: string,
    login: string,
    password: string,
    fk_especialidade: string
}



///////////////////////////////////////  PATIENT  ///////////////////////////////////////

export type InputUserPatient = {
    login: string,
    password: string,
}

export type UserPatientComplete = {
    id: string,
    login: string,
    password: string,
}

///////////////////////////////////////  SPECIALTY  ///////////////////////////////////////

export type InputUserSpecialty = {
    specialty: string
}

export type UserSpecialtyComplete = {
    id: string,
    specialty: string
}

///////////////////////////////////////  LOGIN  ///////////////////////////////////////

export type InputUserLogin = {
    login: string,
    password: string,
    userType: string
}

export type userDatabaseInfo = {
    id: string,
    login: string,
    password: string
}