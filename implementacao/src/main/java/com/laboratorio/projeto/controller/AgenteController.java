package com.laboratorio.projeto.controller;

import com.laboratorio.projeto.service.AgenteService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("agente")
@AllArgsConstructor
public class AgenteController {
    private final AgenteService agenteService;

    @GetMapping()
    public String exemploRota() {
        return agenteService.exemploSerice();
    }
}
