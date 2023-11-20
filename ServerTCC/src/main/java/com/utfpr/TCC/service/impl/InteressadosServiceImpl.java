package com.utfpr.TCC.service.impl;

import com.utfpr.TCC.model.Animais;
import com.utfpr.TCC.model.Entidades;
import com.utfpr.TCC.model.Usuarios;
import com.utfpr.TCC.service.AnimaisService;
import com.utfpr.TCC.service.EntidadeService;
import com.utfpr.TCC.service.UsuariosService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.utfpr.TCC.model.Interessados;
import com.utfpr.TCC.repository.InteressadosRepository;
import com.utfpr.TCC.service.InteressadosService;

import java.util.ArrayList;
import java.util.List;

@Service
public class InteressadosServiceImpl extends CrudServiceImpl<Interessados, Long> implements InteressadosService{
	private final InteressadosRepository interessadosRepository;
	private final UsuariosService usuariosService;
	private final EntidadeService entidadeService;
	
	public InteressadosServiceImpl(InteressadosRepository interessadosRepository, UsuariosService usuariosService, EntidadeService entidadeService) {
		this.interessadosRepository = interessadosRepository;
		this.usuariosService = usuariosService;
		this.entidadeService = entidadeService;
	}
	
	@Override
	protected JpaRepository<Interessados, Long> getRepository() {
		return this.interessadosRepository;
	}
	
	@Override
	public List<Interessados> findAll() {
		Usuarios usuarios = new Usuarios();
		List<Interessados> interessados = new ArrayList<>();
		List<Interessados> allInteres = interessadosRepository.findAll();

		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

		if(principal instanceof UserDetails) {
			String nome = ((UserDetails)principal).getUsername();
		} else {
			String nome = principal.toString();
			
			usuarios = usuariosService.findByusername(nome);
			
			Entidades entidade = entidadeService.findByUser(usuarios);

			for (Interessados interes: allInteres) {
				if(interes.getAnimais().getEntidade().equals(entidade)) {
					interessados.add(interes);
				}		
			}
		}

		return interessados;
	}
}
