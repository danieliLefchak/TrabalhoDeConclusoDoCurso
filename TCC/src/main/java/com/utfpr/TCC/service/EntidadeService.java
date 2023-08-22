package com.utfpr.TCC.service;

import com.utfpr.TCC.model.Entidades;

public interface EntidadeService extends CrudService<Entidades, Long> {
	Entidades findByCnpj(String cnpj);
}
