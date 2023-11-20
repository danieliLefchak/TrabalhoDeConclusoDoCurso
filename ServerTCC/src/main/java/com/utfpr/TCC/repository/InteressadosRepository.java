package com.utfpr.TCC.repository;

import java.util.List;

import com.utfpr.TCC.model.Entidades;
import org.springframework.data.jpa.repository.JpaRepository;

import com.utfpr.TCC.model.Animais;
import com.utfpr.TCC.model.Interessados;
import com.utfpr.TCC.model.PossiveisAdotantes;

public interface InteressadosRepository extends JpaRepository<Interessados, Long>{
	List<Interessados> findByAnimais(Animais animais);
	List<Interessados> findByAdotantes(PossiveisAdotantes possiveisAdotantes);
}
