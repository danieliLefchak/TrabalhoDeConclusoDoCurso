package com.utfpr.TCC.dto;

import com.utfpr.TCC.model.Entidades;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class LinksUteisDto {
	private long id;
	
	@NotNull
	private String link;
	
	@NotNull
	private String titulo;
	
	private String descricao;
	
	@NotNull
	private String categoria;
	
	private Entidades entidade;
}
