package com.utfpr.TCC.controller;

import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.utfpr.TCC.dto.AnimaisDto;
import com.utfpr.TCC.model.Animais;
import com.utfpr.TCC.service.AnimaisService;
import com.utfpr.TCC.service.CrudService;

@RestController
@RequestMapping("animais")
public class AnimaisController extends CrudController<Animais, AnimaisDto, Long>{
	private final AnimaisService animaisService;
	private ModelMapper modelMapper;
	
	public AnimaisController(AnimaisService animaisService, ModelMapper modelMapper) {
		super(Animais.class, AnimaisDto.class);
		this.animaisService = animaisService;
		this.modelMapper = modelMapper;
	}

	@Override
	protected CrudService<Animais, Long> getService() {
		return this.animaisService;
	}

	@Override
	protected ModelMapper getModelMapper() {
		return this.modelMapper;
	}
	
	//ver o resto que esta no service e implementar os caminhos aqui
}
