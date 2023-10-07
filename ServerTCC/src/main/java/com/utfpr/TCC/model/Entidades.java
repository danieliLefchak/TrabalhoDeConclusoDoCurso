package com.utfpr.TCC.model;

import java.time.LocalTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Entidades{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	private String nomeFant;
	
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
	
	@JoinColumn(name = "user_id")
	@ManyToOne
	private Usuarios user;
}
