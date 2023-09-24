import { PrismaClient } from "@prisma/client";
import { Contrato } from "../models/index.ts";

class ContratoService {
  db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

    async createContrato(contrato: Contrato) {
        return await this.db.contrato.create({
            data: {
                ...contrato
            },
        })
    }

    async getContrato(id: string) {
        return await this.db.contrato.findUnique({
            where: {
                id
            }
        })
    }

    async getContratos() {
        return await this.db.contrato.findMany();
    }


}

export default ContratoService;
