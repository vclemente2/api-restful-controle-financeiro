--Criação do banco de dados dindin

CREATE DATABASE dindin;

--Criação da tabela usuarios

CREATE TABLE
    usuarios (
        id SERIAL PRIMARY KEY,
        nome TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        senha TEXT NOT NULL
    );

--Criação da tabela categorias.

CREATE TABLE
    categorias (
        id SERIAL PRIMARY KEY,
        descricao TEXT NOT NULL
    );

--Criação da tabela transacoes.

CREATE TABLE
    transacoes (
        id SERIAL PRIMARY KEY,
        descricao TEXT NOT NULL,
        valor INTEGER NOT NULL,
        data DATE NOT NULL,
        categoria_id INTEGER REFERENCES categorias(id) NOT NULL,
        usuario_id INTEGER REFERENCES usuarios(id) NOT NULL,
        tipo TEXT NOT NULL
    );

--Inserção de cada descrição que representa o nome das categorias.

INSERT INTO
    categorias (descricao)
VALUES ('Alimentação'), ('Assinaturas e Serviços'), ('Casa'), ('Mercado'), ('Cuidados Pessoais'), ('Educação'), ('Família'), ('Lazer'), ('Pets'), ('Presentes'), ('Roupas'), ('Saúde'), ('Transporte'), ('Salário'), ('Vendas'), ('Outras receitas'), ('Outras despesas');