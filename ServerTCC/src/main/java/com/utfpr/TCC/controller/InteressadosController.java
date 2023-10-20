package com.utfpr.TCC.controller;

import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.utfpr.TCC.model.Interessados;
import com.utfpr.TCC.service.CrudService;
import com.utfpr.TCC.service.InteressadosService;

@RestController
@RequestMapping("interessados")
public class InteressadosController extends CrudController<Interessados, Interessados, Long>{
	private final InteressadosService interessadosService;
	private ModelMapper modelMapper;
	
	public InteressadosController(InteressadosService interessadosService, ModelMapper modelMapper) {
		super(Interessados.class, Interessados.class);
		this.interessadosService = interessadosService;
		this.modelMapper = modelMapper;
	}

	@Override
	protected CrudService<Interessados, Long> getService() {
		return this.interessadosService;
	}

	@Override
	protected ModelMapper getModelMapper() {
		return this.modelMapper;
	}

}
