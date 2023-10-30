package com.utfpr.TCC.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class PossiveisAdotatesDto {
	private long id;
	
	private String bairro;
	
	private String cidade;
	
	private LocalDate data_nascimento;
	
	private String email;

	private String endereco;

	private String estado;
	
	private String nomeCompleto;
	
	private long numero_casa;
	
	private String possui_animal;

	private String profissao;
	
	private int quantidade_animais;
	
	private String especie_animais;
	
	private LocalDate dataInteresse;
}
