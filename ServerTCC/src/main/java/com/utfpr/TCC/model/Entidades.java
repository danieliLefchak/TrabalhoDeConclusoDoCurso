package com.utfpr.TCC.model;

import java.time.LocalTime;

import org.hibernate.validator.constraints.br.CNPJ;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
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
	
	@NotNull
	private String nomeFant;
	
	@NotNull
	@CNPJ
	private String cnpj;
	
	private String endereco;
	
	@NotNull
	private String cidade;
	
	@NotNull
	private String bairro;
	
	@NotNull
	private String estado;
	
	private long numero_casa;
	
	@NotNull
	@Pattern(regexp = "^(\\+55)?[0-9]{2}[-.\\s]?[0-9]{4,5}[-.\\s]?[0-9]{4}$")
	private String telefone;
	
	@NotNull
	@Pattern(regexp = "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@" 
	        + "[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$")
	private String email;
	
	private String mensagem;
	
	@NotNull
	private LocalTime inicio_atendimento;
	
	@NotNull
	private LocalTime fim_atendimento;
	
	@NotNull
	@JoinColumn(name = "user_id")
	@ManyToOne
	private Usuarios user;
}
