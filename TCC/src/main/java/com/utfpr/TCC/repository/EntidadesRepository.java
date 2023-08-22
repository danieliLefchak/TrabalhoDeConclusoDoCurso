package com.utfpr.TCC.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.utfpr.TCC.model.Entidades;

public interface EntidadesRepository extends JpaRepository<Entidades, Long>{	
	Entidades findByCnpj(String cnpj);
}
