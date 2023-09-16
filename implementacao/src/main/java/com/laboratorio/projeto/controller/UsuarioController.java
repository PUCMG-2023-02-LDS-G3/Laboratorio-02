package com.laboratorio.projeto.controller;

import com.laboratorio.projeto.domain.Usuario;
import com.laboratorio.projeto.service.UsuarioService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/usuario")
@AllArgsConstructor
public class UsuarioController {
    private final UsuarioService usuarioService;

    @GetMapping("/{cpf}")
    public Usuario getUsuario(@PathVariable String cpf) {
        return usuarioService.getUsuarioByCpf(cpf);
    }

    @PostMapping
    public Usuario createUsuario(@RequestBody Usuario usuario) {
        return usuarioService.createUsuario(usuario);
    }

    @DeleteMapping("/{cpf}")
    public boolean deleteUsuario(@PathVariable String cpf) {
        return usuarioService.deleteUsuario(cpf);
    }

    @PutMapping
    public Usuario updateUsuario(@RequestBody Usuario usuario) {
        return usuarioService.updateUsuario(usuario);
    }
}
