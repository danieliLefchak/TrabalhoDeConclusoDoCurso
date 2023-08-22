package com.utfpr.TCC.dto;

import com.utfpr.TCC.model.Entidades;

import lombok.Data;

@Data
public class LinksUteisDto {
	private long id;
	
	private String link;
	
	private String titulo;
	
	private String descricao;
	
	private String categoria;
	
	private Entidades entidade;
}
