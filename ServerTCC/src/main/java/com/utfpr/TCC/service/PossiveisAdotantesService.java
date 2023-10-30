package com.utfpr.TCC.service;

import com.utfpr.TCC.model.PossiveisAdotantes;
import com.utfpr.TCC.model.Usuarios;

public interface PossiveisAdotantesService extends CrudService<PossiveisAdotantes, Long> {
	PossiveisAdotantes findByUser(Usuarios usuario);
}
