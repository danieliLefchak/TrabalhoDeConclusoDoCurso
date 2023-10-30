package com.utfpr.TCC.service.impl;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import com.utfpr.TCC.model.Entidades;
import com.utfpr.TCC.model.LinksUteis;
import com.utfpr.TCC.repository.LinksUteisRepository;
import com.utfpr.TCC.service.LinksUteisService;
import java.util.List;

@Service
public class LinksUteisServiceImpl extends CrudServiceImpl<LinksUteis, Long> implements LinksUteisService{
	
	private final LinksUteisRepository linksUteisRepository;
	
	public LinksUteisServiceImpl(LinksUteisRepository linksUteisRepository) {
		this.linksUteisRepository = linksUteisRepository;
	}

	@Override
	public List<LinksUteis> findByCategoria(String categoria) {
		return linksUteisRepository.findByCategoria(categoria);
	}

	@Override
	protected JpaRepository<LinksUteis, Long> getRepository() {
		return this.linksUteisRepository;
	}

	@Override
	public List<LinksUteis> findByEntidade(Entidades entidade) {
		return linksUteisRepository.findByEntidade(entidade);
	}
}
