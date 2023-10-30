package com.utfpr.TCC.service.impl;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.utfpr.TCC.minio.FileResponse;
import com.utfpr.TCC.minio.FileTypeUtils;
import com.utfpr.TCC.minio.MinioService;
import com.utfpr.TCC.model.Animais;
import com.utfpr.TCC.model.Entidades;
import com.utfpr.TCC.repository.AnimaisRepository;
import com.utfpr.TCC.service.AnimaisService;

@Service
public class AnimaisServiceImpl extends CrudServiceImpl<Animais, Long> implements AnimaisService{
	private final AnimaisRepository animaisRepository;
	private final MinioService minioService;
	
	public AnimaisServiceImpl(AnimaisRepository animaisRepository, MinioService minioService) {
		this.animaisRepository = animaisRepository;
		this.minioService = minioService;
	}
	
	@Override
	public List<Animais> findByNome(String nome) {
		return animaisRepository.findByNome(nome);
	}

	@Override
	public List<Animais> findByRaca(String raca) {
		return animaisRepository.findByRaca(raca);
	}

	@Override
	public List<Animais> findByPorte(String porte) {
		return animaisRepository.findByPorte(porte);
	}

	@Override
	public List<Animais> findByEspecie(String especie) {
		return animaisRepository.findByEspecie(especie);
	}

	@Override
	public List<Animais> findByPorteAndEspecie(String porte, String especie) {
		return animaisRepository.findByPorteAndEspecie(porte, especie);
	}

	@Override
	public List<Animais> findByPorteAndRaca(String porte, String raca) {
		return animaisRepository.findByPorteAndRaca(porte, raca);
	}

	@Override
	public List<Animais> findByPorteAndNome(String porte, String nome) {
		return animaisRepository.findByPorteAndNome(porte, nome);
	}

	@Override
	public List<Animais> findByRacaAndEspecie(String raca, String especie) {
		return animaisRepository.findByRacaAndEspecie(raca, especie);
	}

	@Override
	public List<Animais> findByRacaAndNome(String raca, String nome) {
		return animaisRepository.findByRacaAndNome(raca, nome);
	}

	@Override
	public List<Animais> findByEspecieAndNome(String especie, String nome) {
		return animaisRepository.findByEspecieAndNome(especie, nome);
	}

	@Override
	public List<Animais> findByPorteAndEspecieAndRaca(String porte, String especie, String raca) {
		return animaisRepository.findByPorteAndEspecieAndRaca(porte, especie, raca);
	}

	@Override
	public List<Animais> findByPorteAndEspecieAndNome(String porte, String especie, String nome) {
		return animaisRepository.findByPorteAndEspecieAndNome(porte, especie, nome);
	}

	@Override
	public List<Animais> findByPorteAndNomeAndRaca(String porte, String nome, String raca) {
		return animaisRepository.findByPorteAndNomeAndRaca(porte, nome, raca);
	}

	@Override
	public List<Animais> findByNomeAndEspecieAndRaca(String nome, String especie, String raca) {
		return animaisRepository.findByNomeAndEspecieAndRaca(nome, especie, raca);
	}

	@Override
	public List<Animais> findByPorteAndEspecieAndRacaAndNome(String porte, String especie, String raca, String nome) {
		return animaisRepository.findByPorteAndEspecieAndRacaAndNome(porte, especie, raca, nome);
	}

	@Override
	protected JpaRepository<Animais, Long> getRepository() {
		return this.animaisRepository;
	}
	
	@Override
	public Animais save(Animais entity) {
		LocalDate dataCad = LocalDate.now();
        
        entity.setDataCadastro(dataCad);
		return animaisRepository.save(entity);
	}
	
	@Override
	public Animais saveWithFile(Animais entity, List<MultipartFile> files) {
		if (files != null && !files.isEmpty()) {
	        List<FileResponse> fileResponses = new ArrayList<>();

	        for (MultipartFile file : files) {
	            String fileType = FileTypeUtils.getFileType(file);
	            if (fileType != null) {
	                FileResponse fileResponse = minioService.putObject(file, "imganimais", fileType);
	                fileResponses.add(fileResponse);
	            }
	        }

	        List<String> imagemNomes = fileResponses.stream()
	            .map(FileResponse::getFilename)
	            .collect(Collectors.toList());

	        List<String> conteudoImagens = fileResponses.stream()
	            .map(FileResponse::getContentType)
	            .collect(Collectors.toList());
	        
	        LocalDate dataCad = LocalDate.now();
	        
	        entity.setDataCadastro(dataCad);
	        entity.setImagemNome(imagemNomes);
	        entity.setConteudoImagem(conteudoImagens);
	    }

	    return animaisRepository.save(entity);
	}
	
	@Override
	public List<Animais> findLastTenAnimals(){
		List<Animais> UltimosAnimais = new ArrayList<Animais>();
		
		List<Animais> animais = animaisRepository.findAll();
		
		UltimosAnimais = animais.subList(Math.max(animais.size() - 10, 0), animais.size());
		
		return UltimosAnimais;
	}

	@Override
	public List<Animais> findByEntidade(Entidades entidade) {
		return animaisRepository.findByEntidade(entidade);
	}
}
