package com.utfpr.TCC.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NovaSenha {
	private String novaSenha;
	private String confirmarSenha;
}
