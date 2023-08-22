package com.utfpr.TCC.controller;

import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.utfpr.TCC.dto.PossiveisAdotatesDto;
import com.utfpr.TCC.model.PossiveisAdotantes;
import com.utfpr.TCC.service.CrudService;
import com.utfpr.TCC.service.PossiveisAdotantesService;

@RestController
@RequestMapping("possiveisAdotantes")
public class PossiveisAdotantesController extends CrudController<PossiveisAdotantes, PossiveisAdotatesDto, Long>{
	private final PossiveisAdotantesService possiveisAdotantesService;
	private ModelMapper modelMapper;
	
	public PossiveisAdotantesController(PossiveisAdotantesService possiveisAdotantesService, ModelMapper modelMapper) {
		super(PossiveisAdotantes.class, PossiveisAdotatesDto.class);
		this.possiveisAdotantesService = possiveisAdotantesService;
		this.modelMapper = modelMapper;
	}

	@Override
	protected CrudService<PossiveisAdotantes, Long> getService() {
		return this.possiveisAdotantesService;
	}

	@Override
	protected ModelMapper getModelMapper() {
		return this.modelMapper;
	}
}
