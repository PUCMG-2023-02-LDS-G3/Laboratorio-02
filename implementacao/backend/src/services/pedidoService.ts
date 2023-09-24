import { PrismaClient } from "@prisma/client";
import { Pedido } from "../models/index.ts";

class PedidoService {
  db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

    async createPedido(pedido: Pedido) {
        return await this.db.pedido.create({
            data: {
                ...pedido
            },
        })
    }

    async getPedido(id: string) {
        return await this.db.pedido.findUnique({
            where: {
                id
            }
        })
    }

    async getPedidos() {
        return await this.db.pedido.findMany();
    }


}

export default PedidoService;
