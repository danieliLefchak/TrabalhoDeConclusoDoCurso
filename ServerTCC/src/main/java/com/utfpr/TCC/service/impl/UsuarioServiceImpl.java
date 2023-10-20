package com.utfpr.TCC.service.impl;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.utfpr.TCC.model.Usuarios;
import com.utfpr.TCC.repository.UsuariosRepository;
import com.utfpr.TCC.service.UsuariosService;

@Service
public class UsuarioServiceImpl extends CrudServiceImpl<Usuarios, Long> implements UsuariosService{
	private final UsuariosRepository usuariosRepository;
	BCryptPasswordEncoder passwordEncoder;
	
	public UsuarioServiceImpl(UsuariosRepository usuariosRepository) {
		this.usuariosRepository = usuariosRepository;
		passwordEncoder = new BCryptPasswordEncoder();
	}
	
	@Override
	public Usuarios save(Usuarios usuario) {
		usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
		
		return usuariosRepository.save(usuario);
	}

	@Override
	protected JpaRepository<Usuarios, Long> getRepository() {
		return this.usuariosRepository;
	}

	@Override
	public Usuarios findByusername(String nome) {
		return usuariosRepository.findByusername(nome);
	}
}
