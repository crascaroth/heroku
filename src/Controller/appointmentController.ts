
import { Response, Request } from "express"
import { AppointmentBusiness } from "../Business/appointmentBusiness";
import { AppointmentDatabase } from "../Data/AppointmentDatabase";
import { BaseDatabase } from "../Data/BaseDatabase";
import { InputAppointment, InputAppointmentRelationComplete, InputAppointmentType } from "../Entities/Appointment";
import { IdGenerator } from "../Services/IdGenerator";



export class AppointmentController {

    async createAppointment(req: Request, res: Response) {
        try {


            const input: InputAppointment = {
                fk_paciente: req.body.fk_paciente,
                fk_medico: req.body.fk_medico,
                pagamento_total: req.body.pagamento_total,
                data: req.body.data,
                retorno: req.body.retorno
            }


            const appointmentBusiness = new AppointmentBusiness(
                new AppointmentDatabase,
                new IdGenerator,
            );

            await appointmentBusiness.createAppointment(input)

            res.status(200).send("Appointment created Successfully!")


        } catch (error) {
            res.status(400).send({ error: error.message });
        }
        await BaseDatabase.destroyConnection();
    }

    async createAppointmentType(req: Request, res: Response) {
        try {
            const input: InputAppointmentType = {
                nome: req.body.nome,
                preco: Number(req.body.preco)
            }

            const appointmentBusiness = new AppointmentBusiness(
                new AppointmentDatabase,
                new IdGenerator
            );

            await appointmentBusiness.createAppointmentType(input)

            res.status(201).send("Type Created Sucessfully!")


        } catch (error) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

    async createAppointmentRelation(req: Request, res: Response) {
        try {
            
            const input: InputAppointmentRelationComplete = {
                fk_agendamento: req.body.fk_agendamento,
                fk_tipo_de_agendamento: req.body.fk_tipo_de_agendamento
            }

            const appointmentBusiness = new AppointmentBusiness(
                new AppointmentDatabase,
                new IdGenerator
            );

            await appointmentBusiness.createAppointmentRelation(input)

            res.status(201).send("Relation Created Sucessfully!")


        } catch (error) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }


}

