package com.laboratorio.projeto.controller;

import com.laboratorio.projeto.service.UsuarioService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/agente")
@AllArgsConstructor
public class UsuarioController {
    private final UsuarioService usuarioService;
}
