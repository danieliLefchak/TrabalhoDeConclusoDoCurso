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
	
	private boolean visto;
	
	private boolean realizado;
	
	private boolean cancelado;
}
