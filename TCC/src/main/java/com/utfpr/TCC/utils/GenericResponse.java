package com.utfpr.TCC.utils;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class GenericResponse {
	private String menssagem;
	
	public GenericResponse(String menssagem) {
		this.menssagem = menssagem;
	}
}
