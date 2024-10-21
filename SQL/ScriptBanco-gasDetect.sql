CREATE DATABASE Guys_Inc;
USE Guys_Inc;

CREATE TABLE Empresa (
idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
razaoSocial VARCHAR(120) NOT NULL,
cnpjSede CHAR(14) NOT NULL,
fkResponsavel INT UNIQUE
);

CREATE TABLE Funcionario (
idFuncionario  INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45) NOT NULL,
cpf CHAR(11) NOT NULL,
email VARCHAR(80) NOT NULL,
senha TEXT NOT NULL,
fkCargo INT,
fkEmpresa INT,
CONSTRAINT fkEmpresa_Funcionario FOREIGN KEY(fkEmpresa) REFERENCES Empresa(idEmpresa)
);


CREATE TABLE Cargo (
idCargo INT PRIMARY KEY AUTO_INCREMENT,
cargo VARCHAR(30) NOT NULL,
descricao VARCHAR(255)
);

ALTER TABLE Funcionario ADD CONSTRAINT fkCargo_Funcionario FOREIGN KEY(fkCargo) REFERENCES cargo(idCargo);
ALTER TABLE Empresa ADD CONSTRAINT fkResponsavel_Empresa FOREIGN KEY(fkResponsavel) REFERENCES Funcionario(idFuncionario);


CREATE TABLE Fabrica (
idFabrica INT PRIMARY KEY AUTO_INCREMENT,
cep VARCHAR(45) NOT NULL,
logradouro VARCHAR(45) NOT NULL,
numero INT NOT NULL,
bairro VARCHAR(45) NOT NULL,
cidade VARCHAR(45) NOT NULL,
UF CHAR(2) NOT NULL,
fkEmpresa INT,
CONSTRAINT fkEmpresa_Fabrica FOREIGN KEY(fkEmpresa) REFERENCES Empresa(idEmpresa)
);

CREATE TABLE LimiteAlerta (
idParametroAlerta INT PRIMARY KEY AUTO_INCREMENT,
limiteAlerta INT NOT NULL
);

CREATE TABLE Setor (
idSetor INT PRIMARY KEY AUTO_INCREMENT,
tamanhoM2 INT NOT NULL,
setor VARCHAR(45),
sala VARCHAR(45),
descricao VARCHAR(45),
fkFabrica INT,
fkLimite INT,
CONSTRAINT fkFabrica_Setor FOREIGN KEY(fkFabrica) REFERENCES Fabrica(idFabrica),
CONSTRAINT fkLimite_Setor FOREIGN KEY(fkLimite) REFERENCES LimiteAlerta(idParametroAlerta)
);

CREATE TABLE Sensor (
idSensor INT PRIMARY KEY AUTO_INCREMENT,
titulo VARCHAR(255),
fkSetor INT,
CONSTRAINT fkSetor_Sensor FOREIGN KEY(fkSetor) REFERENCES Setor(idSetor)
);

CREATE TABLE Registro (
idRegistro INT PRIMARY KEY AUTO_INCREMENT,
dtHora TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
porcGas DECIMAL(5,2) NOT NULL,
fkSensor INT,
CONSTRAINT fkSensor_Registro FOREIGN KEY(fkSensor) REFERENCES Sensor(idSensor)
);


INSERT INTO empresa (razaoSocial, cnpjSede, fkResponsavel) VALUES
('Tintas e Cores S.A.', '12345678000195', NULL),
('Inovação em Tintas Ltda', '98765432000156', NULL),
('Fabricação de Tintas Verdes', '45678912300158', NULL),
('Cores do Mundo Ltda', '32165498700159', NULL),
('Soluções em Tintas e Vernizes', '15975348600150', NULL);


INSERT INTO cargo (cargo, descricao) VALUES
('Gerente de Produção', 'Responsável pela linha de produção de tintas'),
('Técnico em Tintas', 'Especialista em formulações de tintas'),
('Analista de Qualidade', 'Verifica a qualidade das tintas produzidas'),
('Coordenador de Vendas', 'Gerencia a equipe de vendas de tintas'),
('Assistente de Logística', 'Auxilia na distribuição de produtos');


INSERT INTO funcionario (nome, cpf, email, senha, fkCargo, fkEmpresa) VALUES
('João Silva', '12345678901', 'joao@tintasecores.com', 'senha123', 1, 1),
('Maria Souza', '98765432100', 'maria@inovacaoemtintas.com', 'senha456', 2, 2),
('Carlos Pereira', '45678912345', 'carlos@fabricacaotintasverdes.com', 'senha789', 3, 3),
('Ana Costa', '32165498765', 'ana@coresdomundo.com', 'senha101', 4, 4),
('Luiz Fernando', '15975348612', 'luiz@solucoesemtintas.com', 'senha202', 5, 5);


INSERT INTO fabrica (cep, logradouro, numero, bairro, cidade, UF, fkEmpresa) VALUES
('12345-678', 'Avenida das Tintas', 100, 'Centro', 'São Paulo', 'SP', 1),
('87654-321', 'Rua das Inovações', 200, 'Jardim', 'Rio de Janeiro', 'RJ', 2),
('54321-987', 'Rua Verdejante', 150, 'Industrial', 'Belo Horizonte', 'MG', 3),
('65432-198', 'Avenida Colorida', 300, 'Comércio', 'Curitiba', 'PR', 4),
('98765-432', 'Rua Criativa', 400, 'Criativo', 'Porto Alegre', 'RS', 5);


INSERT INTO LimiteAlerta (limiteAlerta) VALUES
(80),
(60),
(70),
(40),
(20);


INSERT INTO Setor (tamanhoM2, setor, sala, descricao, fkFabrica, fkLimite) VALUES
(100, 'Produção', 'Sala de Mistura', 'Ambiente de mistura de tintas', 1, 1),
(150, 'Armazenagem', 'Sala de Estocagem', 'Área de estocagem de tintas', 2, 2),
(200, 'Laboratório', 'Sala de Testes', 'Ambiente de testes de qualidade', 3, 3),
(120, 'Expedição', 'Sala de Envio', 'Área de expedição de tintas', 4, 4),
(180, 'Desenvolvimento', 'Sala de Formulação', 'Ambiente para desenvolvimento de novas tintas', 5, 5);

INSERT INTO Sensor (titulo, fkSetor) VALUES
('Sensor de gás', 1),
('Sensor de gás', 2),
('Sensor de gás', 3),
('Sensor de gás', 4),
('Sensor de gás', 5);


INSERT INTO Registro (porcGas, fkSensor) VALUES
(25.00, 1),
(30.50, 2),
(20.75, 3),
(15.60, 4),
(18.30, 5);


SELECT * 
FROM registro AS r
JOIN sensor AS s ON r.fkSensor = s.idSensor;




SELECT 
    funcionario.nome AS 'Nome do Funcionario',
    cargo AS Cargo
FROM 
    funcionario 
JOIN 
    cargo ON funcionario.fkCargo = cargo.idCargo;


SELECT 
    e.razaoSocial AS Empresa,
    fa.logradouro AS 'Rua da Fábrica'
FROM 
    empresa AS e
JOIN 
    fabrica AS fa ON e.idEmpresa = fa.fkEmpresa;




SELECT 
    s.titulo AS Sensor,
    se.setor AS Setor,
    fa.logradouro AS 'Rua da Fábrica',
    e.razaoSocial AS 'Nome da Empresa'
FROM 
    sensor AS s
JOIN 
    setor AS se ON s.fkSetor = se.idSetor
JOIN 
    fabrica AS fa ON se.fkFabrica = fa.idFabrica
JOIN 
    empresa AS e ON fa.fkEmpresa = e.idEmpresa;




    SELECT 
    s.titulo AS 'Descrição do Sensor',
    se.setor AS Setor,
    se.sala AS Sala,
    la.limiteAlerta AS 'Limite do Alerta',
    e.razaoSocial AS 'Nome da Empresa'
FROM 
    Sensor AS s
JOIN 
    Setor AS se ON s.fkSetor = se.idSetor
JOIN 
    LimiteAlerta AS la ON se.fkLimite = la.idParametroAlerta
JOIN 
    Fabrica AS f ON se.fkFabrica = f.idFabrica
JOIN 
    Empresa AS e ON f.fkEmpresa = e.idEmpresa;