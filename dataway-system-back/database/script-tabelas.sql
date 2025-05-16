-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql server
*/

create database dataway;
use dataway;
	


CREATE TABLE Usuario (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    tipoUsuario ENUM('Empresa', 'Funcionario'),
    foto VARCHAR(255),
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE Empresa (
    idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
    CNPJ CHAR(18) UNIQUE NULL,
    representanteLegal VARCHAR(100) NULL,
    razaoSocial VARCHAR(150) NULL,
    nomeFantasia VARCHAR(100) NULL,
    concessionaria VARCHAR(100),
    Usuario_idUsuario INT NULL,
    FOREIGN KEY (Usuario_idUsuario) REFERENCES Usuario(idUsuario)
);

CREATE TABLE Endereco (
    idEndereco INT PRIMARY KEY AUTO_INCREMENT,
    numero VARCHAR(10),
    bairro VARCHAR(50),
    cep CHAR(9),
    cidade VARCHAR(100),
    estado VARCHAR(50),
    Empresa_idEmpresa INT,
    FOREIGN KEY (Empresa_idEmpresa) REFERENCES Empresa(idEmpresa)
);

CREATE TABLE Notificacoes (
    idNotificacoes INT PRIMARY KEY AUTO_INCREMENT,
    dataHora DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
    mensagem TEXT NULL,
    tipoDestinatario ENUM('Usuario', 'Empresa', 'Funcionario'),
    Usuario_idUsuario INT NULL,
    FOREIGN KEY (Usuario_idUsuario) REFERENCES Usuario(idUsuario)
);


CREATE TABLE DadosPracaPedagio (
    idDadosPracaPedagio INT PRIMARY KEY AUTO_INCREMENT,
    praca VARCHAR(100) NULL,
    lote VARCHAR(50) NULL,
    data DATE NULL,
    hora TIME NULL,
    valor DECIMAL(10,2) NULL,
    sentido VARCHAR(50),
    tpCampo INT,
    quantidade INT NULL,
    Categoria VARCHAR(50),
    Empresa_idEmpresa INT NULL
);