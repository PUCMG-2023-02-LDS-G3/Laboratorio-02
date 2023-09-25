import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import AgenteService from "../services/agenteService.ts";
import AutomovelService from "../services/automovelService.ts";

const prisma = new PrismaClient();
const agenteService = new AgenteService(prisma);
const automovelService = new AutomovelService(prisma);
const route = Router();

route.get("/", async (req: Request, res: Response) => {
  const agents = await agenteService.getAgentes();
  return res.json(agents);
});

route.post("/login", async (req: Request, res: Response) => {
  const { cnpj, senha } = req.body;
  const agent = await agenteService.getAgente(cnpj);

  if (!agent || agent.senha !== senha) {
    return res.status(400).json({ error: "Senha invalida" });
  }
  return res.json(agent);
})

route.post("/create", async (req: Request, res: Response) => {
  const { nome, cnpj, senha, endereco, id } = req.body;
  const agents = await agenteService.createAgente({
    nome: "",
    cnpj,
    senha,
    endereco: "",
    id: "",
  });
  return res.json(agents);
});

route.post("/create/automovel", async (req: Request, res: Response) => {
  const {
    id,
    matricula,
    modelo,
    marca,
    ano,
    placa,
    aluguel,
    proprietario,
    cnpj,
  } = req.body;
  const agents = await automovelService.createAutomovel({
    id,
    matricula,
    modelo,
    marca,
    ano,
    placa,
    aluguel,
    proprietario,
    cnpj,
  });
  return res.json(agents);
});


route.put("/accept/pedido", async (req: Request, res: Response) => {
  const { cnpj, pedido } = req.body;
  const agents = await agenteService.acceptPedido(cnpj, pedido);
  return res.json(agents);
})

route.put("/refuse/pedido", async (req: Request, res: Response) => {
  const { cnpj, pedido } = req.body;
  const agents = await agenteService.refusePedido(cnpj, pedido);
  return res.json(agents);
})

export default route;
