package com.laboratorio.projeto.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Agente {
    @Id
    @Column(unique = true)
    String cnpj;

    String nome;
    String endereco;
}
