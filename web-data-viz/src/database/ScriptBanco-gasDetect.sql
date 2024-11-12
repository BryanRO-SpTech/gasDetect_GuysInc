CREATE DATABASE if not exists Guys_Inc;
USE Guys_Inc;

CREATE TABLE if not exists Empresa (
idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
razaoSocial VARCHAR(120) NOT NULL,
cnpjSede CHAR(14) NOT NULL
);

CREATE TABLE if not exists Funcionario (
idFuncionario  INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45) NOT NULL,
cpf CHAR(11) NOT NULL,
email VARCHAR(80) NOT NULL,
senha TEXT NOT NULL,
descCargo VARCHAR(255),
fkEmpresa INT,
CONSTRAINT fkEmpresa_Funcionario FOREIGN KEY(fkEmpresa) REFERENCES Empresa(idEmpresa)
);

CREATE TABLE if not exists Fabrica (
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

CREATE TABLE if not exists LimiteAlerta (
idParametroAlerta INT PRIMARY KEY AUTO_INCREMENT,
limiteAlerta INT NOT NULL
);

CREATE TABLE if not exists Setor (
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

CREATE TABLE if not exists Sensor (
idSensor INT PRIMARY KEY AUTO_INCREMENT,
titulo VARCHAR(255),
fkSetor INT,
CONSTRAINT fkSetor_Sensor FOREIGN KEY(fkSetor) REFERENCES Setor(idSetor)
);

CREATE TABLE if not exists Registro (
idRegistro INT PRIMARY KEY AUTO_INCREMENT,
dtHora TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
porcGas DECIMAL(5,2) NOT NULL,
fkSensor INT,
CONSTRAINT fkSensor_Registro FOREIGN KEY(fkSensor) REFERENCES Sensor(idSensor)
);


INSERT INTO empresa (razaoSocial, cnpjSede) VALUES
('Tintas e Cores S.A.', '12345678000195'),
('Inovação em Tintas Ltda', '98765432000156'),
('Fabricação de Tintas Verdes', '45678912300158'),
('Cores do Mundo Ltda', '32165498700159'),
('Soluções em Tintas e Vernizes', '15975348600150');

INSERT INTO funcionario (nome, cpf, email, senha, descCargo, fkEmpresa) VALUES
('João Silva', '12345678901', 'joao@tintasecores.com', 'senha123', 'Responsável pela linha de produção de tintas', 1),
('Maria Souza', '98765432100', 'maria@inovacaoemtintas.com', 'senha456', 'Especialista em formulações de tintas', 2),
('Carlos Pereira', '45678912345', 'carlos@fabricacaotintasverdes.com', 'senha789', 'Verifica a qualidade das tintas produzidas', 3),
('Ana Costa', '32165498765', 'ana@coresdomundo.com', 'senha101', 'Gerencia a equipe de vendas de tintas', 4),
('Luiz Fernando', '15975348612', 'luiz@solucoesemtintas.com', 'senha202', 'Auxilia na distribuição de produtos', 5);


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
    nome AS 'Nome do Funcionario',
    cargo AS Cargo
FROM 
    funcionario;


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
