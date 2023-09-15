package com.laboratorio.projeto.repository;

import com.laboratorio.projeto.domain.Usuario;
import org.springframework.data.repository.CrudRepository;

public interface UsuarioRepository extends CrudRepository<Usuario, String> {
    public Usuario getUsuarioByCpf(String cpf);
}
