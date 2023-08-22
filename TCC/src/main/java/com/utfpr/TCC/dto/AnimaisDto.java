package com.utfpr.TCC.dto;

import java.time.LocalDate;

import com.utfpr.TCC.model.Entidades;

import lombok.Data;

@Data
public class AnimaisDto {
	private long id;
	
	private String genero;

	private float idade;
	
	private String medicacoes;
	
	private String nome;
	
	private String personalidade;

	private String porte;

	private String raca;
	
	private String especie;
	
	private LocalDate dataCadastro;

	private String doencas;
	
	private Entidades entidade;
}
