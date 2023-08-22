package com.utfpr.TCC.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.utfpr.TCC.model.PossiveisAdotantes;

public interface PossiveisAdotantesRepository extends JpaRepository<PossiveisAdotantes, Long>{
	//PossiveisAdotantes findByNome(String nome);
}
