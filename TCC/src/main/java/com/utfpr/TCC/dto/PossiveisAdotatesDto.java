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
	
	private String nome;
	
	private long numero_casa;
	
	private String possui_animal;

	private String profissao;
	
	//se possuir animais qual a quantidade
	private int quantidade_animais;
	
	//se possuir animais quais são as especies deles
	private String especie_animais;
	
	//se funcionar o filtro colocar na tabela
	private LocalDate dataInteresse;
}
