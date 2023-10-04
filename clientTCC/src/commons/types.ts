export interface UserLogin {
    username: string;
    password: string;
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
	dataCadastro: Date;
    doencas: String;
    imagens: string;//conferir isso aqui
    entidade: Entidades;
}

export interface Entidades{
    id: number;
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
	inicio_atendimento: number;
	fim_atendimento: number;
}