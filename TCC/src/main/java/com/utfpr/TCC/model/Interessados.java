package com.utfpr.TCC.model;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
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
	//em questões de ter um programa que seja eficiente levando em 
	//consideração que podem sim haver varios adotantes que estejam
	//interessados em varios animais
	@EmbeddedId
	private CompositeInteressados id;
	
	@NotNull
	@MapsId("adotantes")
	@ManyToOne
	private PossiveisAdotantes adotantes; 
	
	@NotNull
	@MapsId("animais")
	@ManyToOne
	private Animais animais;
}
