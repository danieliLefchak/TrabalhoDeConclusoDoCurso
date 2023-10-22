package com.utfpr.TCC.model;

import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotNull;
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
	
	@NotNull
	private String genero;
	
	@NotNull
	private float idade;
	
	private String medicacoes;
	
	@NotNull
	private String nome;
	
	private String personalidade;
	
	@NotNull
	private String porte;

	private String raca;
	
	@NotNull
	private String especie;
	
	private LocalDate dataCadastro;
	
	private String doencas;
	
	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "animal_id")
    private List<Imagem> imagens;
	
	@NotNull
	@JoinColumn(name = "entidade_id")
	@ManyToOne
	private Entidades entidade;
}
