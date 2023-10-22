package com.utfpr.TCC.validacoes;

import org.springframework.beans.factory.annotation.Autowired;

import com.utfpr.TCC.annotation.UniqueUserName;
import com.utfpr.TCC.repository.UsuariosRepository;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class UniqueUserNameValidator implements ConstraintValidator<UniqueUserName, String> {
	@Autowired
	private UsuariosRepository usuariosRepository;

	@Override
	public boolean isValid(String nome, ConstraintValidatorContext context) {
		if(usuariosRepository.findByusername(nome)==null) {
			return true;
		}
		return false;
	}

}
