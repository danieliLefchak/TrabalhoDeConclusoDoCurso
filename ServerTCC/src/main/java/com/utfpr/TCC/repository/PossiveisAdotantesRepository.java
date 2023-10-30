package com.utfpr.TCC.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.utfpr.TCC.model.PossiveisAdotantes;
import com.utfpr.TCC.model.Usuarios;

public interface PossiveisAdotantesRepository extends JpaRepository<PossiveisAdotantes, Long>{
	PossiveisAdotantes findByUser(Usuarios usuario);
}
