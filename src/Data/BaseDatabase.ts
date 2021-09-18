import knex from "knex";
import Knex from "knex";


export abstract class BaseDatabase {

    private static connection: Knex | null = null;

    protected tableNames = {

        UserMedicTable: "medico",
        UserPatientTable: "paciente",
        SpecialtyTable: "especialidades",
        AppointmentTable: "agendamento",
        AppointmentTypeTable: "tipo_de_agendamento",
        AppointmentRelationTable: "relacao_tipo_agendamento",
        ReportTable: "laudo",
        ReportModelTable: "modelo_de_laudo",
        ReportRelationTable: "relacao_laudo_modelo",

    }

    protected getConnection(): Knex {
        if (!BaseDatabase.connection) {
            BaseDatabase.connection = knex({
                client: "mysql",
                connection: {
                    host: process.env.DB_HOST,
                    port: 3306,
                    user: process.env.DB_USER,
                    password: process.env.DB_PASSWORD,
                    database: process.env.DB_SCHEMA,
                },
            });
        }

        return BaseDatabase.connection;
    }

    public static async destroyConnection(): Promise<void> {
        if (BaseDatabase.connection) {
            await BaseDatabase.connection.destroy();
            BaseDatabase.connection = null;
        }
    }
}
