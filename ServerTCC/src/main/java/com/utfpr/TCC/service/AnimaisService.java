package com.utfpr.TCC.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.utfpr.TCC.model.Animais;

import jakarta.servlet.http.HttpServletResponse;

public interface AnimaisService extends CrudService<Animais, Long> {
	List<Animais> findByNome(String nome);
	
	List<Animais> findByRaca(String raca);
	
	List<Animais> findByPorte(String porte);
	
	List<Animais> findByEspecie(String especie);
	
	List<Animais> findByPorteAndEspecie(String porte, String especie);
	
	List<Animais> findByPorteAndRaca(String porte, String raca);
	
	List<Animais> findByPorteAndNome(String porte, String nome);
	
	List<Animais> findByRacaAndEspecie(String raca, String especie);
	
	List<Animais> findByRacaAndNome(String raca, String nome);
	
	List<Animais> findByEspecieAndNome(String especie, String nome);
	
	List<Animais> findByPorteAndEspecieAndRaca(String porte, String especie, String raca);
	
	List<Animais> findByPorteAndEspecieAndNome(String porte, String especie, String nome);
	
	List<Animais> findByPorteAndNomeAndRaca(String porte, String nome, String raca);
	
	List<Animais> findByNomeAndEspecieAndRaca(String nome, String especie, String raca);
	
	List<Animais> findByPorteAndEspecieAndRacaAndNome(String porte, String especie, String raca, String nome);
	
	Animais saveWithFile(Animais animal, List<MultipartFile> files);
	
	List<Animais> findLastTenAnimals();
}
