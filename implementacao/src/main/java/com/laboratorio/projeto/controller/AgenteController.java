package com.laboratorio.projeto.controller;

import com.laboratorio.projeto.domain.Agente;
import com.laboratorio.projeto.service.AgenteService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/agente")
@AllArgsConstructor
public class AgenteController {
    private final AgenteService agenteService;

    @PostMapping
    public Agente cadastroAgente(@RequestBody Agente agente) {
        return agenteService.criarAgente(agente);
    }
}
