package com.utfpr.TCC.service.impl;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import com.utfpr.TCC.model.Interessados;
import com.utfpr.TCC.model.PossiveisAdotantes;
import com.utfpr.TCC.model.Usuarios;
import com.utfpr.TCC.repository.InteressadosRepository;
import com.utfpr.TCC.repository.PossiveisAdotantesRepository;
import com.utfpr.TCC.service.PossiveisAdotantesService;

@Service
public class PossiveisAdotantesServiceImpl extends CrudServiceImpl<PossiveisAdotantes, Long> implements PossiveisAdotantesService {
	
	private final PossiveisAdotantesRepository possiveisAdotantesRepository;
	private final InteressadosRepository interessadosRepository;
	
	public PossiveisAdotantesServiceImpl(PossiveisAdotantesRepository possiveisAdotantesRepository, InteressadosRepository interessadosRepository) {
		this.possiveisAdotantesRepository = possiveisAdotantesRepository;
		this.interessadosRepository = interessadosRepository;
	}
	
	@Override
	public PossiveisAdotantes save(PossiveisAdotantes entity) {
		return this.possiveisAdotantesRepository.save(entity);
	}

	@Override
	protected JpaRepository<PossiveisAdotantes, Long> getRepository() {
		return this.possiveisAdotantesRepository;
	}

	@Override
	public PossiveisAdotantes findByUser(Usuarios usuario) {
		return possiveisAdotantesRepository.findByUser(usuario);
	}
	
	@Override
	public void delete(Long id) {
		PossiveisAdotantes adotantes = super.findOne(id);
		List<Interessados> interessadosRelacionados = interessadosRepository.findByAdotantes(adotantes);
		
		for (Interessados interessados : interessadosRelacionados) {
			interessadosRepository.delete(interessados);
		}
		
		interessadosRelacionados = interessadosRepository.findByAdotantes(adotantes);
		
		if(interessadosRelacionados == null || interessadosRelacionados.isEmpty()) {
			possiveisAdotantesRepository.deleteById(id);
		}
	}
}
