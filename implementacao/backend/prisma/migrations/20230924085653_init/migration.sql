-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "rg" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "profissao" TEXT NOT NULL,
    "empregadoras" TEXT NOT NULL,
    "salario" REAL NOT NULL,
    "senha" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Automovel" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "matricula" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "ano" INTEGER NOT NULL,
    "placa" TEXT NOT NULL,
    "aluguel" REAL NOT NULL,
    "proprietario" TEXT NOT NULL,
    "cnpj" TEXT,
    CONSTRAINT "Automovel_cnpj_fkey" FOREIGN KEY ("cnpj") REFERENCES "Agente" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Agente" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "senha" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Pedido" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "data" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cpf" TEXT NOT NULL,
    "aprovado" BOOLEAN NOT NULL DEFAULT false,
    "matricula" TEXT NOT NULL,
    "cnpj" TEXT,
    "credito" TEXT,
    CONSTRAINT "Pedido_cpf_fkey" FOREIGN KEY ("cpf") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Pedido_cnpj_fkey" FOREIGN KEY ("cnpj") REFERENCES "Agente" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Pedido_credito_fkey" FOREIGN KEY ("credito") REFERENCES "ContratoDeCredito" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Contrato" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dataInicio" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataFim" DATETIME NOT NULL,
    "cpf" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "matricula" TEXT NOT NULL,
    "creditoId" TEXT NOT NULL,
    CONSTRAINT "Contrato_cpf_fkey" FOREIGN KEY ("cpf") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Contrato_cnpj_fkey" FOREIGN KEY ("cnpj") REFERENCES "Agente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Contrato_matricula_fkey" FOREIGN KEY ("matricula") REFERENCES "Automovel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Contrato_creditoId_fkey" FOREIGN KEY ("creditoId") REFERENCES "ContratoDeCredito" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ContratoDeCredito" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cnpj" TEXT NOT NULL,
    "valorContrato" REAL NOT NULL,
    CONSTRAINT "ContratoDeCredito_cnpj_fkey" FOREIGN KEY ("cnpj") REFERENCES "Agente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_cpf_key" ON "Usuario"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_rg_key" ON "Usuario"("rg");

-- CreateIndex
CREATE UNIQUE INDEX "Automovel_matricula_key" ON "Automovel"("matricula");

-- CreateIndex
CREATE UNIQUE INDEX "Automovel_placa_key" ON "Automovel"("placa");

-- CreateIndex
CREATE UNIQUE INDEX "Agente_cnpj_key" ON "Agente"("cnpj");
