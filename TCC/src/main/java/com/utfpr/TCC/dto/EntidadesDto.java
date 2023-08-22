package com.utfpr.TCC.dto;

import java.time.LocalTime;

import lombok.Data;

@Data
public class EntidadesDto {
	private long id;
	
	private String nome;
	
	private String cnpj;
	
	private String endereco;
	
	private String cidade;
	
	private String bairro;
	
	private String estado;
	
	private long numero_casa;
	
	private String telefone;
	
	private String email;
	
	private String mensagem;
	
	private LocalTime inicio_atendimento;
	
	private LocalTime fim_atendimento;
}
