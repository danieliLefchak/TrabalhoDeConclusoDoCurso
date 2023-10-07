package com.utfpr.TCC.model;

import java.time.LocalDate;

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
public class PossiveisAdotantes{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
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
	
	//se possuir animais qual a quantidade
	private int quantidade_animais;
	
	//se possuir animais quais são as especies deles
	private String especie_animais;
	
	//se funcionar o filtro colocar na tabela
	private LocalDate dataInteresse;
	
	@JoinColumn(name = "user_id")
	@ManyToOne
	private Usuarios user;
}
