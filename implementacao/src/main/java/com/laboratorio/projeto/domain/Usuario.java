package com.laboratorio.projeto.domain;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Usuario {
    String nome;
    String endereco;
    @Column(unique = true)
    String rg;
    @Id
    @Column(unique = true)
    String cpf;
    String profissao;
    @ElementCollection
    List<String> entidadesEmpregadoras;
    @ElementCollection
    List<Double> rendimentos;
}
