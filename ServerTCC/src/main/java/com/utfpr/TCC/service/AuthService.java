package com.utfpr.TCC.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.utfpr.TCC.model.Usuarios;
import com.utfpr.TCC.repository.UsuariosRepository;

@Service
public class AuthService implements UserDetailsService{
	private final UsuariosRepository usuariosRepository;
	
	public AuthService(UsuariosRepository usuariosRepository) {
		this.usuariosRepository = usuariosRepository;
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Usuarios usuarios = usuariosRepository.findByusername(username);
		
		if(usuarios == null) {
			throw new UsernameNotFoundException("Usuário não encontrado!");
		}
		
		return usuarios;
	}
}
