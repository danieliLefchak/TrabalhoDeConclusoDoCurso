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
public class Animais {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
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
	
	private Byte[] imagens;
	
	@JoinColumn(name = "entidade_id")
	@ManyToOne
	private Entidades entidade;
}
