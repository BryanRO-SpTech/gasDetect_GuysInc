-- Active: 1722955153162@@127.0.0.1@3306@guys_inc
USE Guys_Inc;

select * from registro;
insert into registro values (default, '2024-09-11 08:30:00', 19.25, 1);

select * from registro;
select * from sensor;
select * from setor;
select * from funcionario;

-- SELECT LISTAR SETORES
select 
	empresa.razaoSocial,
    setor.nome as Setor
from sensor
JOIN setor on fkSetor = idSetor
JOIN fabrica on fkFabrica = idFabrica
JOIN empresa on fkEmpresa = idEmpresa
WHERE fkFabrica = 1 and fkSetor = 1;


-- SELECT LISTAR DE SENSORES
select idSensor,
    setor.nome as Setor
from sensor
JOIN setor on fkSetor = idSetor
JOIN fabrica on fkFabrica = idFabrica
WHERE fkFabrica = 1 and fkSetor = 1	; -- IGUAL AO ID FABRICA E SETOR ATUAL


-- SELECT KPIS ULTIMO REGISTRO (NANOMETROS)
select idSensor,
	porcGas,setor.nome as Setor,
    dtHora 
from registro
JOIN sensor on fkSensor = idSensor
JOIN setor on fkSetor = idSetor
WHERE registro.fkSensor = 1 and fkSetor = 1
ORDER BY dtHora DESC limit 1;

-- select graf diario
select 	
	hour(dtHora) AS Hora,
    TRUNCATE(AVG(porcGas),0) AS MediaHora,
    setor.nome AS Setor 
from registro
JOIN sensor on fkSensor = idSensor
JOIN setor on fkSetor = idSetor
WHERE registro.fkSensor = 1 and fkSetor = 1 and  -- igual ao sensor selecionado e o setor atual
month(dtHora) = month(now()) and 
day(dtHora) = day(now()) and  -- mostrando so os registros do mes de hoje e desse ano
year(dtHora) = year(now())
group by hour(dtHora);

-- graf mensal
select 
	day(dtHora) AS Dia,
    TRUNCATE(AVG(porcGas),0) AS MediaDiaria,
    setor.nome AS Setor 
from registro
JOIN sensor on fkSensor = idSensor
JOIN setor on fkSetor = idSetor
WHERE registro.fkSensor = 1 and fkSetor = 1 and  
month(dtHora) = month(now()) and
year(dtHora) = year(now())
group by day(dtHora);

-- graf anual
select 
	month(dtHora) AS Mês,
    TRUNCATE(AVG(porcGas),0) AS MediaMensal,
    setor.nome AS Setor 
from registro
JOIN sensor on fkSensor = idSensor
JOIN setor on fkSetor = idSetor
WHERE registro.fkSensor = 1 and fkSetor = 1 and  
year(dtHora) = year(now())
group by month(dtHora);


-- graf qtd vazamentos mes
SELECT 
	idSensor AS 'ID Sensor',
    YEAR(dtHora) AS Ano,                             
    MONTH(dtHora) AS Mes,                         
    setor.nome AS Setor,                              
    COUNT(CASE WHEN porcGas > limiteAlerta THEN 1 END) AS QtdVazamentos 
FROM registro
JOIN sensor ON fkSensor = idSensor
JOIN setor ON fkSetor = idSetor
JOIN limiteAlerta ON fkLimite = idParametroAlerta
WHERE fkSensor = 1 and fkSetor = 1 and
year(dtHora) = year(now())
GROUP BY YEAR(dtHora), MONTH(dtHora); 

select * from Funcionario;
select * from empresa;
select * from fabrica;

insert into funcionario values
(default, 'Suporte N3', '12565678901', 'suporte@gmail.com', 'suporte123', null, null, null);

SELECT idFuncionario,
	funcionario.nome,
	email,
	cpf,
	nivelPermissao,
	funcionario.fkEmpresa as idEmpresa,
    idFabrica,
    idSetor
FROM Funcionario 
LEFT JOIN Cargo ON idCargo = fkCargo
JOIN Empresa ON funcionario.fkEmpresa = idEmpresa
JOIN Fabrica ON fabrica.fkEmpresa = idEmpresa
JOIN Setor ON fkFabrica = idFabrica
WHERE email = 'luiz@solucoesemtintas.com' AND senha = 'senha202';



SELECT idFuncionario,
	    funcionario.nome,
	    email,
	    cpf,
	    nivelPermissao,
	    funcionario.fkEmpresa as idEmpresa,
        idFabrica,
        idSetor
    FROM Funcionario 
    LEFT JOIN Cargo ON idCargo = fkCargo
    JOIN Empresa ON funcionario.fkEmpresa = idEmpresa
    JOIN Fabrica ON fabrica.fkEmpresa = idEmpresa
    JOIN Setor ON fkFabrica = idFabrica
    WHERE email = 'carlos@fabricacaotintasverdes.com' AND senha = 'senha789';



SELECT COUNT(*) AS diasSemVazamento FROM 
(
    SELECT DAY(dtHora) AS quant FROM Registro
JOIN Sensor ON fkSensor = idSensor 
JOIN Setor ON fkSetor = idSetor
JOIN Fabrica ON fkFabrica = idFabrica
JOIN LimiteAlerta ON fkLimite = idParametroAlerta
WHERE idFabrica = 1 AND dtHora > '2024-12-14 10:00:00' GROUP BY DAY(dtHora)
) AS resultados;


SELECT dtHora FROM Registro
JOIN Sensor ON fkSensor = idSensor 
JOIN Setor ON fkSetor = idSetor
JOIN Fabrica ON fkFabrica = idFabrica
JOIN LimiteAlerta ON fkLimite = idParametroAlerta
WHERE idFabrica = 1 AND porcGas > limiteAlerta ORDER BY dtHora DESC LIMIT 1;



SELECT count(idSensor) FROM sensor;

SELECT fkSensor, MAX(dtHora) AS maxDtHora, porcGas
    FROM Registro
    JOIN Sensor ON fkSensor = idSensor
    WHERE fkSetor = 1
    GROUP BY fkSensor;
    

SELECT fkSensor, dtHora AS maxDtHora, porcGas
    FROM Registro
    JOIN Sensor ON fkSensor = idSensor
    WHERE fkSetor = 1
    ORDER BY dtHora DESC LIMIT 1;
    

SELECT r.fkSensor, r.porcGas, r.dtHora
FROM Registro r
JOIN sensor ON fkSensor = idSensor
JOIN (
    SELECT fkSensor, MAX(dtHora) AS maxDtHora
    FROM Registro
    JOIN Sensor ON fkSetor = idSetor
    WHERE Registro.fkSetor = 1
    GROUP BY fkSensor
) sub ON r.fkSensor = sub.fkSensor AND r.dtHora = sub.maxDtHora
ORDER BY r.dtHora DESC;

        

INSERT INTO Registro VALUES 
(default, '2024-12-14 10:00:00', 13.25, 6),
(default, '2024-12-15 10:00:00', 20.25, 6),
(default, '2024-12-16 10:00:00', 30.25, 6),
(default, '2024-12-17 10:00:00', 12.25, 6),
(default, '2024-12-18 10:00:00', 13.25, 6),
(default, '2024-12-19 10:00:00', 10.25, 6),
(default, '2024-12-20 10:00:00', 10.25, 6);

INSERT INTO Registro VALUES 
(default, '2024-12-30 10:00:00', 100, 6);

INSERT INTO Registro VALUES 
(default, '2024-01-22 10:00', 80, 1);


SELECT MONTH(dtHora) mes, YEAR(dtHora) ano, COUNT(*) AS qtdVazamentos
FROM (
    SELECT dtHora
    FROM Registro 
    JOIN Sensor ON fkSensor = idSensor
    JOIN Setor ON fkSetor = idSetor
    JOIN LimiteAlerta ON fkLimite = idParametroAlerta
    WHERE idSensor = 1 AND porcGas > limiteAlerta
    GROUP BY DATE(dtHora), HOUR(dtHora)
) AS sub
GROUP BY MONTH(dtHora), YEAR(dtHora)
ORDER BY mes DESC, ano DESC LIMIT 12;


SELECT DATE_FORMAT(dtHora, '%b/%Y') AS mes, TRUNCATE(AVG(porcGas), 2) AS porcGas 
FROM Registro WHERE fkSensor = 1 
JOIN Sensor ON fkSensor = idSensor
GROUP BY MONTH(dtHora), YEAR(dtHora) 
ORDER BY dtHora DESC LIMIT 12;

SELECT limitealerta FROM Sensor JOIN Setor ON fkSetor = idSetor
JOIN LimiteAlerta ON fkLimite = idParametroAlerta
WHERE idSensor = 1;

SELECT DATE_FORMAT(dtHora, '%d/%b'), TRUNCATE(AVG(porcGas), 2) FROM Registro GROUP BY DAY(dtHora), MONTH(dtHora), YEAR(dtHora) ORDER BY dtHora DESC LIMIT 30;

SELECT DATE_FORMAT(dtHora, 'Dia %d - %h:%i'), TRUNCATE(AVG(porcGas), 2) FROM Registro GROUP BY HOUR(dtHora), DAY(dtHora), MONTH(dtHora), YEAR(dtHora) ORDER BY dtHora DESC LIMIT 24;