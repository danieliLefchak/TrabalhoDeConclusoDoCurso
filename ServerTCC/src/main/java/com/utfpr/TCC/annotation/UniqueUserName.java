package com.utfpr.TCC.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import com.utfpr.TCC.validacoes.UniqueUserNameValidator;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

@Constraint(validatedBy = UniqueUserNameValidator.class)
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
public @interface UniqueUserName {
	String message() default "Esse Nome de Usuário já existe!";

	Class<?>[] groups() default {};

	Class<? extends Payload>[] payload() default {};
}
