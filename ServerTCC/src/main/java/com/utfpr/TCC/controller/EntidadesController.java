package com.utfpr.TCC.controller;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.utfpr.TCC.dto.EntidadesDto;
import com.utfpr.TCC.model.Entidades;
import com.utfpr.TCC.service.CrudService;
import com.utfpr.TCC.service.EntidadeService;

@RestController
@RequestMapping("entidades")
public class EntidadesController extends CrudController<Entidades, EntidadesDto, Long>{
	private final EntidadeService entidadeService;
	private ModelMapper modelMapper;
	
	public EntidadesController(EntidadeService entidadeService, ModelMapper modelMapper) {
		super(Entidades.class, EntidadesDto.class);
		this.entidadeService = entidadeService;
		this.modelMapper = modelMapper;
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
}
