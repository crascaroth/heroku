import { BaseDatabase } from "../Data/BaseDatabase";

class Migration extends BaseDatabase {
  public up = () => {

    const especialidades = async () => {
      await this.getConnection().raw(`
        CREATE TABLE IF NOT EXISTS especialidades (
        id VARCHAR(255) PRIMARY KEY,
        especialidade TEXT NOT NULL
        );
  `)
    }

    const medico = async () => {
      await this.getConnection().raw(`
        CREATE TABLE IF NOT EXISTS medico (
        id VARCHAR(255) PRIMARY KEY,
        login TEXT NOT NULL,
        password TEXT NOT NULL,
        fk_especialidade	VARCHAR(255) NOT NULL,
        FOREIGN KEY (fk_especialidade) REFERENCES especialidades(id)
        );
    `)
    }
    const paciente = async () => {
      await this.getConnection().raw(`
        CREATE TABLE IF NOT EXISTS paciente (
        id VARCHAR(255) PRIMARY KEY,
        login TEXT NOT NULL,
        password TEXT NOT NULL
        );
      `)
    }
    const agendamento = async () => {
      await this.getConnection().raw(`
        CREATE TABLE IF NOT EXISTS agendamento (
      	id VARCHAR(255) PRIMARY KEY NOT NULL,
      	fk_paciente TEXT NOT NULL, 
        fk_medico TEXT NOT NULL,
        pagamento_total FLOAT NOT NULL, 
        data DATE NOT NULL,
        retorno DATE NOT NULL
        );
      `)
    }
    const tipo_de_agendamento = async () => {
      await this.getConnection().raw(`
        CREATE TABLE IF NOT EXISTS tipo_de_agendamento (
      	id VARCHAR(255) PRIMARY KEY NOT NULL,
        nome TEXT NOT NULL,
        preco FLOAT NOT NULL
        );
      `)
    }

    const relacao_tipo_agendamento = async () => {
      await this.getConnection().raw(`
        CREATE TABLE IF NOT EXISTS relacao_tipo_agendamento(
        fk_agendamento VARCHAR(255) NOT NULL,
        fk_tipo_de_agendamento VARCHAR(255) NOT NULL,
        FOREIGN KEY (fk_agendamento) REFERENCES agendamento(id),
        FOREIGN KEY (fk_tipo_de_agendamento) REFERENCES tipo_de_agendamento(id)
        );
      `)
    }

    const laudo = async () => {
      await this.getConnection().raw(`
        CREATE TABLE IF NOT EXISTS laudo(
        id VARCHAR(255) PRIMARY KEY NOT NULL,
        fk_medico VARCHAR(255) NOT NULL,
        fk_paciente VARCHAR(255) NOT NULL,
        data DATE NOT NULL,
        atualizacao DATE,
        descricao TEXT,
        FOREIGN KEY (fk_medico) REFERENCES medico(id),
        FOREIGN KEY (fk_paciente) REFERENCES paciente(id)
        );
      `)
    }
    const modelo_de_laudo = async () => {
      await this.getConnection().raw(`
        CREATE TABLE IF NOT EXISTS modelo_de_laudo(
        id VARCHAR(255) PRIMARY KEY NOT NULL,
        fk_especialidade VARCHAR(255) NOT NULL,
        FOREIGN KEY (fk_especialidade) REFERENCES especialidades(id)
        );
      `)
    }
    const relacao_laudo_modelo = async () => {
      await this.getConnection().raw(`
        CREATE TABLE IF NOT EXISTS relacao_laudo_modelo(
        fk_laudo VARCHAR(255) NOT NULL,
        fk_modelo VARCHAR(255) NOT NULL,
        FOREIGN KEY (fk_laudo) REFERENCES laudo(id),
        FOREIGN KEY (fk_modelo) REFERENCES modelo_de_laudo(id)
        );    
      `)
    }
  }
}