export interface UserLogin {
    username: string;
    password: string;
	tipoUsuario: string;
}

export interface Animais {
    id: number;
	genero: String;
	idade: number;
	medicacoes: String;
	nome: String;
	personalidade: String;
    porte: String;
    raca: String;
	especie: String;
    doencas: String;
    imagens?: string;//conferir isso aqui
    entidade: Entidades;
}

export interface Entidades {
    id?: number;
	nomeFant: String;
	cnpj: String;
	endereco: String;
	cidade: String;
	bairro: String;
	estado: String;
	numero_casa: number;
	telefone: String;
	email: String;
	mensagem: String;
	inicio_atendimento: string;
	fim_atendimento: string;
	user: UserLogin;
}

export interface PossiveisAdotantes {
	id?: number;
	bairro: String;
	cidade: String;
	endereco: String;
	estado: String;
	numero_casa: number;
	data_nascimento: Date;
	email: String;
	nomeCompleto: String;
	possui_animal: String;
	profissao: String;
	quantidade_animais: number;
	especie_animais: String;
	user: UserLogin;
}

export interface LinksUteis {
	id?: number;
	link: string;
	titulo: String;
	descricao: String;
	categoria: String;
	entidade: Entidades;
}

export interface Interessados {
	adotantes: PossiveisAdotantes;
	animais: Animais;
	visto: Boolean;
	realizado: Boolean;
	cancelado: Boolean;
}