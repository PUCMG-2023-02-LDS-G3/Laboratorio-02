import { PrismaClient } from "@prisma/client";
import { Pedido, Usuario } from "../models/index.ts";

class UsuarioService {
  db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

    async createUsuario(usuario: Usuario) {
        return await this.db.usuario.create({
            data: {
                ...usuario
            }
        })
    }

    async getUsuario(cpf: string) {
        return await this.db.usuario.findUnique({
            where: {
                cpf
            }
        })
    }

    async getUsuarios() {
        return await this.db.usuario.findMany();
    }

    async addPedido(cpf: string, pedido: Pedido) {

        pedido.cpf = cpf
        pedido.data = new Date(pedido.data)

        return await this.db.usuario.update({
            where: {
                cpf
            },
            data: {
                pedido: {
                    create: pedido
                }
            }
        })
    }

    

}

export default UsuarioService;
