package com.laboratorio.projeto.service;

import com.laboratorio.projeto.domain.Usuario;
import com.laboratorio.projeto.repository.UsuarioRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UsuarioService {
    UsuarioRepository usuarioRepository;

    public Usuario getUsuarioByCpf(String cpf) {
        return usuarioRepository.getUsuarioByCpf(cpf);
    }

    public Usuario createUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }
}
