package com.utfpr.TCC.model;

import java.io.Serializable;

import jakarta.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
public class CompositeInteressados implements Serializable{
	//A classe composite serve para fazer a foreign key composta 
	//do banco de dados.
    //Essa classe é criada para receber a anotação @Embeddable.
	private long possiveisAdotantes;
	
	private long animais;
}
