package com.utfpr.TCC.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.utfpr.TCC.model.Usuarios;
import com.utfpr.TCC.service.UsuariosService;
import com.utfpr.TCC.utils.GenericResponse;

import jakarta.validation.Valid;

@RestController
@RequestMapping("usuarios")
public class UsuariosController {
	private final UsuariosService usuariosService;
	
	public UsuariosController(UsuariosService usuariosService) {
		this.usuariosService = usuariosService;
	}
	
	//quando salvar o usuário tem que salvar também o o cadastro dele 
	//seja ele um adotante ou uma entidade, salvar também a permissão
	//dele, criar uma tabela "permissões" e fazer um enum com "adotante"
	//e "entidade" quando for escolhido uma das opções no front antes de 
	//realizar o cadastro para o login, enviar esse tipo pela url para 
	//salvar ele também junto com os outros dois objetos, assim vai dar
	//para cadastrar a permissão que o usuário irá escolher para ele.
	@PostMapping
	public GenericResponse createUser(@RequestBody @Valid Usuarios usuario) {
		usuariosService.save(usuario);
		return new GenericResponse("Registro salvo");
	}
	
	@GetMapping
	public String getString() {
		return "O usuário está autenticado!";
	}
}
