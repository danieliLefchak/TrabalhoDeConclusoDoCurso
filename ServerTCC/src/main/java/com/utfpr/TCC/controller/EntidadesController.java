package com.utfpr.TCC.controller;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.utfpr.TCC.dto.EntidadesDto;
import com.utfpr.TCC.model.Entidades;
import com.utfpr.TCC.model.Usuarios;
import com.utfpr.TCC.service.CrudService;
import com.utfpr.TCC.service.EntidadeService;
import com.utfpr.TCC.service.UsuariosService;
import com.utfpr.TCC.utils.GenericResponse;

import jakarta.validation.Valid;

@RestController
@RequestMapping("entidades")
public class EntidadesController extends CrudController<Entidades, EntidadesDto, Long>{
	private final EntidadeService entidadeService;
	private final UsuariosService usuario;
	private ModelMapper modelMapper;
	
	public EntidadesController(EntidadeService entidadeService, ModelMapper modelMapper, UsuariosService usuario) {
		super(Entidades.class, EntidadesDto.class);
		this.entidadeService = entidadeService;
		this.modelMapper = modelMapper;
		this.usuario = usuario;
	}

	@Override
	protected CrudService<Entidades, Long> getService() {
		return this.entidadeService;
	}

	@Override
	protected ModelMapper getModelMapper() {
		return this.modelMapper;
	}
	
	@GetMapping("/findEntidade/{cnpj}")
	public ResponseEntity<EntidadesDto> findEntidadeByCnpj(@PathVariable String cnpj){
		Entidades entity = entidadeService.findByCnpj(cnpj);
		
		if(entity != null) {
			return ResponseEntity.ok(super.convertToDto(entidadeService.findByCnpj(cnpj)));
		} else {
    		return ResponseEntity.noContent().build();
    	}
	}
	
	@GetMapping("/findEntidadeByUser/{username}")
	public ResponseEntity<EntidadesDto> findEntidadeByUser(@PathVariable String username){
		Usuarios entity = usuario.findByusername(username);
		
		if(entity != null) {
			return ResponseEntity.ok(super.convertToDto(entidadeService.findByUser(entity)));
		} else {
    		return ResponseEntity.noContent().build();
    	}
	}
	
	@Override
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public GenericResponse create(@RequestBody @Valid Entidades entidade) {
		Usuarios user = entidade.getUser();
		usuario.save(user);
		entidadeService.save(entidade);
		return new GenericResponse("Registro salvo com sucesso");
	}
	
	@Override
	@PutMapping("{id}")
	public GenericResponse update(@RequestBody @Valid Entidades entidade, @PathVariable Long id) {
		try {
			Entidades ent = entidadeService.findOne(id);
			
			if(ent != null) {
				Usuarios user = entidade.getUser();
				usuario.save(user);
				entidadeService.save(entidade);
				return new GenericResponse("Registro atualizado com sucesso");
			} else {
				return new GenericResponse("Registro inexistente");
			}
		}catch (Exception e) {
			return new GenericResponse("Erro ao atualizar registro!");
		}
	}
	
	@GetMapping("findById/{id}")
	public ResponseEntity<Entidades> findById(@PathVariable Long id){
		Entidades entity = entidadeService.findOne(id);
		
		if(entity != null) {
			return ResponseEntity.ok(entidadeService.findOne(id));
		} else {
			return ResponseEntity.noContent().build();
		}
	}
}
