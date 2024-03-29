package com.utfpr.TCC.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.utfpr.TCC.model.Animais;
import com.utfpr.TCC.model.Entidades;

import java.util.List;

public interface AnimaisRepository extends JpaRepository<Animais, Long>{
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
	
	List<Animais> findByEntidade(Entidades entidade);
}
