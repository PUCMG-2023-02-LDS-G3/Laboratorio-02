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

route.post("/login", async (req: Request, res: Response) => {
  const { cpf, senha } = req.body;
  const client = await clientService.getUsuario(cpf);

  if (!client || client.senha !== senha) {
    return res.status(400).json({ error: "Senha invalida" });
  }
  return res.json(client);
})

route.post("/create/pedido", async (req: Request, res: Response) => {
  const { cpf, pedido } = req.body;
  const client = await clientService.addPedido(cpf, pedido);
  return res.json(client);
});

route.post("/create", async (req: Request, res: Response) => {
  const { cpf, senha } =
    req.body;

  const clientExists = await clientService.getUsuario(cpf);

  if (clientExists) {
    return res.status(400).json({ error: "Client already exists" });
  }

  const client = await clientService.createUsuario({
    cpf,
    empregadoras: "empresa",
    endereco: "",
    nome: "",
    profissao: "",
    rg: "",
    salario: 0,
    senha,
    id: "",
  });
  return res.json(client);
});



export default route;
