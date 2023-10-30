package com.utfpr.TCC.model;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
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
public class Interessados {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@NotNull
	@JoinColumn(name="adotantes_id")
	@ManyToOne
	private PossiveisAdotantes adotantes; 
	
	@NotNull
	@JoinColumn(name="animais_id")
	@ManyToOne
	private Animais animais;
	
	private boolean visto;
	
	private boolean realizado;
	
	private boolean cancelado;
	
	private LocalTime horario_visita;
	
	private LocalDate data_visita;
}
