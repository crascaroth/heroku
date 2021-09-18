import { ReportDatabase } from "../Data/ReportDatabase";
import { InputReport, InputReportComplete, InputReportModel, InputReportModelComplete, InputReportRelationComplete } from "../Entities/Report";
import { InvalidInputError } from "../Error/InvalidInputError";
import { IdGenerator } from "../Services/IdGenerator";

export class ReportBusiness {
    constructor(
        private reportDatabase: ReportDatabase,
        private idGenerator: IdGenerator,        
    ){}

    async createReport(report: InputReport){
        if(
            !report.fk_medico ||
            !report.fk_paciente ||
            !report.data ||
            !report.atualizacao ||
            !report.descricao            
        ){
            throw new InvalidInputError("Please insert all information")
        }

        const id = this.idGenerator.generateId()

        const input: InputReportComplete = {
            id,
            fk_medico: report.fk_medico, 
            fk_paciente: report.fk_paciente,
            data: report.data,
            atualizacao: report.atualizacao, 
            descricao: report.descricao  
        }

        await this.reportDatabase.createReport(input)

    }

    async createReportModel(reportModel: InputReportModel){
        if(
            !reportModel.fk_especialidade ||
            !reportModel.nome
        ){
            throw new InvalidInputError("Please insert all information")
        }

        const id = this.idGenerator.generateId()

        const input: InputReportModelComplete = {
            id,
            fk_especialidade: reportModel.fk_especialidade,
            nome: reportModel.nome
        }

        await this.reportDatabase.createReportModel(input)

    }

    async createReportRelation(reportRelation: InputReportRelationComplete){
        if(!reportRelation.fk_laudo || !reportRelation.fk_modelo){
            throw new InvalidInputError("Please insert all information")
        }

        await this.reportDatabase.createReportRelation(reportRelation)

    }
    

}