CREATE TABLE
    users (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    );

CREATE TABLE
    categories (
        id SERIAL PRIMARY KEY,
        description TEXT NOT NULL
    );

CREATE TABLE
    transactions (
        id SERIAL PRIMARY KEY,
        description TEXT NOT NULL,
        value INTEGER NOT NULL,
        date DATE NOT NULL,
        category_id INTEGER REFERENCES categories(id) NOT NULL,
        user_id INTEGER REFERENCES users(id) NOT NULL,
        type TEXT NOT NULL
    );

INSERT INTO
categories (description)
VALUES
('Alimentação'),
('Assinaturas e Serviços'),
('Casa'),
('Mercado'),
('Cuidados Pessoais'),
('Educação'),
('Família'),
('Lazer'),
('Pets'),
('Presentes'),
('Roupas'),
('Saúde'),
('Transporte'),
('Salário'),
('Vendas'),
('Outras receitas'),
('Outras despesas');
