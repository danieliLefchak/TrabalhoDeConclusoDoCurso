package com.utfpr.TCC.dto;

import com.utfpr.TCC.model.NovaSenha;
import com.utfpr.TCC.model.PossiveisAdotantes;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdotantesSenhaDto {
	@Valid
	private PossiveisAdotantes adotante;
	
	@Valid
	private NovaSenha novaSenha;

}
