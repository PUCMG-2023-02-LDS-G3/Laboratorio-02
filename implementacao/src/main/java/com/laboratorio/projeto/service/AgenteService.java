package com.laboratorio.projeto.service;

import com.laboratorio.projeto.domain.Agente;
import com.laboratorio.projeto.repository.AgenteRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AgenteService {
    AgenteRepository agenteRepository;

    public Agente criarAgente(String cnpj) {
        Agente agente = new Agente();
        agente.setCnpj(cnpj);
        agente.setNome("Vitão");
        agente.setEndereco("rua sei la das quantas");
        return agenteRepository.save(agente);
    }
}
