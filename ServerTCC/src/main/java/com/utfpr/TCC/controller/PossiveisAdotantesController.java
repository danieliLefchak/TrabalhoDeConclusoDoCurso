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

import com.utfpr.TCC.dto.AdotantesSenhaDto;
import com.utfpr.TCC.dto.PossiveisAdotatesDto;
import com.utfpr.TCC.model.PossiveisAdotantes;
import com.utfpr.TCC.model.Usuarios;
import com.utfpr.TCC.service.CrudService;
import com.utfpr.TCC.service.PossiveisAdotantesService;
import com.utfpr.TCC.service.UsuariosService;
import com.utfpr.TCC.utils.GenericResponse;

import jakarta.validation.Valid;

@RestController
@RequestMapping("possiveisAdotantes")
public class PossiveisAdotantesController extends CrudController<PossiveisAdotantes, PossiveisAdotatesDto, Long>{
	private final PossiveisAdotantesService possiveisAdotantesService;
	private final UsuariosService usuario;
	private ModelMapper modelMapper;
	
	public PossiveisAdotantesController(PossiveisAdotantesService possiveisAdotantesService, ModelMapper modelMapper, UsuariosService usuario) {
		super(PossiveisAdotantes.class, PossiveisAdotatesDto.class);
		this.possiveisAdotantesService = possiveisAdotantesService;
		this.modelMapper = modelMapper;
		this.usuario = usuario;
	}

	@Override
	protected CrudService<PossiveisAdotantes, Long> getService() {
		return this.possiveisAdotantesService;
	}

	@Override
	protected ModelMapper getModelMapper() {
		return this.modelMapper;
	}
	
	@Override
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public GenericResponse create(@RequestBody @Valid PossiveisAdotantes adotante) {
		Usuarios user = adotante.getUser();
		usuario.save(user);
		possiveisAdotantesService.save(adotante);
		return new GenericResponse("Registro salvo com sucesso");
	}
	
	@PutMapping("editar/{id}")
	public GenericResponse update(@RequestBody @Valid AdotantesSenhaDto adotante, @PathVariable Long id) {
		try {
			PossiveisAdotantes ent = possiveisAdotantesService.findOne(id);
			
			if(ent != null) {
				usuario.mudarSenha(adotante.getAdotante().getUser(), 
						adotante.getNovaSenha().getNovaSenha());
				
				possiveisAdotantesService.save(adotante.getAdotante());
				return new GenericResponse("Registro atualizado com sucesso");
			} else {
				return new GenericResponse("Registro inexistente");
			}
		}catch (Exception e) {
			return new GenericResponse("Erro ao atualizar registro!");
		}
	}
	
	@GetMapping("findById/{id}")
	public ResponseEntity<PossiveisAdotantes> findById(@PathVariable Long id){
		PossiveisAdotantes entity = possiveisAdotantesService.findOne(id);
		
		if(entity != null) {
			return ResponseEntity.ok(possiveisAdotantesService.findOne(id));
		} else {
			return ResponseEntity.noContent().build();
		}
	}
	
	@GetMapping("/findAdotanteByUser/{username}")
	public ResponseEntity<PossiveisAdotatesDto> findEntidadeByUser(@PathVariable String username){
		Usuarios entity = usuario.findByusername(username);
		
		if(entity != null) {
			return ResponseEntity.ok(super.convertToDto(possiveisAdotantesService.findByUser(entity)));
		} else {
    		return ResponseEntity.noContent().build();
    	}
	}
}
