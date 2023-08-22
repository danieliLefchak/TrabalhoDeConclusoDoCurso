package com.utfpr.TCC.controller;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.utfpr.TCC.dto.LinksUteisDto;
import com.utfpr.TCC.model.LinksUteis;
import com.utfpr.TCC.service.CrudService;
import com.utfpr.TCC.service.LinksUteisService;

@RestController
@RequestMapping("linksUteis")
public class LinksUteisController extends CrudController<LinksUteis, LinksUteisDto, Long>{
	private final LinksUteisService linksUteisService;
	private ModelMapper modelMapper;
	
	public LinksUteisController(LinksUteisService linksUteisService, ModelMapper modelMapper) {
		super(LinksUteis.class, LinksUteisDto.class);
		this.linksUteisService = linksUteisService;
		this.modelMapper = modelMapper;
	}

	@Override
	protected CrudService<LinksUteis, Long> getService() {
		return this.linksUteisService;
	}

	@Override
	protected ModelMapper getModelMapper() {
		return this.modelMapper;
	}
	
	@GetMapping("/findLinkUtil/{categoria}")
	public ResponseEntity<List<LinksUteis>> findLinksUteisByCategoria(@PathVariable String categoria){
		List<LinksUteis> link = linksUteisService.findByCategoria(categoria);
		
		if(link != null) {
			return ResponseEntity.ok(linksUteisService.findByCategoria(categoria));
		} else {
    		return ResponseEntity.noContent().build();
    	}
	}
}
