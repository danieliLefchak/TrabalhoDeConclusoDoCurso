package com.utfpr.TCC.model;

import java.io.Serializable;

import jakarta.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
public class CompositeInteressados implements Serializable{	
	private long possiveisAdotantes;
	
	private long animais;
}
