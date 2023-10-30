package com.utfpr.TCC.service.impl;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import com.utfpr.TCC.model.Animais;
import com.utfpr.TCC.model.Entidades;
import com.utfpr.TCC.model.Interessados;
import com.utfpr.TCC.model.LinksUteis;
import com.utfpr.TCC.model.Usuarios;
import com.utfpr.TCC.repository.AnimaisRepository;
import com.utfpr.TCC.repository.EntidadesRepository;
import com.utfpr.TCC.repository.InteressadosRepository;
import com.utfpr.TCC.repository.LinksUteisRepository;
import com.utfpr.TCC.service.EntidadeService;

@Service
public class EntidadeServiceImpl extends CrudServiceImpl<Entidades, Long> implements EntidadeService {

	private final EntidadesRepository entidadesRepository;
	private final AnimaisRepository animaisRepository;
	private final LinksUteisRepository linksUteisRepository;
	private final InteressadosRepository interessadosRepository;
	
	public EntidadeServiceImpl(EntidadesRepository entidadesRepository, AnimaisRepository animaisRepository,
							   LinksUteisRepository linksUteisRepository, InteressadosRepository interessadosRepository) {
		this.entidadesRepository = entidadesRepository;
		this.animaisRepository = animaisRepository;
		this.linksUteisRepository = linksUteisRepository;
		this.interessadosRepository = interessadosRepository;
	}
	
	@Override
	public Entidades save(Entidades entity) {
		return this.entidadesRepository.save(entity);
	}

	@Override
	public Entidades findByCnpj(String cnpj) {
		return findByCnpj(cnpj);
	}

	@Override
	protected JpaRepository<Entidades, Long> getRepository() {
		return this.entidadesRepository;
	}

	@Override
	public Entidades findByUser(Usuarios usuario) {
		return entidadesRepository.findByUser(usuario);
	}
	
	@Override
	public void delete(Long id) {
		Entidades entidade = super.findOne(id);
		List<Animais> animaisRelacionados = animaisRepository.findByEntidade(entidade);
		List<LinksUteis> linksRelacionados = linksUteisRepository.findByEntidade(entidade);
		
		for (Animais animal : animaisRelacionados) {
			List<Interessados> interessadosRelacionados = interessadosRepository.findByAnimais(animal);
			for (Interessados interessados : interessadosRelacionados) {
				interessados.setAnimais(null);
				interessadosRepository.save(interessados);
			}
			
			interessadosRelacionados = interessadosRepository.findByAnimais(animal);
			
			if(interessadosRelacionados == null || interessadosRelacionados.isEmpty()) {
				animaisRepository.delete(animal);
			}
		}
		
		for (LinksUteis links : linksRelacionados) {
			links.setEntidade(null);
			linksUteisRepository.save(links);
		}
		
		animaisRelacionados = animaisRepository.findByEntidade(entidade);
		
		if(animaisRelacionados == null || animaisRelacionados.isEmpty()) {
	    	entidadesRepository.deleteById(id);
	    }
	}
}
