package com.utfpr.TCC.service.impl;

import java.util.HashSet;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.utfpr.TCC.model.Usuarios;
import com.utfpr.TCC.repository.AuthorityRepository;
import com.utfpr.TCC.repository.UsuariosRepository;
import com.utfpr.TCC.service.UsuariosService;

@Service
public class UsuarioServiceImpl extends CrudServiceImpl<Usuarios, Long> implements UsuariosService{
	private final UsuariosRepository usuariosRepository;
	private final AuthorityRepository authorityRepository;
	BCryptPasswordEncoder passwordEncoder;
	
	public UsuarioServiceImpl(UsuariosRepository usuariosRepository, AuthorityRepository authorityRepository) {
		this.usuariosRepository = usuariosRepository;
		this.authorityRepository = authorityRepository;
		passwordEncoder = new BCryptPasswordEncoder();
	}
	
	@Override
	public Usuarios save(Usuarios usuario) {
		usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
		usuario.setUserAuthorities(new HashSet<>());
		
		if(usuario.getTipoUsuario().equals("adotante")) {
			usuario.getUserAuthorities().add( authorityRepository.findByAuthority("ROLE_USER") );
		} else if (usuario.getTipoUsuario().equals("entidade")) {
			usuario.getUserAuthorities().add( authorityRepository.findByAuthority("ROLE_ADMIN") );
		}
		
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
	
	@Override
	public void delete(Long id) {
		Usuarios usuario = super.findOne(id);
		usuario.getUserAuthorities().clear();
		
		usuariosRepository.save(usuario);
		
		usuariosRepository.deleteById(id);
	}

	@Override
	public Usuarios mudarSenha(Usuarios usuario, String senha) {
		if(senha == null || senha.isEmpty()) {
			return usuario;
		} else {
			usuario.setPassword(senha);
			return save(usuario);
		}		
	}
}
