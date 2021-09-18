///////////////////////////////////////  REPORT  ///////////////////////////////////////

export type InputReport = {
    fk_medico: string,
    fk_paciente: string,
    data: Date,
    atualizacao: Date,
    descricao: string
}

export type InputReportComplete = {
    id: string,
    fk_medico: string,
    fk_paciente: string,
    data: Date,
    atualizacao: Date,
    descricao: string
}

///////////////////////////////////////  REPORT MODEL  ///////////////////////////////////////

export type InputReportModel = {
    fk_especialidade: string,
    nome: string
}

export type InputReportModelComplete = {
    id: string,
    fk_especialidade: string,
    nome: string
}

///////////////////////////////////////  REPORT RELATION  ///////////////////////////////////////


export type InputReportRelationComplete = {
    fk_laudo: string,
    fk_modelo: string
}