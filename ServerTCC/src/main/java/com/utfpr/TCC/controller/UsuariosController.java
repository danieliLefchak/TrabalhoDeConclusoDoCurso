package com.utfpr.TCC.controller;

import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.utfpr.TCC.model.Usuarios;
import com.utfpr.TCC.service.CrudService;
import com.utfpr.TCC.service.UsuariosService;

@RestController
@RequestMapping("usuarios")
public class UsuariosController extends CrudController<Usuarios, Usuarios, Long>{
	private final UsuariosService usuariosService;
	private ModelMapper modelMapper;
	
	public UsuariosController(UsuariosService usuariosService, ModelMapper modelMapper) {
		super(Usuarios.class, Usuarios.class);
		this.usuariosService = usuariosService;
		this.modelMapper = modelMapper;
	}
	
	@GetMapping("findByName/{nome}")
	public ResponseEntity<Usuarios> findEntidadeByName(@PathVariable String nome){
		Usuarios entity = usuariosService.findByusername(nome);
		
		if(entity != null) {
			return ResponseEntity.ok(usuariosService.findByusername(nome));
		} else {
    		return ResponseEntity.noContent().build();
    	}
	}

	@Override
	protected CrudService<Usuarios, Long> getService() {
		return this.usuariosService;
	}

	@Override
	protected ModelMapper getModelMapper() {
		return this.modelMapper;
	}
}
