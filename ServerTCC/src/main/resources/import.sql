insert into tb_authority (authority) values ('ROLE_ADMIN');
insert into tb_authority (authority) values ('ROLE_USER');

-- senha 123
insert into usuarios (password, tipo_usuario, username) values ('$2a$10$m48.B018TZN6k7co3djyj.HEae63nYOoPEOLd22awQ7BzaEKIRlK6', 'adotante', 'Danieli');
insert into usuarios (password, tipo_usuario, username) values ('$2a$10$m48.B018TZN6k7co3djyj.HEae63nYOoPEOLd22awQ7BzaEKIRlK6', 'entidade', 'Dani');

insert into tb_user_authorities (user_id, authority_id) values (1, 2);
insert into tb_user_authorities (user_id, authority_id) values (2, 1);

insert into possiveis_adotantes (bairro, cidade, data_nascimento, email, endereco, especie_animais, estado, nome_completo, numero_casa, possui_animal, profissao, quantidade_animais, user_id) values ('são francisco', 'pato branco', '2001-05-22', 'danieli.marialefchak@gmail.com', 'tv são francisco', 'cachorro', 'pr', 'Danieli Maria Lefchak', 25, 'Sim', 'Estagiaria', 3, 1);

insert into entidades (bairro, cidade, cnpj, email, endereco, estado, fim_atendimento, inicio_atendimento, mensagem, nome_fant, numero_casa, telefone, user_id) values ('são francisco', 'pato branco', '1131313313131313131', 'danieli.marialefchak@gmail.com', 'travessa são francisco', 'pr', '11:09:45', '11:09:45', 'venham ver os dogs', 'danieli', '25', '991183138', 2);

insert into links_uteis (categoria, descricao, entidade_id, link, titulo) values ('Primeiro animal', 'explica cuidados que devem ser tomados ao criar o primeiro gato', 1, 'https://www.gatilspiritland.com.br/meu-primeiro-gato-o-que-fazer', 'Primeiro gato o que fazer');
insert into links_uteis (categoria, descricao, entidade_id, link, titulo) values ('Primeiro animal', 'explica sobre como levar um cachorro para passear', 1, 'https://fresh4pet.com.br/alimentacao-natural/como-passear-com-um-filhote-de-cachorro-pela-primeira-vez/', 'Como passear com um filhote de cachorro pela primeira vez?');

insert into links_uteis (categoria, descricao, entidade_id, link, titulo) values ('Links para denuncia', 'Agora você pode registrar o crime de maus-tratos contra animais pela internet. O novo serviço da Polícia Civil do Paraná permite que você faça o registo sem sair de casa', 1, 'https://www.policiacivil.pr.gov.br/protecaoanimal', 'Delegacia Virtual de Proteção Animal');
insert into links_uteis (categoria, descricao, entidade_id, link, titulo) values ('Links para denuncia', 'explica onde e como denunciar os maus tratos a animais', 1, 'https://www.worldanimalprotection.org.br/denuncia', 'Saiba como denunciar maus-tratos ou crueldade contra animais');

insert into links_uteis (categoria, descricao, entidade_id, link, titulo) values ('Cuidados com animais', 'mostra uma lista de links com informações de cuidados para animais', 1, 'https://www.petz.com.br/blog/cachorros/saude-e-cuidados-cachorros/', ' Tudo relacionado a Saúde e Cuidados de Cachorros');
insert into links_uteis (categoria, descricao, entidade_id, link, titulo) values ('Cuidados com animais', 'explica sobre cuidados para animais de porte grande', 1, 'https://blog.polipet.com.br/caes-de-grande-porte-4-cuidados-diarios-que-eles-exigem/', 'Cães de grande porte: 4 cuidados diários que eles exigem');

















