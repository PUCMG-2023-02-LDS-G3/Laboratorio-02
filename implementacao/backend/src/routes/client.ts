import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import UsuarioService from "../services/usuarioService.ts";

const prisma = new PrismaClient();
const clientService = new UsuarioService(prisma);
const route = Router();

route.get("/", async (req: Request, res: Response) => {
  const clients = await prisma.usuario.findMany();
  return res.json(clients);
});

route.post("/create/pedido", async (req: Request, res: Response) => {
  const { cpf, pedido } = req.body;
  console.log(pedido)
  const client = await clientService.addPedido(cpf, pedido);
  return res.json(client);
});

route.post("/create", async (req: Request, res: Response) => {
  const { nome, cpf, senha, endereco, rg, salario, profissao, id, empresa } =
    req.body;

  if (
    !nome ||
    !cpf ||
    !senha ||
    !endereco ||
    !rg ||
    !salario ||
    !profissao ||
    !id ||
    !empresa
  ) {
    return res.status(400).json({ error: "Invalid body" });
  }

  const clientExists = await clientService.getUsuario(cpf);

  if (clientExists) {
    return res.status(400).json({ error: "Client already exists" });
  }

  const client = await clientService.createUsuario({
    cpf,
    empregadoras: empresa,
    endereco,
    nome,
    profissao,
    rg,
    salario,
    senha,
    id,
  });
  return res.json(client);
});

export default route;
