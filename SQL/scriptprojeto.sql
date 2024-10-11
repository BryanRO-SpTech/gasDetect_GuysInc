CREATE DATABASE guysinc;

USE guysinc;

CREATE TABLE empresa (
idCliente INT PRIMARY KEY AUTO_INCREMENT,
razaoSocial VARCHAR(60),
cnpjSede CHAR(14),
responsavel VARCHAR(60)
);

CREATE TABLE fabrica (
idFabrica INT PRIMARY KEY AUTO_INCREMENT,
cep VARCHAR(45),
logradouro VARCHAR(45),
numero INT,
bairro VARCHAR(45),
cidade VARCHAR(45),
UF CHAR(2),
fkEmpresa INT,
CONSTRAINT fkEmpresaFabrica FOREIGN KEY(fkEmpresa)
	REFERENCES empresa (idCliente)
);
  
    
CREATE TABLE cargo (
idSensor INT PRIMARY KEY AUTO_INCREMENT,
cargo VARCHAR(30)
);


CREATE TABLE funcionario (
idUsuario INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45),
cpf CHAR(11),
email VARCHAR(45),
senha VARCHAR(45),
fkEmpresa INT,
fkCargo INT,
CONSTRAINT fkEmpresaFuncionario FOREIGN KEY(fkEmpresa)
	REFERENCES funcionario (idUsuario)
);


CREATE TABLE ambiente (
idAmbiente INT PRIMARY KEY AUTO_INCREMENT,
tamanhoM3 INT,
setor VARCHAR(45),
sala VARCHAR(45),
descricao VARCHAR(45),
fkFabrica INT,
CONSTRAINT fkFabricaAmbiente FOREIGN KEY(fkFabrica)
	REFERENCES ambiente (idAmbiente)
);

CREATE TABLE sensor (
idSensor INT PRIMARY KEY AUTO_INCREMENT,
fkAmbiente INT,
CONSTRAINT fkAmbienteSensor FOREIGN KEY(fkAmbiente)
	REFERENCES sensor (idSensor)
);

CREATE TABLE registro (
idRegistro INT PRIMARY KEY AUTO_INCREMENT,
dtHora TIMESTAMP,
porcGas DECIMAL(5,2),
fkSensor INT,
CONSTRAINT fkSensorRegistro FOREIGN KEY(fkSensor)
	REFERENCES registro (idRegistro)
    );
  
CREATE TABLE vazamento (
idRegistro INT PRIMARY KEY AUTO_INCREMENT,
dtHoraInicio TIMESTAMP,
dtHoraFim DECIMAL(5,2),
fkRegistroInicio INT,
fkRegistroFinal INT,
CONSTRAINT fkRegistroInicioVazamento FOREIGN KEY(fkRegistroInicio)
	REFERENCES vazamento (idRegistro),
CONSTRAINT fkRegistroFinalVazamento FOREIGN KEY(fkRegistroFinal)
	REFERENCES vazamento (idRegistro)
    );