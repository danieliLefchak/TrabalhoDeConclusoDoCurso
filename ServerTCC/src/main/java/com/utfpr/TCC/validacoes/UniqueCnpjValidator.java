package com.utfpr.TCC.validacoes;

import org.springframework.beans.factory.annotation.Autowired;

import com.utfpr.TCC.annotation.UniqueCnpj;
import com.utfpr.TCC.repository.EntidadesRepository;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class UniqueCnpjValidator implements ConstraintValidator<UniqueCnpj, String> {
	@Autowired
	private EntidadesRepository entidadesRepository;

	@Override
	public boolean isValid(String cnpj, ConstraintValidatorContext context) {
		if(entidadesRepository.findByCnpj(cnpj) == null) {
			return true;
		}
		return false;
	}
}
