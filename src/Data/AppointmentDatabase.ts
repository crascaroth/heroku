
import { InputAppointmentComplete, InputAppointmentRelationComplete, InputAppointmentTypeComplete } from "../Entities/Appointment";
import { BaseDatabase } from "./BaseDatabase";

export class AppointmentDatabase extends BaseDatabase {
    public async createAppointment(appointment: InputAppointmentComplete) {

        try {
            await this.getConnection().raw(`
            INSERT INTO ${this.tableNames.AppointmentTable} (
                id,
                fk_paciente,
                fk_medico,
                pagamento_total,
                data,

                retorno
                )
            VALUES (

                "${appointment.id}",
                "${appointment.fk_paciente}",
                "${appointment.fk_medico}",
                "${appointment.pagamento_total}",
                "${appointment.data}",

                "${appointment.retorno}"
            );
            `)

        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }


    public async createAppointmentType(appointmentType: InputAppointmentTypeComplete){
        try {
            await this.getConnection().raw(`
            INSERT INTO ${this.tableNames.AppointmentTypeTable}( id, nome, preco)
            VALUES ( "${appointmentType.id}", "${appointmentType.nome}", "${appointmentType.preco}");
            `)
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public async createAppointmentRelation(appointment_relation: InputAppointmentRelationComplete){
        try {
            await this.getConnection().raw(`
            INSERT INTO ${this.tableNames.AppointmentRelationTable}(fk_agendamento, fk_tipo_de_agendamento)
            VALUES ("${appointment_relation.fk_agendamento}", "${appointment_relation.fk_tipo_de_agendamento}");
            `)
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

}