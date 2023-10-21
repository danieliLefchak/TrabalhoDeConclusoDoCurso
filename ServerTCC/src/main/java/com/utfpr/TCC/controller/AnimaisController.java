package com.utfpr.TCC.controller;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.MediaType;

import com.utfpr.TCC.dto.AnimaisDto;
import com.utfpr.TCC.model.Animais;
import com.utfpr.TCC.service.AnimaisService;
import com.utfpr.TCC.service.CrudService;
import com.utfpr.TCC.utils.GenericResponse;

import jakarta.servlet.http.HttpServletResponse;
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
	
	@Override
	public GenericResponse create(@RequestBody @Valid Animais entity) {
		animaisService.save(entity);
		return new GenericResponse("Registro salvo com sucesso");
	}
	
	@PostMapping(value = "upload", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE, MediaType.APPLICATION_OCTET_STREAM_VALUE})
	public GenericResponse createAnimal(@RequestPart("animais") @Valid Animais entity, @RequestPart("imagens") @Valid List<MultipartFile> files) {
	    animaisService.saveWithFile(entity, files);
	    return new GenericResponse("Registro salvo com sucesso");
	}
	
	@GetMapping(value = "download/{id}")
	public  void downloadFile(@PathVariable("id") Long id, HttpServletResponse response) {
		animaisService.downloadFile(id, response);
	}
}
