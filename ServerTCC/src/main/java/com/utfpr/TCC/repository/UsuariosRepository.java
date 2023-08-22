package com.utfpr.TCC.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.utfpr.TCC.model.Usuarios;

public interface UsuariosRepository extends JpaRepository<Usuarios, Long> {
	Usuarios findByusername(String nome);
}
