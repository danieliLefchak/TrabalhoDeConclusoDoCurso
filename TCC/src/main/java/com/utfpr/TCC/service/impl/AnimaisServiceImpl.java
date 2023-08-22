package com.utfpr.TCC.service.impl;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import com.utfpr.TCC.model.Animais;
import com.utfpr.TCC.repository.AnimaisRepository;
import com.utfpr.TCC.service.AnimaisService;

@Service
public class AnimaisServiceImpl extends CrudServiceImpl<Animais, Long> implements AnimaisService{
	
	private final AnimaisRepository animaisRepository;
	
	public AnimaisServiceImpl(AnimaisRepository animaisRepository) {
		this.animaisRepository = animaisRepository;
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

}
