package com.utfpr.TCC.model;

import java.time.LocalDate;

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
public class PossiveisAdotantes{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@NotNull
	private String bairro;
	
	@NotNull
	private String cidade;
	
	@NotNull
	private LocalDate data_nascimento;
	
	@Pattern(regexp = "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@" 
	        + "[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$")
	private String email;
	
	@NotNull
	private String endereco;
	
	@NotNull
	private String estado;
	
	@NotNull
	private String nomeCompleto;
	
	private long numero_casa;
	
	@NotNull
	private String possui_animal;
	
	@NotNull
	private String profissao;
	
	//se possuir animais qual a quantidade
	@NotNull
	private int quantidade_animais;
	
	//se possuir animais quais são as especies deles
	@NotNull
	private String especie_animais;
	
	//se funcionar o filtro colocar na tabela
	private LocalDate dataInteresse;
	
	@NotNull
	@JoinColumn(name = "user_id")
	@ManyToOne
	private Usuarios user;
}
