package com.laboratorio.projeto.service;

import com.laboratorio.projeto.repository.UsuarioRepository;
import com.laboratorio.projeto.repository.domain.Usuario;

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

    public boolean deleteUsuario(String cpf) {
        Usuario usuario = usuarioRepository.getUsuarioByCpf(cpf);
        try {
            usuarioRepository.delete(usuario);
        } catch (Exception e) {
            return false;
        }
        return true;
    }

    public Usuario updateUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }
}
