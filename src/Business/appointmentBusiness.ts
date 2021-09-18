
import { InputAppointment, InputAppointmentComplete, InputAppointmentRelationComplete, InputAppointmentType, InputAppointmentTypeComplete } from "../Entities/Appointment";
import { Request, Response } from "express";
import { AppointmentDatabase } from "../Data/AppointmentDatabase";
import { BaseDatabase } from "../Data/BaseDatabase";
import { UserDatabase } from "../Data/UserDatabase";


import { InvalidInputError } from "../Error/InvalidInputError";
import { HashManager } from "../Services/HashManager";
import { IdGenerator } from "../Services/IdGenerator";
import { TokenManager } from "../Services/TokenManager";

export class AppointmentBusiness {
    constructor(
        private appointmentDatabase: AppointmentDatabase,
        private idGenerator: IdGenerator,

    ) { }

    async createAppointment(appointment: InputAppointment) {
        if (

            !appointment.fk_paciente ||
            !appointment.fk_medico ||
            !appointment.pagamento_total ||
            !appointment.data ||
            !appointment.retorno

        ) {
            throw new InvalidInputError("Please insert all information")
        }

        const id = this.idGenerator.generateId()

        const input: InputAppointmentComplete = {

            id,
            fk_paciente: appointment.fk_paciente,
            fk_medico: appointment.fk_medico,
            pagamento_total: appointment.pagamento_total,
            data: appointment.data,
            retorno: appointment.retorno
        }


        await this.appointmentDatabase.createAppointment(input)

    }

    async createAppointmentType(appointmentType: InputAppointmentType) {
        if (!appointmentType.nome || !appointmentType.preco) {
            throw new InvalidInputError("Please insert all information")
        }

        const id = this.idGenerator.generateId()

        const input: InputAppointmentTypeComplete = {
            id,
            nome: appointmentType.nome,
            preco: appointmentType.preco
        }

        await this.appointmentDatabase.createAppointmentType(input)
    }

    async createAppointmentRelation(appointment_relation: InputAppointmentRelationComplete){
        if(!appointment_relation.fk_agendamento || !appointment_relation.fk_tipo_de_agendamento){
            throw new InvalidInputError("Please insert all information")
        }

        await this.appointmentDatabase.createAppointmentRelation(appointment_relation)


    }

}

