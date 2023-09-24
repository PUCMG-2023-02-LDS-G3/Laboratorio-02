import { PrismaClient } from "@prisma/client";
import { Automovel } from "../models/index.ts";

class AutomovelService {
  db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

    async createAutomovel(automovel: Automovel) {
        return await this.db.automovel.create({
            data: {
                ...automovel
            },
        })
    }

    async getAutomovel(matricula: string) {
        return await this.db.automovel.findUnique({
            where: {
                matricula
            }
        })
    }

    async getAutomovels() {
        return await this.db.automovel.findMany();
    }


}

export default AutomovelService;
