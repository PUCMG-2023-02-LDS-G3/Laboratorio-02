import { PrismaClient } from "@prisma/client";
import { ContratoDeCredito } from "../models/index.ts";

class ContratoDeCreditoService {
  db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

    async createContratoDeCredito(contratoDeCredito: ContratoDeCredito) {
        return await this.db.contratoDeCredito.create({
            data: {
                ...contratoDeCredito
            },
        })
    }

    async getContratoDeCredito(id: string) {
        return await this.db.contratoDeCredito.findUnique({
            where: {
                id
            }
        })
    }

    async getContratoDeCreditos() {
        return await this.db.contratoDeCredito.findMany();
    }


}

export default ContratoDeCreditoService;
