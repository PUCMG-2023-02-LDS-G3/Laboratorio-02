package com.laboratorio.projeto.service;

import com.laboratorio.projeto.domain.Agente;
import com.laboratorio.projeto.repository.AgenteRepository;
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
