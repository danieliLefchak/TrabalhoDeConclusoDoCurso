package com.utfpr.TCC.dto;

import com.utfpr.TCC.model.Entidades;
import com.utfpr.TCC.model.NovaSenha;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EntidadeSenhaDto {
	@Valid
    private Entidades entidade;

    @Valid
    private NovaSenha novaSenha;
}
