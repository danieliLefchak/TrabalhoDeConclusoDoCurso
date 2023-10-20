package com.utfpr.TCC.controller;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

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
}
