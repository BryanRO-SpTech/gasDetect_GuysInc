DROP DATABASE IF EXISTS Guys_Inc;

CREATE DATABASE if not exists Guys_Inc;
USE Guys_Inc;

CREATE TABLE if not exists Empresa (
    idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
    razaoSocial VARCHAR(120) NOT NULL,
    cnpjSede CHAR(14) NOT NULL
);

CREATE TABLE if not exists NivelPermissao (
    idNivel int primary key auto_increment,
    descNivel varchar(255)
);

CREATE TABLE if not exists Funcionario (
    idFuncionario  INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    cpf CHAR(11) NOT NULL,
    email VARCHAR(80) NOT NULL,
    senha TEXT NOT NULL,
    supportId VARCHAR(20),
    fkEmpresa INT,
    fkNivel INT,
    CONSTRAINT fkNivelFuncionario FOREIGN KEY (fkNivel) REFERENCES NivelPermissao(idNivel),
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
nome VARCHAR(45),
descricao VARCHAR(45),
fkFabrica INT,
fkLimite INT,
CONSTRAINT fkFabrica_Setor FOREIGN KEY(fkFabrica) REFERENCES Fabrica(idFabrica),
CONSTRAINT fkLimite_Setor FOREIGN KEY(fkLimite) REFERENCES LimiteAlerta(idParametroAlerta)
);

CREATE TABLE if not exists Sensor (
idSensor INT PRIMARY KEY AUTO_INCREMENT,
titulo VARCHAR(255),
statusSensor char(9) DEFAULT 'Pendente' NOT NULL,
CONSTRAINT chkStatus CHECK(statusSensor in ('Pendente', 'Concluido')),
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

INSERT INTO Empresa (razaoSocial, cnpjSede) VALUES
('Tintas e Cores S.A.', '12345678000195'),
('Inovação em Tintas Ltda', '98765432000156'),
('Fabricação de Tintas Verdes', '45678912300158'),
('Cores do Mundo Ltda', '32165498700159'),
('Soluções em Tintas e Vernizes', '15975348600150');

INSERT INTO NivelPermissao (descNivel) VALUES
('Controle total sobre a plataforma'),
('Gerenciar sua propria senha, pode cadastrar novos funcionarios, fabricas, setores e sensores'),
('Pode alterar a senha e ver dashboard');

INSERT INTO Funcionario (nome, cpf, email, senha, fkEmpresa, fkNivel) VALUES
('João Silva', '12345678901', 'joao@tintasecores.com', 'senha123', 1, 1),
('Maria Souza', '98765432100', 'maria@inovacaoemtintas.com', 'senha456',  2, 1),
('Carlos Pereira', '45678912345', 'carlos@fabricacaotintasverdes.com', 'senha789', 3, 1),
('Ana Costa', '32165498765', 'ana@coresdomundo.com', 'senha101',  4, 1),
('Luiz Fernando', '15975348612', 'luiz@solucoesemtintas.com', 'senha202', 5, 1),
('Suporte N3', '', 'support@gasdetect.zohodesk.com', 'senha0101', NULL, 1);

INSERT INTO Fabrica (cep, logradouro, numero, bairro, cidade, UF, fkEmpresa) VALUES
('12345-678', 'Avenida das Tintas', 100, 'Centro', 'São Paulo', 'SP', 1),
('87654-321', 'Rua das Inovações', 200, 'Jardim', 'Rio de Janeiro', 'RJ', 2),
('54321-987', 'Rua Verdejante', 150, 'Industrial', 'Belo Horizonte', 'MG', 3),
('65432-198', 'Avenida Colorida', 300, 'Comércio', 'Curitiba', 'PR', 4),
('98765-432', 'Rua Criativa', 400, 'Criativo', 'Porto Alegre', 'RS', 5);

INSERT INTO LimiteAlerta (limiteAlerta) VALUES
(15),
(60),
(20),
(40),
(20);


INSERT INTO Setor (tamanhoM2, nome, descricao, fkFabrica, fkLimite) VALUES
(100, 'Produção', 'Sala de Mistura', 1, 1),
(150, 'Armazenagem', 'Sala de Estocagem', 2, 2),
(200, 'Laboratório', 'Sala de Testes', 3, 3),
(120, 'Expedição', 'Sala de Envio', 4, 4),
(180, 'Desenvolvimento', 'Sala de Formulação', 5, 5);

INSERT INTO Sensor (titulo, statusSensor, fkSetor) VALUES
('Sensor de gás', 'Concluido', 1),
('Sensor de gás', 'Concluido', 2),
('Sensor de gás', 'Concluido', 3),
('Sensor de gás', 'Concluido', 4),
('Sensor de gás', 'Concluido', 5);

INSERT INTO Registro (porcGas, fkSensor) VALUES
(25.00, 1),
(30.50, 2),
(20.75, 3),
(15.60, 4),
(18.30, 5);

INSERT INTO Registro (dtHora, porcGas, fkSensor) VALUES
('2024-12-01 10:00:00', 22.00, 1),
('2024-12-02 11:00:00', 28.50, 1),
('2024-12-03 12:00:00', 19.75, 1),
('2024-12-04 13:00:00', 17.60, 1),
('2024-12-05 14:00:00', 70.30, 1),
('2024-12-06 15:00:00', 81.00, 1),
('2024-12-07 16:00:00', 2.50, 1),
('2024-12-08 17:00:00', 10.75, 1),
('2024-12-09 18:00:00', 4.60, 1),
('2024-12-10 19:00:00', 5.30, 1);


INSERT INTO Registro (dtHora, porcGas, fkSensor) VALUES
('2024-12-11 10:00:00', 50.00, 1);

INSERT INTO Registro (dtHora, porcGas, fkSensor) VALUES
('2024-12-13 10:00:00', 0.00, 1);

INSERT INTO Registro (dtHora, porcGas, fkSensor) VALUES
('2024-12-14 10:00:00', 100, 1);

INSERT INTO Registro (dtHora, porcGas, fkSensor) VALUES
('2024-12-15 10:00:00', 10, 1);

INSERT INTO Registro (dtHora, porcGas, fkSensor) VALUES
('2024-12-16 10:00:00', 10, 1);
