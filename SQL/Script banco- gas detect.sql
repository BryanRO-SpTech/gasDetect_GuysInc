CREATE DATABASE gas_detect;

USE gas_detect;

-- CRIAÇÃO DE TABELAS 
CREATE TABLE users(
	id INT PRIMARY KEY AUTO_INCREMENT
    ,nome VARCHAR(100)
    ,email VARCHAR(80) 
    ,cpf CHAR(14) 
    ,senha VARCHAR(30) 
    ,nivel_permissao TINYINT 
    ,data_criacao DATE 
    ,data_atualizacao DATE
);



ALTER TABLE users 
ADD CONSTRAINT chkNivelPermissao CHECK (nivel_permissao IN (0,1));

CREATE TABLE relatorios(
	id INT PRIMARY KEY AUTO_INCREMENT 
    ,local VARCHAR(50) 
    ,nivelGas FLOAT 
    ,gravidade VARCHAR(10) 
    ,dataHora DATETIME 
);


ALTER TABLE relatorios
ADD CONSTRAINT chkGravidade CHECK (gravidade IN ('baixa', 'media', 'alta'));

CREATE TABLE incidentes(
	id INT PRIMARY KEY AUTO_INCREMENT 
    ,descricao VARCHAR(255) 
    ,responsavel VARCHAR(100) 
    ,local VARCHAR(50) 
    ,dataHora DATETIME 
    ,procedimentoSeguido VARCHAR(255)
);

CREATE TABLE alertas(
	id INT PRIMARY KEY AUTO_INCREMENT 
    ,status TINYINT 
    ,responsavelResposta VARCHAR(100) 
    ,dataHora DATETIME 
);

ALTER TABLE alertas
ADD CONSTRAINT chkStatus CHECK (status IN (0,1));



INSERT INTO users VALUES
(DEFAULT, 'Joaquim Grava', 'joaquim@email.com', '128.178.156-18', '12345678', 0, '2024-08-31','2024-08-31' ),
(DEFAULT, 'Kauane Rodrigues', 'kauane@email.com', '123.123.123-09', 'senha123', 0, '2024-08-31','2024-07-16'),
(DEFAULT, 'Julia Abad', 'julia@email.com', '111.111.111-08', 'minhasenha', 1, '2024-04-01','2024-06-29'),
(DEFAULT, 'Paulo Amado', 'paulo@email.com', '144.171.151-07',  'urubu100',1, '2024-03-02', '2024-07-07'),
(DEFAULT, 'Ivan Drago', 'ivan@email.com', '111.111.111-00',  'contexto',1, '2024-03-02', '2024-07-07') ;


INSERT INTO relatorios VALUES 
(DEFAULT, 'Sala de Refrigeração', 30, 'baixa', '2024-09-30 09:31:17'),
(DEFAULT, 'Sala de Processos', 60, 'media', '2024-09-30 19:54:59'),
(DEFAULT, 'Sala de Armazenamentos', 90, 'alta', '2024-09-30 09:34:17'),
(DEFAULT, 'Sala de Processos 2', 10, 'baixa', '2024-09-30 08:31:17'),
(DEFAULT, 'Sala de Processos Inferior', 20, 'baixa', '2024-08-25 10:31:17');



INSERT INTO incidentes VALUES 
(DEFAULT, 'Houve uma alta nos gases na sala de refrigeração', 'Joaquim Grava', 'Sala de refrigeração', '2024-08-10 15:18:01', 'Os funcionários foram acionados imediatamente e desligaram os equipamentos da área'),
(DEFAULT, 'Os equipamentos foram incendiados', 'Kauane Rodrigues', 'Sala de Processos', '2024-06-15 14:14:14', 'Os bombeiros foram acionados imediantamente, os equipamentos foram desligados e a fábrica evacuada.'),
(DEFAULT, 'O nível de gás passou a cima do permitido', 'Ivan Drago', 'Sala de Processos 2', '2024-09-10 11:31:51', 'Os equipamentos foram desligados remotamente'),
(DEFAULT, 'Pequeno vazamento na tubulação identificado.', 'Julia ABad', 'Sala de refrigeração', '2024-09-10 09:31:01', 'Os funcionários foram acionados imediatamente e desligaram os equipamentos da área'),
(DEFAULT, 'Detecção de gás inflamável no laboratório de tintas.', 'Ivan Drago', 'Sala de Processos', '2024-08-17 09:45:00', 'Isolar área e verificar sensores.');

INSERT INTO alertas (status, responsavelResposta, dataHora) VALUES
(1, 'Paulo Amado', '2024-08-16 14:50:00'),
(0, null, '2024-08-17 09:25:00'),
(1, 'Ivan Drago', '2024-08-15 10:35:00'),
(0, null, '2024-08-18 12:05:00');

-- SELECTS 

-- TODOS OS USUARIOS

SELECT * FROM users;

-- USUARIO PELO ID 

SELECT * FROM users
WHERE id =1;

-- NOME DOS USUARIOS COM PERMISSÃO PARA RESPONDER ALERTAS
SELECT nome as 'Nome do funcionário' FROM users
WHERE nivel_permissao =1;

-- TODOS OS RELATORIOS DO SENSOR em ordem decrescente de data(mais novo pro mais antigo)
SELECT * FROM relatorios
ORDER BY dataHora DESC;

-- SELECIONAR RELATORIOS ONDE O NIVEL DE GAS É MEDIO OU ALTO EM ORDEM DO MAIS RECENTE PRO MAIS ANTIGO
SELECT * FROM relatorios 
WHERE gravidade IN ('media', 'alta')
ORDER BY dataHora DESC;

-- SELECIONAR OS RELATORIOS EM UMA DETERMINADA LOCALIZAÇÃO

SELECT * FROM relatorios 
WHERE local = 'Sala de processos';

-- SELECIONAR RELATORIOS ONDE A LETRA DO LOCAL COMEÇA COM UMA DETERMINADA LETRA
SELECT * FROM relatorios 
WHERE local LIKE 's%';

-- SELECIONAR TODOS OS ALERTAS DO MAIS RECENTE PARA O MAIS ANTIGO

SELECT * FROM alertas
ORDER BY dataHora DESC;

-- SELECIONAR ALERTAS COM SEU STATUS FECHADO OU ABERTO, SE FOREM FECHADOS, QUEM FECHOU E SEUS HORARIOS, ORDENANDO DO MAIS ANTIGO PARA O MAIS RECENTE

SELECT CASE 
WHEN status = 0 
THEN 'Alerta em Aberto'
ELSE 
 concat('Alerta fechado ','Fechado por ', responsavelResposta) 
END AS 'Status do alerta'
, dataHora as 'HORARIO DO ALERTA'
FROM alertas
ORDER BY dataHora;

-- SELECIONAR TODOS OS INCIDENTES DO MAIS RECENTE PARA O MAIS ANTIGO

SELECT * FROM incidentes
ORDER BY dataHora DESC;

-- SELECIONAR TODOS ONDE O RESPONSAVEL SEJA ESPECIFICO ORDENANDO DO MAIS RECENTE PARA O MAIS ANTIGO

SELECT * FROM incidentes
WHERE responsavel = 'Ivan Drago'
ORDER BY dataHora DESC; 











