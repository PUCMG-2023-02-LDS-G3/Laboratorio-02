package com.laboratorio.projeto.repository;

import org.springframework.data.repository.CrudRepository;

import com.laboratorio.projeto.repository.domain.Usuario;

public interface UsuarioRepository extends CrudRepository<Usuario, String> {
    public Usuario getUsuarioByCpf(String cpf);
}
