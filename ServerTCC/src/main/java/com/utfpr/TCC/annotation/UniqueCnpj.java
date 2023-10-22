package com.utfpr.TCC.annotation;

import com.utfpr.TCC.validacoes.UniqueCnpjValidator;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

@Constraint(validatedBy = UniqueCnpjValidator.class)
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
public @interface UniqueCnpj {
	String message() default "Esse CPJ já existe!";

	Class<?>[] groups() default {};

	Class<? extends Payload>[] payload() default {};
}
