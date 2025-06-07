DROP DATABASE dataway;
create database dataway;
use dataway;
	


-- ====================================================================================
-- 1) Tabela: Endereco
-- ====================================================================================
CREATE TABLE IF NOT EXISTS Endereco (
    idEndereco INT AUTO_INCREMENT,
    estado        VARCHAR(45),
    cep           VARCHAR(45),
    cidade        VARCHAR(45),
    numero        VARCHAR(45),
    logradouro    VARCHAR(45),
    PRIMARY KEY (idEndereco)
);

-- ====================================================================================
-- 2) Tabela: Empresa
--    - Cada empresa tem um endereço (fkEndereco ➞ Endereco.idEndereco)
-- ====================================================================================
CREATE TABLE IF NOT EXISTS Empresa (
    idEmpresa           INT AUTO_INCREMENT,
    CNPJ                CHAR(18),
    representanteLegal  VARCHAR(100),
    razaoSocial         VARCHAR(150),
    nomeFantasia        VARCHAR(100),
    concessionaria      VARCHAR(45),
    codigoEmpresa 		char(6),
    fkEndereco          INT,
    PRIMARY KEY (idEmpresa),
    KEY idx_Empresa_Endereco (fkEndereco),
    CONSTRAINT fk_Empresa_Endereco
        FOREIGN KEY (fkEndereco)
        REFERENCES Endereco (idEndereco)
);

-- ====================================================================================
-- 3) Tabela: Usuario
--    - A PK é 'cpf', que também é usado como FK em Ocorrencias
--    - Cada usuário pertence a uma empresa (fkEmpresa ➞ Empresa.idEmpresa)
-- ====================================================================================
CREATE TABLE IF NOT EXISTS Usuario (
    cpf           varchar(14),
    tipoUsuario   VARCHAR(45),
    email         VARCHAR(45),
    senha         VARCHAR(45),
    telefone      VARCHAR(45),
    nome          VARCHAR(45),
    codigoEmpresa char(6),
    fkEmpresa     INT,
    PRIMARY KEY (cpf),
    CONSTRAINT fk_Usuario_Empresa
        FOREIGN KEY (fkEmpresa)
        REFERENCES Empresa (idEmpresa)
);


-- ====================================================================================
-- 4) Tabela: Notas
--    - Cada nota está associada a um funcionário (fkFuncionario ➞ Usuario.cpf)
-- ====================================================================================
CREATE TABLE IF NOT EXISTS Notas (
    idNotas        INT AUTO_INCREMENT,
    Descricao      VARCHAR(45),
    MesReferente   VARCHAR(45),
    Concessao      VARCHAR(45),
    Status         ENUM('Alerta', 'Crítico', 'Estável'),
    fkUsuario      VARCHAR(14),
    
    PRIMARY KEY (idNotas),
    CONSTRAINT fk_Notas_Usuario
        FOREIGN KEY (fkUsuario)
        REFERENCES Usuario (cpf)
);


-- ====================================================================================
-- 5) Tabela: Notificacoes
--    - Cada notificação pertence a uma empresa (fkEmpresa ➞ Empresa.idEmpresa)
-- ====================================================================================
CREATE TABLE IF NOT EXISTS Notificacoes (
    idNotificacoes  INT AUTO_INCREMENT,
    dataHora        DATETIME,
    mensagem        VARCHAR(45),
    fkEmpresa       INT,
    PRIMARY KEY (idNotificacoes),
    CONSTRAINT fk_Notificacoes_Empresa
        FOREIGN KEY (fkEmpresa)
        REFERENCES Empresa (idEmpresa)
);


-- ====================================================================================
-- 6) Tabela: DadosPracaPedagio
--    - Cada registro de praça de pedágio pertence a uma empresa (fkEmpresa ➞ Empresa.idEmpresa)
-- ====================================================================================
CREATE TABLE IF NOT EXISTS DadosPracaPedagio (
    idDadosPracaPedagio   INT AUTO_INCREMENT,
    praca                 VARCHAR(100),
    lote                  VARCHAR(100),
    data                  DATE,
    hora                  INT,
    valor                 DECIMAL(10,2),
    sentido               VARCHAR(100),
    tpCampo               VARCHAR(50),
    quantidade            INT,
    Categoria             VARCHAR(50),
    fkEmpresa             INT,
    PRIMARY KEY (idDadosPracaPedagio),
    CONSTRAINT fk_DadosPracaPedagio_Empresa
        FOREIGN KEY (fkEmpresa)
        REFERENCES Empresa (idEmpresa)
);
select * from Usuario;

SELECT distinct(lote) as 'concessionaria', sum(quantidade) as 'trafego' FROM Usuario 
	JOIN DadosPracaPedagio as dp on dp.fkEmpresa = Usuario.fkEmpresa group by lote;

INSERT INTO Empresa (CNPJ, representanteLegal, razaoSocial, nomeFantasia, concessionaria)
VALUES 
('12.345.678/0001-90', 'João Silva', 'Alpha Soluções LTDA', 'AlphaTech', 'Concessionária A'),
('98.765.432/0001-10', 'Maria Oliveira', 'Beta Tecnologia S.A.', 'BetaSoft', 'Concessionária B'),
('11.223.344/0001-55', 'Carlos Souza', 'Gama Indústria e Comércio', 'GamaCorp', 'Concessionária C');
INSERT INTO Usuario (tipoUsuario, email, senha, telefone, nome, cpf, fkEmpresa)
VALUES 
('Empresa', 'contato@empresa1.com', 'senha123', '(11) 98765-4321', 'Empresa Alpha', '4141312', 1),
('Empresa', 'contato@empresa2.com', 'senha456', '(21) 91234-5678', 'Empresa Beta', '123313212', 2),
('Empresa', 'contato@empresa3.com', 'senha789', '(31) 99876-5432', 'Empresa Gama', '321123312', 1);



INSERT INTO DadosPracaPedagio (praca, lote, data, hora, valor, sentido, tpCampo, quantidade, Categoria, fkEmpresa) VALUES
('Praça Norte', 'AUTOBAN', '2024-01-05', 6, 9.50, 'Norte', 0, 145, 'Leve', 1),
('Praça Sul', 'AUTOBAN', '2024-01-05', 7, 13.80, 'Sul', 1, 92, 'Pesado', 2),
('Praça Central', 'AUTOBAN', '2024-01-10', 8, 6.20, 'Norte', 2, 180, 'Motocicleta', 3),
('Praça Leste', 'AUTOBAN', '2024-01-15', 9, 11.40, 'Leste', 0, 118, 'Leve', 1),
('Praça Oeste', 'AUTOBAN', '2024-01-20', 10, 17.90, 'Oeste', 1, 83, 'Pesado', 2),
('Praça Norte', 'AUTOBAN', '2024-01-25', 11, 10.10, 'Norte', 2, 132, 'Leve', 3),
('Praça Sul', 'AUTOBAN', '2024-01-30', 12, 14.25, 'Sul', 0, 96, 'Pesado', 1),

-- FEVEREIRO 2024
('Praça Central', 'AUTOBAN', '2024-02-02', 13, 7.10, 'Norte', 1, 195, 'Motocicleta', 2),
('Praça Leste', 'AUTOBAN', '2024-02-08', 14, 12.60, 'Leste', 2, 108, 'Leve', 3),
('Praça Oeste', 'AUTOBAN', '2024-02-14', 15, 18.40, 'Oeste', 0, 74, 'Pesado', 1),
('Praça Norte', 'AUTOBAN', '2024-02-20', 16, 9.80, 'Norte', 1, 138, 'Leve', 2),
('Praça Sul', 'AUTOBAN', '2024-02-25', 17, 15.70, 'Sul', 2, 89, 'Pesado', 3),
('Praça Central', 'AUTOBAN', '2024-02-28', 18, 6.90, 'Norte', 0, 204, 'Motocicleta', 1),

-- MARÇO 2024
('Praça Leste', 'AUTOBAN', '2024-03-03', 6, 11.85, 'Leste', 1, 124, 'Leve', 2),
('Praça Oeste', 'AUTOBAN', '2024-03-09', 7, 19.20, 'Oeste', 2, 78, 'Pesado', 3),
('Praça Norte', 'AUTOBAN', '2024-03-15', 8, 10.45, 'Norte', 0, 141, 'Leve', 1),
('Praça Sul', 'AUTOBAN', '2024-03-21', 9, 14.95, 'Sul', 1, 93, 'Pesado', 2),
('Praça Central', 'AUTOBAN', '2024-03-27', 10, 7.35, 'Norte', 2, 188, 'Motocicleta', 3),

-- ABRIL 2024
('Praça Leste', 'AUTOBAN', '2024-04-04', 11, 12.15, 'Leste', 0, 115, 'Leve', 1),
('Praça Oeste', 'AUTOBAN', '2024-04-10', 12, 18.60, 'Oeste', 1, 81, 'Pesado', 2),
('Praça Norte', 'AUTOBAN', '2024-04-16', 13, 9.95, 'Norte', 2, 129, 'Leve', 3),
('Praça Sul', 'AUTOBAN', '2024-04-22', 14, 15.40, 'Sul', 0, 87, 'Pesado', 1),
('Praça Central', 'AUTOBAN', '2024-04-28', 15, 6.75, 'Norte', 1, 210, 'Motocicleta', 2),

-- MAIO 2024
('Praça Leste', 'AUTOBAN', '2024-05-05', 16, 11.70, 'Leste', 2, 122, 'Leve', 3),
('Praça Oeste', 'AUTOBAN', '2024-05-11', 17, 17.85, 'Oeste', 0, 76, 'Pesado', 1),
('Praça Norte', 'AUTOBAN', '2024-05-17', 18, 10.25, 'Norte', 1, 136, 'Leve', 2),
('Praça Sul', 'AUTOBAN', '2024-05-23', 19, 14.10, 'Sul', 2, 94, 'Pesado', 3),
('Praça Central', 'AUTOBAN', '2024-05-29', 6, 7.55, 'Norte', 0, 192, 'Motocicleta', 1),

-- JUNHO 2024
('Praça Leste', 'AUTOBAN', '2024-06-06', 7, 12.90, 'Leste', 1, 113, 'Leve', 2),
('Praça Oeste', 'AUTOBAN', '2024-06-12', 8, 19.75, 'Oeste', 2, 72, 'Pesado', 3),
('Praça Norte', 'AUTOBAN', '2024-06-18', 9, 9.65, 'Norte', 0, 143, 'Leve', 1),
('Praça Sul', 'AUTOBAN', '2024-06-24', 10, 16.30, 'Sul', 1, 85, 'Pesado', 2),
('Praça Central', 'AUTOBAN', '2024-06-30', 11, 6.95, 'Norte', 2, 198, 'Motocicleta', 3),

-- JULHO 2024
('Praça Leste', 'AUTOBAN', '2024-07-07', 12, 11.55, 'Leste', 0, 127, 'Leve', 1),
('Praça Oeste', 'AUTOBAN', '2024-07-13', 13, 18.20, 'Oeste', 1, 79, 'Pesado', 2),
('Praça Norte', 'AUTOBAN', '2024-07-19', 14, 10.80, 'Norte', 2, 134, 'Leve', 3),
('Praça Sul', 'AUTOBAN', '2024-07-25', 15, 15.85, 'Sul', 0, 91, 'Pesado', 1),
('Praça Central', 'AUTOBAN', '2024-07-31', 16, 7.20, 'Norte', 1, 186, 'Motocicleta', 2),

-- AGOSTO 2024
('Praça Leste', 'AUTOBAN', '2024-08-08', 17, 12.35, 'Leste', 2, 119, 'Leve', 3),
('Praça Oeste', 'AUTOBAN', '2024-08-14', 18, 17.50, 'Oeste', 0, 82, 'Pesado', 1),
('Praça Norte', 'AUTOBAN', '2024-08-20', 19, 9.40, 'Norte', 1, 147, 'Leve', 2),
('Praça Sul', 'AUTOBAN', '2024-08-26', 6, 14.65, 'Sul', 2, 88, 'Pesado', 3),
('Praça Central', 'AUTOBAN', '2024-08-30', 7, 6.85, 'Norte', 0, 205, 'Motocicleta', 1),

-- SETEMBRO 2024
('Praça Leste', 'AUTOBAN', '2024-09-05', 8, 11.95, 'Leste', 1, 116, 'Leve', 2),
('Praça Oeste', 'AUTOBAN', '2024-09-11', 9, 19.40, 'Oeste', 2, 75, 'Pesado', 3),
('Praça Norte', 'AUTOBAN', '2024-09-17', 10, 10.15, 'Norte', 0, 139, 'Leve', 1),
('Praça Sul', 'AUTOBAN', '2024-09-23', 11, 15.20, 'Sul', 1, 92, 'Pesado', 2),
('Praça Central', 'AUTOBAN', '2024-09-29', 12, 7.45, 'Norte', 2, 194, 'Motocicleta', 3),

-- OUTUBRO 2024
('Praça Leste', 'AUTOBAN', '2024-10-06', 13, 12.80, 'Leste', 0, 121, 'Leve', 1),
('Praça Oeste', 'AUTOBAN', '2024-10-12', 14, 18.95, 'Oeste', 1, 77, 'Pesado', 2),
('Praça Norte', 'AUTOBAN', '2024-10-18', 15, 9.25, 'Norte', 2, 144, 'Leve', 3),
('Praça Sul', 'AUTOBAN', '2024-10-24', 16, 16.10, 'Sul', 0, 86, 'Pesado', 1),
('Praça Central', 'AUTOBAN', '2024-10-30', 17, 6.60, 'Norte', 1, 215, 'Motocicleta', 2),

-- NOVEMBRO 2024
('Praça Leste', 'AUTOBAN', '2024-11-07', 18, 11.10, 'Leste', 2, 125, 'Leve', 3),
('Praça Oeste', 'AUTOBAN', '2024-11-13', 19, 17.25, 'Oeste', 0, 80, 'Pesado', 1),
('Praça Norte', 'AUTOBAN', '2024-11-19', 6, 10.60, 'Norte', 1, 131, 'Leve', 2),
('Praça Sul', 'AUTOBAN', '2024-11-25', 7, 14.80, 'Sul', 2, 95, 'Pesado', 3),
('Praça Central', 'AUTOBAN', '2024-11-29', 8, 7.80, 'Norte', 0, 201, 'Motocicleta', 1),

-- DEZEMBRO 2024
('Praça Leste', 'AUTOBAN', '2024-12-05', 9, 13.45, 'Leste', 1, 114, 'Leve', 2),
('Praça Oeste', 'AUTOBAN', '2024-12-11', 10, 20.15, 'Oeste', 2, 73, 'Pesado', 3),
('Praça Norte', 'AUTOBAN', '2024-12-17', 11, 9.85, 'Norte', 0, 148, 'Leve', 1),
('Praça Sul', 'AUTOBAN', '2024-12-23', 12, 15.60, 'Sul', 1, 89, 'Pesado', 2),
('Praça Central', 'AUTOBAN', '2024-12-29', 13, 6.40, 'Norte', 2, 208, 'Motocicleta', 3),

-- Registros adicionais para maior variação
('Praça Norte', 'AUTOBAN', '2024-01-12', 14, 10.30, 'Sul', 0, 126, 'Leve', 1),
('Praça Sul', 'AUTOBAN', '2024-02-18', 15, 14.45, 'Norte', 1, 97, 'Pesado', 2),
('Praça Leste', 'AUTOBAN', '2024-03-24', 16, 11.75, 'Oeste', 2, 112, 'Leve', 3),
('Praça Oeste', 'AUTOBAN', '2024-04-30', 17, 18.10, 'Leste', 0, 84, 'Pesado', 1),
('Praça Central', 'AUTOBAN', '2024-05-06', 18, 7.65, 'Sul', 1, 189, 'Motocicleta', 2),
('Praça Norte', 'AUTOBAN', '2024-06-12', 19, 9.90, 'Norte', 2, 135, 'Leve', 3),
('Praça Sul', 'AUTOBAN', '2024-07-18', 6, 16.20, 'Sul', 0, 90, 'Pesado', 1),
('Praça Leste', 'AUTOBAN', '2024-08-24', 7, 12.50, 'Leste', 1, 117, 'Leve', 2),
('Praça Oeste', 'AUTOBAN', '2024-09-30', 8, 19.80, 'Oeste', 2, 71, 'Pesado', 3),
('Praça Central', 'AUTOBAN', '2024-10-06', 9, 6.25, 'Norte', 0, 220, 'Motocicleta', 1),
('Praça Norte', 'AUTOBAN', '2024-11-12', 10, 10.70, 'Sul', 1, 128, 'Leve', 2),
('Praça Sul', 'AUTOBAN', '2024-12-18', 11, 15.35, 'Norte', 2, 93, 'Pesado', 3);

INSERT INTO DadosPracaPedagio (praca, lote, data, hora, valor, sentido, tpCampo, quantidade, Categoria, fkEmpresa) VALUES
('Praça Norte', 'AUTOBAN', '2024-01-05', 6, 9.50, 'Norte', 2, 145, 'Leve', 1),
('Praça Sul', 'AUTOBAN', '2024-01-05', 7, 13.80, 'Sul', 2, 92, 'Pesado', 2),
('Praça Central', 'AUTOBAN', '2024-01-10', 8, 6.20, 'Norte', 2, 180, 'Motocicleta', 3),
('Praça Leste', 'AUTOBAN', '2024-01-15', 9, 11.40, 'Leste', 2, 118, 'Leve', 1),
('Praça Oeste', 'AUTOBAN', '2024-01-20', 10, 17.90, 'Oeste', 2, 83, 'Pesado', 2),
('Praça Norte', 'AUTOBAN', '2024-01-25', 11, 10.10, 'Norte', 2, 132, 'Leve', 3),
('Praça Sul', 'AUTOBAN', '2024-01-30', 12, 14.25, 'Sul', 2, 96, 'Pesado', 1),

-- FEVEREIRO 2024
('Praça Central', 'AUTOBAN', '2024-02-02', 13, 7.10, 'Norte', 2, 195, 'Motocicleta', 2),
('Praça Leste', 'AUTOBAN', '2024-02-08', 14, 12.60, 'Leste', 2, 108, 'Leve', 3),
('Praça Oeste', 'AUTOBAN', '2024-02-14', 15, 18.40, 'Oeste', 2, 74, 'Pesado', 1),
('Praça Norte', 'AUTOBAN', '2024-02-20', 16, 9.80, 'Norte', 2, 138, 'Leve', 2),
('Praça Sul', 'AUTOBAN', '2024-02-25', 17, 15.70, 'Sul', 2, 89, 'Pesado', 3),
('Praça Central', 'AUTOBAN', '2024-02-28', 18, 6.90, 'Norte', 2, 204, 'Motocicleta', 1),

-- MARÇO 2024
('Praça Leste', 'AUTOBAN', '2024-03-03', 6, 11.85, 'Leste', 2, 124, 'Leve', 2),
('Praça Oeste', 'AUTOBAN', '2024-03-09', 7, 19.20, 'Oeste', 2, 78, 'Pesado', 3),
('Praça Norte', 'AUTOBAN', '2024-03-15', 8, 10.45, 'Norte', 2, 141, 'Leve', 1),
('Praça Sul', 'AUTOBAN', '2024-03-21', 9, 14.95, 'Sul', 2, 93, 'Pesado', 2),
('Praça Central', 'AUTOBAN', '2024-03-27', 10, 7.35, 'Norte', 2, 188, 'Motocicleta', 3),

-- ABRIL 2024
('Praça Leste', 'AUTOBAN', '2024-04-04', 11, 12.15, 'Leste', 2, 115, 'Leve', 1),
('Praça Oeste', 'AUTOBAN', '2024-04-10', 12, 18.60, 'Oeste', 2, 81, 'Pesado', 2),
('Praça Norte', 'AUTOBAN', '2024-04-16', 13, 9.95, 'Norte', 2, 129, 'Leve', 3),
('Praça Sul', 'AUTOBAN', '2024-04-22', 14, 15.40, 'Sul', 2, 87, 'Pesado', 1),
('Praça Central', 'AUTOBAN', '2024-04-28', 15, 6.75, 'Norte', 2, 210, 'Motocicleta', 2),

-- MAIO 2024
('Praça Leste', 'AUTOBAN', '2024-05-05', 16, 11.70, 'Leste', 2, 122, 'Leve', 3),
('Praça Oeste', 'AUTOBAN', '2024-05-11', 17, 17.85, 'Oeste', 2, 76, 'Pesado', 1),
('Praça Norte', 'AUTOBAN', '2024-05-17', 18, 10.25, 'Norte', 2, 136, 'Leve', 2),
('Praça Sul', 'AUTOBAN', '2024-05-23', 19, 14.10, 'Sul', 2, 94, 'Pesado', 3),
('Praça Central', 'AUTOBAN', '2024-05-29', 6, 7.55, 'Norte', 2, 192, 'Motocicleta', 1),

-- JUNHO 2024
('Praça Leste', 'AUTOBAN', '2024-06-06', 7, 12.90, 'Leste', 2, 113, 'Leve', 2),
('Praça Oeste', 'AUTOBAN', '2024-06-12', 8, 19.75, 'Oeste', 2, 72, 'Pesado', 3),
('Praça Norte', 'AUTOBAN', '2024-06-18', 9, 9.65, 'Norte', 2, 143, 'Leve', 1),
('Praça Sul', 'AUTOBAN', '2024-06-24', 10, 16.30, 'Sul', 2, 85, 'Pesado', 2),
('Praça Central', 'AUTOBAN', '2024-06-30', 11, 6.95, 'Norte', 2, 198, 'Motocicleta', 3),

-- JULHO 2024
('Praça Leste', 'AUTOBAN', '2024-07-07', 12, 11.55, 'Leste', 2, 127, 'Leve', 1),
('Praça Oeste', 'AUTOBAN', '2024-07-13', 13, 18.20, 'Oeste', 2, 79, 'Pesado', 2),
('Praça Norte', 'AUTOBAN', '2024-07-19', 14, 10.80, 'Norte', 2, 134, 'Leve', 3),
('Praça Sul', 'AUTOBAN', '2024-07-25', 15, 15.85, 'Sul', 2, 91, 'Pesado', 1),
('Praça Central', 'AUTOBAN', '2024-07-31', 16, 7.20, 'Norte', 2, 186, 'Motocicleta', 2),

-- AGOSTO 2024
('Praça Leste', 'AUTOBAN', '2024-08-08', 17, 12.35, 'Leste', 2, 119, 'Leve', 3),
('Praça Oeste', 'AUTOBAN', '2024-08-14', 18, 17.50, 'Oeste', 2, 82, 'Pesado', 1),
('Praça Norte', 'AUTOBAN', '2024-08-20', 19, 9.40, 'Norte', 2, 147, 'Leve', 2),
('Praça Sul', 'AUTOBAN', '2024-08-26', 6, 14.65, 'Sul', 2, 88, 'Pesado', 3),
('Praça Central', 'AUTOBAN', '2024-08-30', 7, 6.85, 'Norte', 2, 205, 'Motocicleta', 1),

-- SETEMBRO 2024
('Praça Leste', 'AUTOBAN', '2024-09-05', 8, 11.95, 'Leste', 2, 116, 'Leve', 2),
('Praça Oeste', 'AUTOBAN', '2024-09-11', 9, 19.40, 'Oeste', 2, 75, 'Pesado', 3),
('Praça Norte', 'AUTOBAN', '2024-09-17', 10, 10.15, 'Norte', 2, 139, 'Leve', 1),
('Praça Sul', 'AUTOBAN', '2024-09-23', 11, 15.20, 'Sul', 2, 92, 'Pesado', 2),
('Praça Central', 'AUTOBAN', '2024-09-29', 12, 7.45, 'Norte', 2, 194, 'Motocicleta', 3),

-- OUTUBRO 2024
('Praça Leste', 'AUTOBAN', '2024-10-06', 13, 12.80, 'Leste', 2, 121, 'Leve', 1),
('Praça Oeste', 'AUTOBAN', '2024-10-12', 14, 18.95, 'Oeste', 2, 77, 'Pesado', 2),
('Praça Norte', 'AUTOBAN', '2024-10-18', 15, 9.25, 'Norte', 2, 144, 'Leve', 3),
('Praça Sul', 'AUTOBAN', '2024-10-24', 16, 16.10, 'Sul', 2, 86, 'Pesado', 1),
('Praça Central', 'AUTOBAN', '2024-10-30', 17, 6.60, 'Norte', 2, 215, 'Motocicleta', 2),

-- NOVEMBRO 2024
('Praça Leste', 'AUTOBAN', '2024-11-07', 18, 11.10, 'Leste', 2, 125, 'Leve', 3),
('Praça Oeste', 'AUTOBAN', '2024-11-13', 19, 17.25, 'Oeste', 2, 80, 'Pesado', 1),
('Praça Norte', 'AUTOBAN', '2024-11-19', 6, 10.60, 'Norte', 2, 131, 'Leve', 2),
('Praça Sul', 'AUTOBAN', '2024-11-25', 7, 14.80, 'Sul', 2, 95, 'Pesado', 3),
('Praça Central', 'AUTOBAN', '2024-11-29', 8, 7.80, 'Norte', 2, 201, 'Motocicleta', 1),

-- DEZEMBRO 2024
('Praça Leste', 'AUTOBAN', '2024-12-05', 9, 13.45, 'Leste', 2, 114, 'Leve', 2),
('Praça Oeste', 'AUTOBAN', '2024-12-11', 10, 20.15, 'Oeste', 2, 73, 'Pesado', 3),
('Praça Norte', 'AUTOBAN', '2024-12-17', 11, 9.85, 'Norte', 2, 148, 'Leve', 1),
('Praça Sul', 'AUTOBAN', '2024-12-23', 12, 15.60, 'Sul', 2, 89, 'Pesado', 2),
('Praça Central', 'AUTOBAN', '2024-12-29', 13, 6.40, 'Norte', 2, 208, 'Motocicleta', 3),

-- Registros adicionais para maior variação
('Praça Norte', 'AUTOBAN', '2024-01-12', 14, 10.30, 'Sul', 2, 126, 'Leve', 1),
('Praça Sul', 'AUTOBAN', '2024-02-18', 15, 14.45, 'Norte', 2, 97, 'Pesado', 2),
('Praça Leste', 'AUTOBAN', '2024-03-24', 16, 11.75, 'Oeste', 2, 112, 'Leve', 3),
('Praça Oeste', 'AUTOBAN', '2024-04-30', 17, 18.10, 'Leste', 2, 84, 'Pesado', 1),
('Praça Central', 'AUTOBAN', '2024-05-06', 18, 7.65, 'Sul', 2, 189, 'Motocicleta', 2),
('Praça Norte', 'AUTOBAN', '2024-06-12', 19, 9.90, 'Norte', 2, 135, 'Leve', 3),
('Praça Sul', 'AUTOBAN', '2024-07-18', 6, 16.20, 'Sul', 2, 90, 'Pesado', 1),
('Praça Leste', 'AUTOBAN', '2024-08-24', 7, 12.50, 'Leste', 2, 117, 'Leve', 2),
('Praça Oeste', 'AUTOBAN', '2024-09-30', 8, 19.80, 'Oeste', 2, 71, 'Pesado', 3),
('Praça Central', 'AUTOBAN', '2024-10-06', 9, 6.25, 'Norte', 2, 220, 'Motocicleta', 1),
('Praça Norte', 'AUTOBAN', '2024-11-12', 10, 10.70, 'Sul', 2, 128, 'Leve', 2),
('Praça Sul', 'AUTOBAN', '2024-12-18', 11, 15.35, 'Norte', 2, 93, 'Pesado', 3),

-- Registros extras para completar a variação anual
('Praça Leste', 'AUTOBAN', '2024-01-28', 12, 11.25, 'Leste', 2, 109, 'Leve', 1),
('Praça Oeste', 'AUTOBAN', '2024-02-29', 13, 17.75, 'Oeste', 2, 87, 'Pesado', 2),
('Praça Central', 'AUTOBAN', '2024-03-31', 14, 6.55, 'Norte', 2, 196, 'Motocicleta', 3),
('Praça Norte', 'AUTOBAN', '2024-04-15', 15, 10.05, 'Sul', 2, 140, 'Leve', 1),
('Praça Sul', 'AUTOBAN', '2024-05-31', 16, 14.90, 'Sul', 2, 98, 'Pesado', 2),
('Praça Leste', 'AUTOBAN', '2024-06-25', 17, 12.40, 'Leste', 2, 106, 'Leve', 3),
('Praça Oeste', 'AUTOBAN', '2024-07-30', 18, 18.85, 'Oeste', 2, 74, 'Pesado', 1),
('Praça Central', 'AUTOBAN', '2024-08-15', 19, 7.15, 'Norte', 2, 203, 'Motocicleta', 2),
('Praça Norte', 'AUTOBAN', '2024-09-28', 6, 9.75, 'Norte', 2, 133, 'Leve', 3),
('Praça Sul', 'AUTOBAN', '2024-10-31', 7, 15.75, 'Sul', 2, 91, 'Pesado', 1),
('Praça Leste', 'AUTOBAN', '2024-11-30', 8, 11.60, 'Leste', 2, 120, 'Leve', 2),
('Praça Oeste', 'AUTOBAN', '2024-12-31', 9, 19.95, 'Oeste', 2, 69, 'Pesado', 3);

INSERT INTO DadosPracaPedagio (praca, lote, data, hora, valor, sentido, tpCampo, quantidade, Categoria, fkEmpresa) VALUES
('Praça Norte', 'ECOVIAS', '2024-01-05', 6, 9.50, 'Norte', 0, 145, 'Leve', 1),
('Praça Sul', 'ECOVIAS', '2024-01-05', 7, 13.80, 'Sul', 1, 92, 'Pesado', 2),
('Praça Central', 'ECOVIAS', '2024-01-10', 8, 6.20, 'Norte', 2, 180, 'Motocicleta', 3),
('Praça Leste', 'ECOVIAS', '2024-01-15', 9, 11.40, 'Leste', 0, 118, 'Leve', 1),
('Praça Oeste', 'ECOVIAS', '2024-01-20', 10, 17.90, 'Oeste', 1, 83, 'Pesado', 2),
('Praça Norte', 'ECOVIAS', '2024-01-25', 11, 10.10, 'Norte', 2, 132, 'Leve', 3),
('Praça Sul', 'ECOVIAS', '2024-01-30', 12, 14.25, 'Sul', 0, 96, 'Pesado', 1),

-- FEVEREIRO 2024
('Praça Central', 'ECOVIAS', '2024-02-02', 13, 7.10, 'Norte', 1, 195, 'Motocicleta', 2),
('Praça Leste', 'ECOVIAS', '2024-02-08', 14, 12.60, 'Leste', 2, 108, 'Leve', 3),
('Praça Oeste', 'ECOVIAS', '2024-02-14', 15, 18.40, 'Oeste', 0, 74, 'Pesado', 1),
('Praça Norte', 'ECOVIAS', '2024-02-20', 16, 9.80, 'Norte', 1, 138, 'Leve', 2),
('Praça Sul', 'ECOVIAS', '2024-02-25', 17, 15.70, 'Sul', 2, 89, 'Pesado', 3),
('Praça Central', 'ECOVIAS', '2024-02-28', 18, 6.90, 'Norte', 0, 204, 'Motocicleta', 1),

-- MARÇO 2024
('Praça Leste', 'ECOVIAS', '2024-03-03', 6, 11.85, 'Leste', 1, 124, 'Leve', 2),
('Praça Oeste', 'ECOVIAS', '2024-03-09', 7, 19.20, 'Oeste', 2, 78, 'Pesado', 3),
('Praça Norte', 'ECOVIAS', '2024-03-15', 8, 10.45, 'Norte', 0, 141, 'Leve', 1),
('Praça Sul', 'ECOVIAS', '2024-03-21', 9, 14.95, 'Sul', 1, 93, 'Pesado', 2),
('Praça Central', 'ECOVIAS', '2024-03-27', 10, 7.35, 'Norte', 2, 188, 'Motocicleta', 3),

-- ABRIL 2024
('Praça Leste', 'ECOVIAS', '2024-04-04', 11, 12.15, 'Leste', 0, 115, 'Leve', 1),
('Praça Oeste', 'ECOVIAS', '2024-04-10', 12, 18.60, 'Oeste', 1, 81, 'Pesado', 2),
('Praça Norte', 'ECOVIAS', '2024-04-16', 13, 9.95, 'Norte', 2, 129, 'Leve', 3),
('Praça Sul', 'ECOVIAS', '2024-04-22', 14, 15.40, 'Sul', 0, 87, 'Pesado', 1),
('Praça Central', 'ECOVIAS', '2024-04-28', 15, 6.75, 'Norte', 1, 210, 'Motocicleta', 2),

-- MAIO 2024
('Praça Leste', 'ECOVIAS', '2024-05-05', 16, 11.70, 'Leste', 2, 122, 'Leve', 3),
('Praça Oeste', 'ECOVIAS', '2024-05-11', 17, 17.85, 'Oeste', 0, 76, 'Pesado', 1),
('Praça Norte', 'ECOVIAS', '2024-05-17', 18, 10.25, 'Norte', 1, 136, 'Leve', 2),
('Praça Sul', 'ECOVIAS', '2024-05-23', 19, 14.10, 'Sul', 2, 94, 'Pesado', 3),
('Praça Central', 'ECOVIAS', '2024-05-29', 6, 7.55, 'Norte', 0, 192, 'Motocicleta', 1),

-- JUNHO 2024
('Praça Leste', 'ECOVIAS', '2024-06-06', 7, 12.90, 'Leste', 1, 113, 'Leve', 2),
('Praça Oeste', 'ECOVIAS', '2024-06-12', 8, 19.75, 'Oeste', 2, 72, 'Pesado', 3),
('Praça Norte', 'ECOVIAS', '2024-06-18', 9, 9.65, 'Norte', 0, 143, 'Leve', 1),
('Praça Sul', 'ECOVIAS', '2024-06-24', 10, 16.30, 'Sul', 1, 85, 'Pesado', 2),
('Praça Central', 'ECOVIAS', '2024-06-30', 11, 6.95, 'Norte', 2, 198, 'Motocicleta', 3),

-- JULHO 2024
('Praça Leste', 'ECOVIAS', '2024-07-07', 12, 11.55, 'Leste', 0, 127, 'Leve', 1),
('Praça Oeste', 'ECOVIAS', '2024-07-13', 13, 18.20, 'Oeste', 1, 79, 'Pesado', 2),
('Praça Norte', 'ECOVIAS', '2024-07-19', 14, 10.80, 'Norte', 2, 134, 'Leve', 3),
('Praça Sul', 'ECOVIAS', '2024-07-25', 15, 15.85, 'Sul', 0, 91, 'Pesado', 1),
('Praça Central', 'ECOVIAS', '2024-07-31', 16, 7.20, 'Norte', 1, 186, 'Motocicleta', 2),

-- AGOSTO 2024
('Praça Leste', 'ECOVIAS', '2024-08-08', 17, 12.35, 'Leste', 2, 119, 'Leve', 3),
('Praça Oeste', 'ECOVIAS', '2024-08-14', 18, 17.50, 'Oeste', 0, 82, 'Pesado', 1),
('Praça Norte', 'ECOVIAS', '2024-08-20', 19, 9.40, 'Norte', 1, 147, 'Leve', 2),
('Praça Sul', 'ECOVIAS', '2024-08-26', 6, 14.65, 'Sul', 2, 88, 'Pesado', 3),
('Praça Central', 'ECOVIAS', '2024-08-30', 7, 6.85, 'Norte', 0, 205, 'Motocicleta', 1),

-- SETEMBRO 2024
('Praça Leste', 'ECOVIAS', '2024-09-05', 8, 11.95, 'Leste', 1, 116, 'Leve', 2),
('Praça Oeste', 'ECOVIAS', '2024-09-11', 9, 19.40, 'Oeste', 2, 75, 'Pesado', 3),
('Praça Norte', 'ECOVIAS', '2024-09-17', 10, 10.15, 'Norte', 0, 139, 'Leve', 1),
('Praça Sul', 'ECOVIAS', '2024-09-23', 11, 15.20, 'Sul', 1, 92, 'Pesado', 2),
('Praça Central', 'ECOVIAS', '2024-09-29', 12, 7.45, 'Norte', 2, 194, 'Motocicleta', 3),

-- OUTUBRO 2024
('Praça Leste', 'ECOVIAS', '2024-10-06', 13, 12.80, 'Leste', 0, 121, 'Leve', 1),
('Praça Oeste', 'ECOVIAS', '2024-10-12', 14, 18.95, 'Oeste', 1, 77, 'Pesado', 2),
('Praça Norte', 'ECOVIAS', '2024-10-18', 15, 9.25, 'Norte', 2, 144, 'Leve', 3),
('Praça Sul', 'ECOVIAS', '2024-10-24', 16, 16.10, 'Sul', 0, 86, 'Pesado', 1),
('Praça Central', 'ECOVIAS', '2024-10-30', 17, 6.60, 'Norte', 1, 215, 'Motocicleta', 2),

-- NOVEMBRO 2024
('Praça Leste', 'ECOVIAS', '2024-11-07', 18, 11.10, 'Leste', 2, 125, 'Leve', 3),
('Praça Oeste', 'ECOVIAS', '2024-11-13', 19, 17.25, 'Oeste', 0, 80, 'Pesado', 1),
('Praça Norte', 'ECOVIAS', '2024-11-19', 6, 10.60, 'Norte', 1, 131, 'Leve', 2),
('Praça Sul', 'ECOVIAS', '2024-11-25', 7, 14.80, 'Sul', 2, 95, 'Pesado', 3),
('Praça Central', 'ECOVIAS', '2024-11-29', 8, 7.80, 'Norte', 0, 201, 'Motocicleta', 1),

-- DEZEMBRO 2024
('Praça Leste', 'ECOVIAS', '2024-12-05', 9, 13.45, 'Leste', 1, 114, 'Leve', 2),
('Praça Oeste', 'ECOVIAS', '2024-12-11', 10, 20.15, 'Oeste', 2, 73, 'Pesado', 3),
('Praça Norte', 'ECOVIAS', '2024-12-17', 11, 9.85, 'Norte', 0, 148, 'Leve', 1),
('Praça Sul', 'ECOVIAS', '2024-12-23', 12, 15.60, 'Sul', 1, 89, 'Pesado', 2),
('Praça Central', 'ECOVIAS', '2024-12-29', 13, 6.40, 'Norte', 2, 208, 'Motocicleta', 3),

-- Registros adicionais para maior variação
('Praça Norte', 'ECOVIAS', '2024-01-12', 14, 10.30, 'Sul', 0, 126, 'Leve', 1),
('Praça Sul', 'ECOVIAS', '2024-02-18', 15, 14.45, 'Norte', 1, 97, 'Pesado', 2),
('Praça Leste', 'ECOVIAS', '2024-03-24', 16, 11.75, 'Oeste', 2, 112, 'Leve', 3),
('Praça Oeste', 'ECOVIAS', '2024-04-30', 17, 18.10, 'Leste', 0, 84, 'Pesado', 1),
('Praça Central', 'ECOVIAS', '2024-05-06', 18, 7.65, 'Sul', 1, 189, 'Motocicleta', 2),
('Praça Norte', 'ECOVIAS', '2024-06-12', 19, 9.90, 'Norte', 2, 135, 'Leve', 3),
('Praça Sul', 'ECOVIAS', '2024-07-18', 6, 16.20, 'Sul', 0, 90, 'Pesado', 1),
('Praça Leste', 'ECOVIAS', '2024-08-24', 7, 12.50, 'Leste', 1, 117, 'Leve', 2),
('Praça Oeste', 'ECOVIAS', '2024-09-30', 8, 19.80, 'Oeste', 2, 71, 'Pesado', 3),
('Praça Central', 'ECOVIAS', '2024-10-06', 9, 6.25, 'Norte', 0, 220, 'Motocicleta', 1),
('Praça Norte', 'ECOVIAS', '2024-11-12', 10, 10.70, 'Sul', 1, 128, 'Leve', 2),
('Praça Sul', 'ECOVIAS', '2024-12-18', 11, 15.35, 'Norte', 2, 93, 'Pesado', 3),

-- Registros extras para completar a variação anual
('Praça Leste', 'ECOVIAS', '2024-01-28', 12, 11.25, 'Leste', 0, 109, 'Leve', 1),
('Praça Oeste', 'ECOVIAS', '2024-02-29', 13, 17.75, 'Oeste', 1, 87, 'Pesado', 2),
('Praça Central', 'ECOVIAS', '2024-03-31', 14, 6.55, 'Norte', 2, 196, 'Motocicleta', 3),
('Praça Norte', 'ECOVIAS', '2024-04-15', 15, 10.05, 'Sul', 0, 140, 'Leve', 1),
('Praça Sul', 'ECOVIAS', '2024-05-31', 16, 14.90, 'Sul', 1, 98, 'Pesado', 2),
('Praça Leste', 'ECOVIAS', '2024-06-25', 17, 12.40, 'Leste', 2, 106, 'Leve', 3),
('Praça Oeste', 'ECOVIAS', '2024-07-30', 18, 18.85, 'Oeste', 0, 74, 'Pesado', 1),
('Praça Central', 'ECOVIAS', '2024-08-15', 19, 7.15, 'Norte', 1, 203, 'Motocicleta', 2),
('Praça Norte', 'ECOVIAS', '2024-09-28', 6, 9.75, 'Norte', 2, 133, 'Leve', 3),
('Praça Sul', 'ECOVIAS', '2024-10-31', 7, 15.75, 'Sul', 0, 91, 'Pesado', 1),
('Praça Leste', 'ECOVIAS', '2024-11-30', 8, 11.60, 'Leste', 1, 120, 'Leve', 2),
('Praça Oeste', 'ECOVIAS', '2024-12-31', 9, 19.95, 'Oeste', 2, 69, 'Pesado', 3),

-- Registros finais para equilibrar a distribuição
('Praça Central', 'ECOVIAS', '2024-01-18', 10, 6.80, 'Norte', 0, 175, 'Motocicleta', 1),
('Praça Norte', 'ECOVIAS', '2024-02-12', 11, 10.50, 'Sul', 1, 142, 'Leve', 2),
('Praça Sul', 'ECOVIAS', '2024-03-08', 12, 16.45, 'Sul', 2, 85, 'Pesado', 3),
('Praça Leste', 'ECOVIAS', '2024-04-26', 13, 12.20, 'Leste', 0, 107, 'Leve', 1),
('Praça Oeste', 'ECOVIAS', '2024-05-20', 14, 18.30, 'Oeste', 1, 77, 'Pesado', 2),
('Praça Central', 'ECOVIAS', '2024-06-14', 15, 7.00, 'Norte', 2, 190, 'Motocicleta', 3),
('Praça Norte', 'ECOVIAS', '2024-07-12', 16, 9.15, 'Norte', 0, 155, 'Leve', 1),
('Praça Sul', 'ECOVIAS', '2024-08-08', 17, 15.50, 'Sul', 1, 94, 'Pesado', 2),
('Praça Leste', 'ECOVIAS', '2024-09-20', 18, 11.35, 'Leste', 2, 123, 'Leve', 3),
('Praça Oeste', 'ECOVIAS', '2024-10-25', 19, 17.40, 'Oeste', 0, 88, 'Pesado', 1),
('Praça Central', 'ECOVIAS', '2024-11-18', 6, 6.30, 'Norte', 1, 218, 'Motocicleta', 2),
('Praça Norte', 'ECOVIAS', '2024-12-08', 7, 10.90, 'Sul', 2, 137, 'Leve', 3);

-- JANEIRO 2024
INSERT INTO DadosPracaPedagio (praca, lote, data, hora, valor, sentido, tpCampo, quantidade, Categoria, fkEmpresa) VALUES
('Praça Norte', 'ECOVIAS', '2024-01-05', 8, 6.50, 'Norte', 2, 165, 'Motocicleta', 1),
('Praça Sul', 'ECOVIAS', '2024-01-12', 14, 7.20, 'Sul', 2, 143, 'Motocicleta', 2),
('Praça Central', 'ECOVIAS', '2024-01-18', 16, 6.80, 'Norte', 2, 187, 'Motocicleta', 3),
('Praça Leste', 'ECOVIAS', '2024-01-25', 10, 8.10, 'Leste', 2, 124, 'Motocicleta', 1),

-- FEVEREIRO 2024

('Praça Oeste', 'ECOVIAS', '2024-02-03', 7, 7.40, 'Oeste', 2, 156, 'Motocicleta', 2),
('Praça Norte', 'ECOVIAS', '2024-02-09', 12, 6.90, 'Norte', 2, 171, 'Motocicleta', 3),
('Praça Sul', 'ECOVIAS', '2024-02-16', 15, 8.30, 'Sul', 2, 139, 'Motocicleta', 1),
('Praça Central', 'ECOVIAS', '2024-02-23', 9, 7.60, 'Norte', 2, 182, 'Motocicleta', 2),

-- MARÇO 2024

('Praça Leste', 'ECOVIAS', '2024-03-07', 11, 6.70, 'Leste', 2, 148, 'Motocicleta', 3),
('Praça Oeste', 'ECOVIAS', '2024-03-14', 13, 7.80, 'Oeste', 2, 163, 'Motocicleta', 1),
('Praça Norte', 'ECOVIAS', '2024-03-21', 8, 8.50, 'Norte', 2, 135, 'Motocicleta', 2),
('Praça Sul', 'ECOVIAS', '2024-03-28', 17, 7.10, 'Sul', 2, 174, 'Motocicleta', 3),

-- ABRIL 2024

('Praça Central', 'ECOVIAS', '2024-04-05', 10, 8.20, 'Norte', 2, 157, 'Motocicleta', 1),
('Praça Leste', 'ECOVIAS', '2024-04-12', 14, 6.60, 'Leste', 2, 189, 'Motocicleta', 2),
('Praça Oeste', 'ECOVIAS', '2024-04-19', 16, 7.50, 'Oeste', 2, 142, 'Motocicleta', 3),
('Praça Norte', 'ECOVIAS', '2024-04-26', 9, 8.40, 'Norte', 2, 168, 'Motocicleta', 1),

-- MAIO 2024

('Praça Sul', 'ECOVIAS', '2024-05-04', 12, 7.30, 'Sul', 2, 151, 'Motocicleta', 2),
('Praça Central', 'ECOVIAS', '2024-05-11', 15, 6.40, 'Norte', 2, 176, 'Motocicleta', 3),
('Praça Leste', 'ECOVIAS', '2024-05-18', 8, 8.70, 'Leste', 2, 133, 'Motocicleta', 1),
('Praça Oeste', 'ECOVIAS', '2024-05-25', 11, 7.00, 'Oeste', 2, 184, 'Motocicleta', 2),

-- JUNHO 2024

('Praça Norte', 'ECOVIAS', '2024-06-02', 13, 8.60, 'Norte', 2, 149, 'Motocicleta', 3),
('Praça Sul', 'ECOVIAS', '2024-06-09', 17, 6.30, 'Sul', 2, 172, 'Motocicleta', 1),
('Praça Central', 'ECOVIAS', '2024-06-16', 10, 7.70, 'Norte', 2, 138, 'Motocicleta', 2),
('Praça Leste', 'ECOVIAS', '2024-06-23', 14, 8.90, 'Leste', 2, 161, 'Motocicleta', 3),

-- JULHO 2024

('Praça Oeste', 'ECOVIAS', '2024-07-06', 9, 7.20, 'Oeste', 2, 155, 'Motocicleta', 1),
('Praça Norte', 'ECOVIAS', '2024-07-13', 12, 6.80, 'Norte', 2, 178, 'Motocicleta', 2),
('Praça Sul', 'ECOVIAS', '2024-07-20', 16, 8.30, 'Sul', 2, 144, 'Motocicleta', 3),
('Praça Central', 'ECOVIAS', '2024-07-27', 8, 7.90, 'Norte', 2, 167, 'Motocicleta', 1),

-- AGOSTO 2024

('Praça Leste', 'ECOVIAS', '2024-08-03', 11, 6.50, 'Leste', 2, 183, 'Motocicleta', 2),
('Praça Oeste', 'ECOVIAS', '2024-08-10', 15, 8.10, 'Oeste', 2, 136, 'Motocicleta', 3),
('Praça Norte', 'ECOVIAS', '2024-08-17', 13, 7.60, 'Norte', 2, 159, 'Motocicleta', 1),
('Praça Sul', 'ECOVIAS', '2024-08-24', 17, 8.80, 'Sul', 2, 175, 'Motocicleta', 2),

-- SETEMBRO 2024

('Praça Central', 'ECOVIAS', '2024-09-07', 10, 7.40, 'Norte', 2, 152, 'Motocicleta', 3),
('Praça Leste', 'ECOVIAS', '2024-09-14', 14, 6.70, 'Leste', 2, 188, 'Motocicleta', 1),
('Praça Oeste', 'ECOVIAS', '2024-09-21', 9, 8.50, 'Oeste', 2, 141, 'Motocicleta', 2),
('Praça Norte', 'ECOVIAS', '2024-09-28', 12, 7.80, 'Norte', 2, 164, 'Motocicleta', 3),

-- OUTUBRO 2024

('Praça Sul', 'ECOVIAS', '2024-10-05', 16, 6.90, 'Sul', 2, 177, 'Motocicleta', 1),
('Praça Central', 'ECOVIAS', '2024-10-12', 8, 8.20, 'Norte', 2, 147, 'Motocicleta', 2),
('Praça Leste', 'ECOVIAS', '2024-10-19', 11, 7.30, 'Leste', 2, 170, 'Motocicleta', 3),
('Praça Oeste', 'ECOVIAS', '2024-10-26', 15, 8.60, 'Oeste', 2, 153, 'Motocicleta', 1),

-- NOVEMBRO 2024

('Praça Norte', 'ECOVIAS', '2024-11-02', 13, 7.10, 'Norte', 2, 186, 'Motocicleta', 2),
('Praça Sul', 'ECOVIAS', '2024-11-09', 17, 6.60, 'Sul', 2, 140, 'Motocicleta', 3),
('Praça Central', 'ECOVIAS', '2024-11-16', 10, 8.40, 'Norte', 2, 162, 'Motocicleta', 1),
('Praça Leste', 'ECOVIAS', '2024-11-23', 14, 7.70, 'Leste', 2, 179, 'Motocicleta', 2),

-- DEZEMBRO 2024

('Praça Oeste', 'ECOVIAS', '2024-12-07', 9, 8.00, 'Oeste', 2, 146, 'Motocicleta', 3),
('Praça Norte', 'ECOVIAS', '2024-12-14', 12, 6.40, 'Norte', 2, 185, 'Motocicleta', 1),
('Praça Sul', 'ECOVIAS', '2024-12-21', 16, 7.50, 'Sul', 2, 158, 'Motocicleta', 2),
('Praça Central', 'ECOVIAS', '2024-12-28', 8, 8.70, 'Norte', 2, 173, 'Motocicleta', 3);



        
SELECT distinct(lote) as 'concessao', sum(quantidade) as 'trafego' FROM Usuario
        JOIN DadosPracaPedagio as dp on dp.fkEmpresa = Usuario.fkEmpresa  where data LIKE '2024-07-%' group by lote;
        
select praca, sum(quantidade) from DadosPracaPedagio
        where tpCampo = 2
        and fkEmpresa = 1
        and data LIKE '2024-03-%'
        and lote = 'AUTOBAN'
        group by praca LIMIT 1;
        
select (COUNT(case when tpCampo = 2 then 2 end) / COUNT(*)) * 100 as evasoes
        from DadosPracaPedagio
        where lote = 'AUTOBAN'
        and data LIKE '2024-03%'
        and fkEmpresa = 1;
                

        
select sum(quantidade) as evasoes from DadosPracaPedagio
        where tpCampo = 2
        and fkEmpresa = 1
        and data LIKE '2024-03-%'
        and lote = 'AUTOBAN' LIMIT 1;
        
select (COUNT(case when tpCampo = 2 then 2 end) / COUNT(*)) * 100 as evasoes
		from DadosPracaPedagio
		where lote = 'AUTOBAN'
		and data LIKE '2024-03-%'
		and fkEmpresa = 1;
        
SELECT distinct(lote) as 'concessao', sum(quantidade) as 'trafego' FROM Usuario
        JOIN DadosPracaPedagio as dp on dp.fkEmpresa = Usuario.fkEmpresa where data LIKE '2024-03-%' group by lote;

select sum(quantidade) from DadosPracaPedagio
        where fkEmpresa = 1
        and data LIKE '2024-03-%'
        and tpCampo = 2
        and lote = 'AUTOBAN';

SELECT
  SUM(dp.quantidade) AS trafego
FROM DadosPracaPedagio dp
WHERE dp.fkEmpresa = 1
  AND dp.data LIKE '2024-03-%'
  AND dp.lote = 'AUTOBAN'
GROUP BY dp.lote;

select praca from DadosPracaPedagio
        where tpCampo = 2
        and fkEmpresa = 1
        and data LIKE '2024-02-%'
        and lote = 'AUTOBAN' 
        group by praca 
        ORDER BY praca ASC limit 1;

select sum(quantidade) as evasoes from DadosPracaPedagio
        where tpCampo = 2
        and fkEmpresa = 1
        and data LIKE '2024-03-%'
        and lote = 'AUTOBAN';

select sum(valor) as impactoFinanceiro from DadosPracaPedagio 
		where fkEmpresa = 1
        and tpCampo = 2
        and data LIKE '2024-07-%'
        and lote = 'AUTOBAN';
        
select sum(valor) as impactoFinanceiro from DadosPracaPedagio 
		where fkEmpresa = 1
        and tpCampo = 2
        and data LIKE '2024-06-%'
        and lote = 'AUTOBAN';
                
                
SELECT
    SUM(CASE WHEN data LIKE '2024-06-%' THEN valor ELSE 0 END) AS impactoMesAnterior,
    SUM(CASE WHEN data LIKE '2024-07-%' THEN valor ELSE 0 END) AS impactoMesAtual,
    SUM(CASE WHEN data LIKE '2024-06-%' THEN quantidade ELSE 0 END) AS evasaoMesAnterior,
    SUM(CASE WHEN data LIKE '2024-07-%' THEN quantidade ELSE 0 END) AS evasaoMesAtual
FROM DadosPracaPedagio
WHERE fkEmpresa = 1
  AND tpCampo = 2
  AND lote = 'AUTOBAN';
  
  
  show tables;
