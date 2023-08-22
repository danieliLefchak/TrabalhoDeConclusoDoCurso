package com.utfpr.TCC.service.impl;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import java.util.List;

import com.utfpr.TCC.model.Entidades;
import com.utfpr.TCC.repository.EntidadesRepository;
import com.utfpr.TCC.service.EntidadeService;

@Service
public class EntidadeServiceImpl extends CrudServiceImpl<Entidades, Long> implements EntidadeService {

	private final EntidadesRepository entidadesRepository;
	
	public EntidadeServiceImpl(EntidadesRepository entidadesRepository/*, PasswordEncoder passwordEncoder*/) {
		this.entidadesRepository = entidadesRepository;
		//this.passwordEncoder = passwordEncoder;
	}
	
	@Override
	public Entidades save(Entidades entity) {
		//entity.setSenha(passwordEncoder.encode(entity.getSenha()));
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
}