import { UserDatabase } from "../Data/UserDatabase";
import { InputUserLogin, InputUserMedic, InputUserPatient, InputUserSpecialty, UserMedicComplete, UserPatientComplete, UserSpecialtyComplete } from "../Entities/User";
import { InvalidInputError } from "../Error/InvalidInputError";
import { HashManager } from "../Services/HashManager";
import { IdGenerator } from "../Services/IdGenerator";
import { TokenManager } from "../Services/TokenManager";


export class UserBusiness {
    constructor(
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private authenticator: TokenManager
    ) { }

    async createUserMedic(user: InputUserMedic) {

        if (!user.login || !user.password || !user.fk_especialidade) {
            throw new InvalidInputError("Please insert all information")
        }
        const id = this.idGenerator.generateId()
        const hashPassword = await this.hashManager.hash(user.password)

        const input: UserMedicComplete = {
            id,
            login: user.login,
            password: hashPassword,
            fk_especialidade: user.fk_especialidade
        }

        await this.userDatabase.createUserMedic(input)

        const accessToken: String = this.authenticator.generateToken({
            id,
            login: user.login,

        })

        return accessToken
    }

    async createUserPatient(user: InputUserPatient) {
        if (!user.login || !user.password) {
            throw new InvalidInputError("Please insert all information")
        }

        const id = this.idGenerator.generateId()
        const hashPassword = await this.hashManager.hash(user.password)

        const input: UserPatientComplete = {
            id,
            login: user.login,
            password: hashPassword,
        }

        await this.userDatabase.createUserPatient(input)

        const accessToken: string = this.authenticator.generateToken({
            id,
            login: user.login,
        })

        return accessToken

    }

    async createUserSpecialty(user: InputUserSpecialty) {
        if (!user.specialty) {
            throw new InvalidInputError("Please insert the specialty")
        }

        const id = this.idGenerator.generateId()
        const input: UserSpecialtyComplete = {
            id,
            specialty: user.specialty
        }

        await this.userDatabase.createUserSpecialty(input)

    }

    async login(user: InputUserLogin): Promise<string> {
        try {
            let token = ""

            if (!user.login || !user.password) {
                throw new InvalidInputError("Invalid Login or Password")
            }

            if (!user.userType) {
                throw new InvalidInputError("Invalid user type")
            }

            if (user.userType === "Patient") {
                const result = await this.userDatabase.getPatientInfo(user.login)
                if (this.hashManager.compare(user.password, result.password)) {
                    token = this.authenticator.generateToken({ id: result.id, login: result.login })
                }
                else {
                    throw new InvalidInputError("Invalid Login or Password")
                }
            }


            else if (user.userType === "Medic") {
                const result = await this.userDatabase.getMedicInfo(user.login)
                if (this.hashManager.compare(user.password, result.password)) {
                    token = this.authenticator.generateToken({ id: result.id, login: result.login })
                }
                else {
                    throw new InvalidInputError("Invalid Login or Password")
                }
            }
            
            if (!token) {
                throw new InvalidInputError("Invalid token")
            }
            return token
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async getAllMedics(): Promise<object[]>{
        try {
             return await this.userDatabase.getAllMedics()
        } catch (error) {
            throw new Error(error.message)
        }
    }
}