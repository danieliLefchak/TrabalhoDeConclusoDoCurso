package com.utfpr.TCC.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.utfpr.TCC.model.Entidades;
import com.utfpr.TCC.model.LinksUteis;
import java.util.List;

public interface LinksUteisRepository extends JpaRepository<LinksUteis, Long>{
	List<LinksUteis> findByCategoria(String categoria);
	List<LinksUteis> findByEntidade(Entidades entidade);
}
