package com.utfpr.TCC.service;

import com.utfpr.TCC.model.Entidades;
import com.utfpr.TCC.model.Usuarios;

public interface EntidadeService extends CrudService<Entidades, Long> {
	Entidades findByCnpj(String cnpj);
	Entidades findByUser(Usuarios usuario);
}
