# backend

Porta: 3000 + número da chamada
npm install pm2 -g
url:https://github.com/WesleyJoseSantos/backend
endpoint: 54.232.30.67:3014

## v0.1.0

Descrição:

Você deverá programar um backend utilizando a porta 3000 + seu número de chamada. O backend deverá:

1 - Conter uma rota raiz que gera a resposta: Backend <nome_aluno> Rodando...

2 - Conter uma rota(cliente) que acessa um banco de dados online, e retorne todos os campos de uma tabela deste banco, (select * from clientes)

3 - Você deve "subir" seu pojeto no github e envia o link do git aqui pelo sigaa.

Dados de acesso ao banco:

host: "aulascefet.c8tuthxylqic.sa-east-1.rds.amazonaws.com",
user: "aluno"
password: "alunoc3f3t"
database: "aulas_web"

## v0.2.0

Implementar rotas para operações CRUD

## v0.3.0

A seguinte tabela foi inserida em nossa base de dados online:

CREATE TABLE `fornecedor` (
  `id_fornecedor` int(11) NOT NULL AUTO_INCREMENT,
  `razao` varchar(100) NOT NULL,
  `cpf_cnpj` varchar(45) NOT NULL,
  `contato` varchar(45) NOT NULL,
  `logradouro` varchar(100) DEFAULT NULL,
  `cidade` varchar(45) DEFAULT NULL,
  `uf` varchar(2) DEFAULT NULL,
  PRIMARY KEY (`id_fornecedor`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

Todo fornecedor deverá enviar sua logomarca junto com o cadastro.
 
Você deverá desenvolver o CRUD para esta tabela e subir a sua aplicação no github.