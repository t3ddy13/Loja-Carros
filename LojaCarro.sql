CREATE DATABASE LojaCarro;
USE LojaCarro;

-- Tabela de Clientes
CREATE TABLE clientes (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    telefone VARCHAR(20),
    endereco VARCHAR(150),
    data_registo TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Carros
CREATE TABLE carros (
    id_carro INT AUTO_INCREMENT PRIMARY KEY,
    marca VARCHAR(50) NOT NULL,
    modelo VARCHAR(50) NOT NULL,
    ano INT,
    preco DECIMAL(10,2),
    estado ENUM('disponivel', 'vendido') DEFAULT 'disponivel'
);

-- Tabela de Vendas
CREATE TABLE vendas (
    id_venda INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT,
    id_carro INT,
    data_venda TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    valor_final DECIMAL(10,2),
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente),
    FOREIGN KEY (id_carro) REFERENCES carros(id_carro)
);

-- Tabela de Funcionários
CREATE TABLE funcionarios (
    id_funcionario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    cargo VARCHAR(50),
    salario DECIMAL(10,2)
);

-- Tabela de Pagamentos
CREATE TABLE pagamentos (
    id_pagamento INT AUTO_INCREMENT PRIMARY KEY,
    id_venda INT,
    metodo ENUM('dinheiro', 'cartao', 'transferencia'),
    valor DECIMAL(10,2),
    data_pagamento TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_venda) REFERENCES vendas(id_venda)
);

-- Inserção de exemplo (Cliente)
INSERT INTO clientes (nome, email, telefone, endereco)
VALUES ('João Silva', 'joao@gmail.com', '923456789', 'Luanda');

-- Inserção de exemplo (Carro)
INSERT INTO carros (marca, modelo, ano, preco)
VALUES ('Toyota', 'Corolla', 2020, 15000.00);

-- Inserção de exemplo (Venda)
INSERT INTO vendas (id_cliente, id_carro, valor_final)
VALUES (1, 1, 14500.00);

-- Inserção de exemplo (Pagamento)
INSERT INTO pagamentos (id_venda, metodo, valor)
VALUES (1, 'transferencia', 14500.00);
