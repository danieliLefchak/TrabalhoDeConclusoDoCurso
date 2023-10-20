package com.utfpr.TCC.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.utfpr.TCC.model.Entidades;
import com.utfpr.TCC.model.Usuarios;

public interface EntidadesRepository extends JpaRepository<Entidades, Long>{	
	Entidades findByCnpj(String cnpj);
	Entidades findByUser(Usuarios usuario);
}
