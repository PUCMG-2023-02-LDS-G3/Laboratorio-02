package com.laboratorio.projeto.domain;

import lombok.Data;

import java.util.List;

@Data
public class Usuario {
    String nome;
    String endereco;
    String rg;
    String cpf;
    String profissao;
    List<String> entidadesEmpregadoras;
    List<Double> rendimentos;
}
