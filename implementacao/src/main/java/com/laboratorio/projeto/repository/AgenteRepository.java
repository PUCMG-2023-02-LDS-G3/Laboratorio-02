package com.laboratorio.projeto.repository;

import org.springframework.data.repository.CrudRepository;

import com.laboratorio.projeto.repository.domain.Agente;

public interface AgenteRepository extends CrudRepository<Agente, String> {
}
