package com.utfpr.TCC.service.impl;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import com.utfpr.TCC.model.PossiveisAdotantes;
import com.utfpr.TCC.repository.PossiveisAdotantesRepository;
import com.utfpr.TCC.service.PossiveisAdotantesService;

@Service
public class PossiveisAdotantesServiceImpl extends CrudServiceImpl<PossiveisAdotantes, Long> implements PossiveisAdotantesService {
	
	private final PossiveisAdotantesRepository possiveisAdotantesRepository;
	
	public PossiveisAdotantesServiceImpl(PossiveisAdotantesRepository possiveisAdotantesRepository) {
		this.possiveisAdotantesRepository = possiveisAdotantesRepository;
	}
	
	@Override
	public PossiveisAdotantes save(PossiveisAdotantes entity) {
		return this.possiveisAdotantesRepository.save(entity);
	}

	@Override
	protected JpaRepository<PossiveisAdotantes, Long> getRepository() {
		return this.possiveisAdotantesRepository;
	}
}
