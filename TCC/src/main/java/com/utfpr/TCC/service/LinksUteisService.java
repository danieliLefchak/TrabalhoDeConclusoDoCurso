package com.utfpr.TCC.service;

import com.utfpr.TCC.model.LinksUteis;
import java.util.List;

public interface LinksUteisService extends CrudService<LinksUteis, Long> {
	List<LinksUteis> findByCategoria(String categoria);
}
