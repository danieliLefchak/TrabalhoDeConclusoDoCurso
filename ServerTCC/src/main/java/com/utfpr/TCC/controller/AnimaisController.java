package com.utfpr.TCC.controller;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.MediaType;

import com.utfpr.TCC.dto.AnimaisDto;
import com.utfpr.TCC.model.Animais;
import com.utfpr.TCC.service.AnimaisService;
import com.utfpr.TCC.service.CrudService;

import jakarta.validation.Valid;

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
	
	@PostMapping(value = "upload", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE, MediaType.APPLICATION_OCTET_STREAM_VALUE})
	public Animais save(@RequestPart("animais") @Valid Animais entity, @RequestPart("imagens") @Valid List<MultipartFile> file) {
		return animaisService.saveWithFile(entity, file);
	}
	
	@PutMapping(value = "upload/{id}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE, MediaType.APPLICATION_OCTET_STREAM_VALUE})
	public Animais update( @PathVariable Long id, @RequestPart("animais") @Valid Animais entity, @RequestPart("imagens") @Valid List<MultipartFile> file) {
		return animaisService.saveWithFile(entity, file);
	}
	
	@GetMapping(value = "lista")
	public List<Animais> findLastTenAnimals() {
		return animaisService.findLastTenAnimals();
	}
	
	@GetMapping(value = "listaPorte/{porte}")
	public List<Animais> findByPorte(@PathVariable String porte) {
		return animaisService.findByPorte(porte);
	}
	
	@GetMapping(value = "listaEspecie/{especie}")
	public List<Animais> findByEspecie(@PathVariable String especie) {
		return animaisService.findByEspecie(especie);
	}
}
