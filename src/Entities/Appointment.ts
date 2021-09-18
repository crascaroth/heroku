
///////////////////////////////////////  APPOINTMENT  ///////////////////////////////////////



export type InputAppointment = {
    fk_paciente: string,
    fk_medico: string,
    pagamento_total: number,
    data: Date,
    retorno: Date
}

export type InputAppointmentComplete = {

    id: string,
    fk_paciente: string,
    fk_medico: string,
    pagamento_total: number,
    data: Date,
    retorno: Date
}

///////////////////////////////////////  APPOINTMENT TYPE  ///////////////////////////////////////


export type InputAppointmentType = {
    nome: string,
    preco: number
}

export type InputAppointmentTypeComplete = {
    id: string,
    nome: string,
    preco: number
}


///////////////////////////////////////  APPOINTMENT RELATION  ///////////////////////////////////////

export type InputAppointmentRelationComplete = {
    fk_agendamento: string,
    fk_tipo_de_agendamento: string
}


