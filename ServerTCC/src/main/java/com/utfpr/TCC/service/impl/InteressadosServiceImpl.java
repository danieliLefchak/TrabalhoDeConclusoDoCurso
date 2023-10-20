package com.utfpr.TCC.service.impl;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import com.utfpr.TCC.model.Interessados;
import com.utfpr.TCC.repository.InteressadosRepository;
import com.utfpr.TCC.service.InteressadosService;

@Service
public class InteressadosServiceImpl extends CrudServiceImpl<Interessados, Long> implements InteressadosService{
	private final InteressadosRepository interessadosRepository;
	
	public InteressadosServiceImpl(InteressadosRepository interessadosRepository) {
		this.interessadosRepository = interessadosRepository;
	}
	
	@Override
	protected JpaRepository<Interessados, Long> getRepository() {
		return this.interessadosRepository;
	}
}
