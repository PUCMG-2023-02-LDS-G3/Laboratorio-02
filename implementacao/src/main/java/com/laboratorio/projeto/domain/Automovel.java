package com.laboratorio.projeto.domain;

import lombok.Data;

//@Entity
@Data
public class Automovel {
    String matricula;
    int ano;
    String marca;
    String modelo;
    String placa;
}
