package com.utfpr.TCC.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.utfpr.TCC.model.Usuarios;
import com.utfpr.TCC.repository.UsuariosRepository;

@Service
public class UsuariosService {
	private final UsuariosRepository usuariosRepository;
	
	BCryptPasswordEncoder passwordEncoder;
	
	public UsuariosService(UsuariosRepository usuariosRepository) {
		this.usuariosRepository = usuariosRepository;
		passwordEncoder = new BCryptPasswordEncoder();
	}
	
	public Usuarios save(Usuarios usuario) {
		usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
		
		return usuariosRepository.save(usuario);
	}
}
