import { PrismaClient } from "@prisma/client";
import { Pedido, Agente } from "../models/index.ts";

class AgenteService {
  db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

    async createAgente(agente: Agente) {
        return await this.db.agente.create({
            data: {
                ...agente
            },
        })
    }

    async getAgente(cnpj: string) {
        return await this.db.agente.findUnique({
            where: {
                cnpj
            }
        })
    }

    async getAgentes() {
        return await this.db.agente.findMany();
    }

    async acceptPedido(cnpj: string, pedido: Pedido) {
        return await this.db.agente.update({
            where: {
                cnpj
            },
            data: {
                pedido: {
                    update: {
                        where: {
                            id: pedido.id
                        },
                        data: {
                            aprovado: true
                        }
                    }
                }
            }
        })
    }

}

export default AgenteService;
