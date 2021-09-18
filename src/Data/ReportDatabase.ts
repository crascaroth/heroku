import { InputReportComplete, InputReportModelComplete, InputReportRelationComplete } from "../Entities/Report";
import { BaseDatabase } from "./BaseDatabase";

export class ReportDatabase extends BaseDatabase {
    public async createReport(report: InputReportComplete) {
        try {
            await this.getConnection().raw(`
            INSERT INTO ${this.tableNames.ReportTable} (
                id,
                fk_medico,
                fk_paciente,
                data,
                atualizacao,
                descricao
            )
            VALUES (
                "${report.id}",
                "${report.fk_medico}",
                "${report.fk_paciente}",
                "${report.data}",
                "${report.atualizacao}",
                "${report.descricao}"
            );
            `)
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public async createReportModel(reportModel: InputReportModelComplete){
        try {
            await this.getConnection().raw(`
            INSERT INTO ${this.tableNames.ReportModelTable} (id, fk_especialidade, nome)
            VALUES ("${reportModel.id}", "${reportModel.fk_especialidade}", "${reportModel.nome}");
            `)
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
        
    }

    public async createReportRelation(reportRelation: InputReportRelationComplete){
        try {
            await this.getConnection().raw(`
            INSERT INTO ${this.tableNames.ReportRelationTable} (fk_laudo, fk_modelo)
            VALUES("${reportRelation.fk_laudo}","${reportRelation.fk_modelo}");            
            `)
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

}
