package com.utfpr.TCC.service;

import com.utfpr.TCC.model.Usuarios;

public interface UsuariosService extends CrudService<Usuarios, Long>{
	Usuarios findByusername(String nome);
}
