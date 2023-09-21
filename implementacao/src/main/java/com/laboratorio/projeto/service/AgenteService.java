package com.laboratorio.projeto.service;

import com.laboratorio.projeto.repository.AgenteRepository;
import com.laboratorio.projeto.repository.domain.Agente;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AgenteService {
    AgenteRepository agenteRepository;

    public Agente criarAgente(Agente agente) {
        return agenteRepository.save(agente);
    }
}
