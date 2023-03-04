# API-REST: Controle de Despesas Pessoais

Este projeto é uma RESTful API que possui as seguintes funcionalidades:

- Cadastrar Usuário
- Fazer Login do Usuário
- Detalhar Perfil do Usuário Logado
- Editar Perfil do Usuário Logado
- Listar categorias
- Cadastrar transação
- Listar transações
- Filtrar transações por categoria
- Detalhar transação
- Editar transação
- Remover transação
- Obter extrato de transações

**Observação:** Cada usuário só pode consultar e manipular seus próprios dados e transações após **autenticação** via **token**.

## **Banco de dados**

O projeto utiliza o banco de dados PostgreSQL modelado conforme modelo abaixo:

- Nome: `dindin`

- Entidades:
  - usuarios
    - id
    - nome
    - email (campo único)
    - senha
  - categorias
    - id
    - descricao
  - transacoes
    - id
    - descricao
    - valor
    - data
    - categoria_id
    - usuario_id
    - tipo

**Observação:** O arquivo dump.sql possui o script de criação do banco de dados e suas entidades.

Antes do consumo da API é necessário popular a tabela categorias conforme sugerido abaixo:

**Categorias**

- Alimentação
- Assinaturas e Serviços
- Casa
- Mercado
- Cuidados Pessoais
- Educação
- Família
- Lazer
- Pets
- Presentes
- Roupas
- Saúde
- Transporte
- Salário
- Vendas
- Outras receitas
- Outras despesas

**Observação:** O arquivo dump.sql contém o script de inserção das categorias acima na tabela.

## **Endpoints**

### **Cadastrar usuário**

#### `POST` `/usuario`

Essa é a rota que será utilizada para cadastrar um novo usuario no sistema.

- **Requisição**  
  Sem parâmetros de rota ou de query.  
  O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

  - nome
  - email
  - senha

- **Resposta**  
  Em caso de **sucesso**, será enviado no corpo (body) da resposta, os dados do usuário cadastrado, incluindo seu respectivo `id` e excluindo a senha criptografada.
  Em caso de **falha na validação**, será enviado como resposta, em seu corpo (body), um objeto com uma propriedade **mensagem** que possui como valor, um texto explicando o motivo da falha.

#### **Exemplo de requisição**

```javascript
// POST /usuario
{
    "nome": "José",
    "email": "jose@email.com",
    "senha": "123456"
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 201
{
    "id": 1,
    "nome": "José",
    "email": "jose@email.com"
}
```

```javascript
// HTTP Status 409
{
    "mensagem": "Já existe usuário cadastrado com o e-mail informado."
}
```

### **Login do usuário**

#### `POST` `/login`

Essa é a rota que permite o usuario cadastrado realizar o login no sistema.

- **Requisição**  
  Sem parâmetros de rota ou de query.  
  O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

  - email
  - senha

- **Resposta**  
  Em caso de **sucesso**, no corpo (body) da resposta, será enviado um objeto com a propriedade **token**, que possui como valor o token de autenticação gerado e uma propriedade **usuario** contendo as informações do usuário autenticado, exceto a senha.
  Em caso de **falha na validação**, será enviado como resposta, em seu corpo (body), um objeto com uma propriedade **mensagem** que possui como valor, um texto explicando o motivo da falha.

#### **Exemplo de requisição**

```javascript
// POST /login
{
    "email": "jose@email.com",
    "senha": "123456"
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 201
{
    "usuario": {
        "id": 1,
        "nome": "José",
        "email": "jose@email.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjIzMjQ5NjIxLCJleHAiOjE2MjMyNzg0MjF9.KLR9t7m_JQJfpuRv9_8H2-XJ92TSjKhGPxJXVfX6wBI"
}
```

```javascript
// HTTP Status 403
{
    "mensagem": "Usuário e/ou senha inválido(s)."
}
```

---

## **ATENÇÃO**: Todas as funcionalidades (endpoints) a partir desse ponto, exigem o token de autenticação do usuário logado, recebendo no header com o formato Bearer Token.

---

### **Detalhar usuário**

#### `GET` `/usuario`

Essa é a rota que será chamada quando o usuario quiser obter os dados do seu próprio perfil.  
**Atenção!:** O usuário deverá ser identificado através do ID presente no token de autenticação.

- **Requisição**  
  Sem parâmetros de rota ou de query.  
  Não deverá possuir conteúdo no corpo da requisição.

- **Resposta**  
  Em caso de **sucesso**, o corpo (body) da resposta receberá um objeto que representa o usuário encontrado, com todas as suas propriedades (exceto a senha).
  Em caso de **falha na validação**, será enviado como resposta, em seu corpo (body), um objeto com uma propriedade **mensagem** que possui como valor, um texto explicando o motivo da falha.

#### **Exemplo de requisição**

```javascript
// GET /usuario
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200
{
    "id": 1,
    "nome": "José",
    "email": "jose@email.com"
}
```

```javascript
// HTTP Status 401
{
    "mensagem": "Para acessar este recurso um token de autenticação válido deve ser enviado."
}
```

### **Atualizar usuário**

#### `PUT` `/usuario`

Essa é a rota que será chamada quando for realizar alterações no próprio usuário.

- **Requisição**  
  Sem parâmetros de rota ou de query.  
  O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

  - nome
  - email
  - senha

- **Resposta**  
  Em caso de **sucesso**, os dados serão atualizados e não será enviado conteúdo no corpo (body) da resposta.  
  Em caso de **falha na validação**, será enviado como resposta, em seu corpo (body), um objeto com uma propriedade **mensagem** que possui como valor, um texto explicando o motivo da falha.

#### **Exemplo de requisição**

```javascript
// PUT /usuario
{
    "nome": "José de Abreu",
    "email": "jose_abreu@email.com",
    "senha": "j4321"
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 204
// Sem conteúdo no corpo (body) da resposta
```

```javascript
// HTTP Status 409
{
    "mensagem": "Já existe usuário cadastrado com o e-mail informado."
}
```

### **Listar categorias**

#### `GET` `/categoria`

Essa é a rota que será chamada quando o usuario logado quiser listar todas as categorias cadastradas.

- **Requisição**  
  Sem parâmetros de rota ou de query.  
  Não deverá possuir conteúdo no corpo (body) da requisição.

- **Resposta**  
  Em caso de **sucesso**, o corpo (body) da resposta receberá um array dos objetos (categorias) encontrados.  
  Em caso de **falha na validação**, será enviado como resposta, em seu corpo (body), um objeto com uma propriedade **mensagem** que possui como valor, um texto explicando o motivo da falha.

#### **Exemplo de requisição**

```javascript
// GET /categoria
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200
[
  {
    id: 1,
    descricao: "Roupas",
  },
  {
    id: 2,
    descricao: "Mercado",
  },
];
```

```javascript
// HTTP Status 200
[];
```

### **Listar transações do usuário logado**

#### `GET` `/transacao`

Essa é a rota que será chamada quando o usuario logado quiser listar todas as suas transações ou filtrar por categorias.

- **Requisição**  
  Sem parâmetros de rota.
  Parâmetro opcional do tipo query filtro.  
  Não deverá possuir conteúdo no corpo (body) da requisição.

- **Resposta**  
  Em caso de **sucesso**, o corpo (body) da resposta receberá um array dos objetos (transações) encontrados.  
  Em caso de **falha na validação**, será enviado como resposta, em seu corpo (body), um objeto com uma propriedade **mensagem** que possui como valor, um texto explicando o motivo da falha.

#### **Exemplos de requisição**

```javascript
// GET /transacao
// Sem conteúdo no corpo (body) da requisição
```

```javascript
// GET /transacao?filtro[]=roupas
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200
[
  {
    id: 1,
    tipo: "saida",
    descricao: "Sapato amarelo",
    valor: 15800,
    data: "2022-03-23T15:35:00.000Z",
    usuario_id: 5,
    categoria_id: 4,
    categoria_nome: "Roupas",
  },
  {
    id: 3,
    tipo: "entrada",
    descricao: "Salário",
    valor: 300000,
    data: "2022-03-24T15:30:00.000Z",
    usuario_id: 5,
    categoria_id: 6,
    categoria_nome: "Salários",
  },
];
```

```javascript
// HTTP Status 200
[
  {
    id: 1,
    tipo: "saida",
    descricao: "Sapato amarelo",
    valor: 15800,
    data: "2022-03-23T15:35:00.000Z",
    usuario_id: 5,
    categoria_id: 4,
    categoria_nome: "Roupas",
  },
];
```

```javascript
// HTTP Status 200
[];
```

### **Detalhar uma transação do usuário logado**

#### `GET` `/transacao/:id`

Essa é a rota que será chamada quando o usuario logado quiser obter uma das suas transações cadastradas.

- **Requisição**  
  Deverá ser enviado o ID da transação no parâmetro de rota do endpoint.  
  O corpo (body) da requisição não deverá possuir nenhum conteúdo.

- **Resposta**  
  Em caso de **sucesso**, o corpo (body) da resposta recerá um objeto que representa a transação encontrada, com todas as suas propriedades, conforme exemplo abaixo, acompanhado de **_status code_** apropriado.  
  Em caso de **falha na validação**, será enviado como resposta, em seu corpo (body), um objeto com uma propriedade **mensagem** que possui como valor, um texto explicando o motivo da falha.

#### **Exemplo de requisição**

```javascript
// GET /transacao/2
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200
{
    "id": 3,
    "tipo": "entrada",
    "descricao": "Salário",
    "valor": 300000,
    "data": "2022-03-24T15:30:00.000Z",
    "usuario_id": 5,
    "categoria_id": 6,
    "categoria_nome": "Salário",
}
```

```javascript
// HTTP Status 404
{
    "mensagem": "Não existe transação para o id informado."
}
```

### **Cadastrar transação para o usuário logado**

#### `POST` `/transacao`

Essa é a rota que será utilizada para cadastrar uma transação associada ao usuário logado.

- **Requisição**  
  Sem parâmetros de rota ou de query.  
  O corpo (body) da requisição deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

  - descricao
  - valor
  - data
  - categoria_id
  - tipo (campo que será informado se a transação corresponde a uma saída ou entrada de valores)

- **Resposta**
  Em caso de **sucesso**, será enviado no corpo (body) da resposta, as informações da transação cadastrada, incluindo seu respectivo `id`.  
  Em caso de **falha na validação**, será enviado como resposta, em seu corpo (body), um objeto com uma propriedade **mensagem** que possui como valor, um texto explicando o motivo da falha.

#### **Exemplo de requisição**

```javascript
// POST /transacao
{
    "tipo": "entrada",
    "descricao": "Salário",
    "valor": 300000,
    "data": "2022-03-24T15:30:00.000Z",
    "categoria_id": 6
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 201
{
    "id": 3,
    "tipo": "entrada",
    "descricao": "Salário",
    "valor": 300000,
    "data": "2022-03-24T15:30:00.000Z",
    "usuario_id": 5,
    "categoria_id": 6,
    "categoria_nome": "Salários",
}
```

```javascript
// HTTP Status 400
{
    "mensagem": "Todos os campos obrigatórios devem ser informados."
}
```

### **Atualizar transação do usuário logado**

#### `PUT` `/transacao/:id`

Essa é a rota que será chamada quando o usuario logado quiser atualizar uma das suas transações cadastradas.

- **Requisição**  
  Deverá ser enviado o ID da transação no parâmetro de rota do endpoint.  
  O corpo (body) da requisição deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

  - descricao
  - valor
  - data
  - categoria_id
  - tipo (campo que será informado se a transação corresponde a uma saída ou entrada de valores)

- **Resposta**  
  Em caso de **sucesso**, a transação do usuário será atualizada e não será enviado conteúdo no corpo (body) da resposta.  
  Em caso de **falha na validação**, será enviado como resposta, em seu corpo (body), um objeto com uma propriedade **mensagem** que possui como valor, um texto explicando o motivo da falha.

#### **Exemplo de requisição**

```javascript
// PUT /transacao/2
{
	"descricao": "Sapato amarelo",
	"valor": 15800,
	"data": "2022-03-23 12:35:00",
	"categoria_id": 4,
	"tipo": "saida"
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 204
// Sem conteúdo no corpo (body) da resposta
```

```javascript
// HTTP Status 400
{
    "mensagem": "Todos os campos obrigatórios devem ser informados."
}
```

### **Excluir transação do usuário logado**

#### `DELETE` `/transacao/:id`

Essa é a rota que será chamada quando o usuario logado quiser excluir uma das suas transações cadastradas.

- **Requisição**  
  Deverá ser enviado o ID da transação no parâmetro de rota do endpoint.  
  O corpo (body) da requisição não deverá possuir nenhum conteúdo.

- **Resposta**  
  Em caso de **sucesso**, o usuário será excluido e não será enviado conteúdo no corpo (body) da resposta.  
  Em caso de **falha na validação**, será enviado como resposta, em seu corpo (body), um objeto com uma propriedade **mensagem** que possui como valor, um texto explicando o motivo da falha.

#### **Exemplo de requisição**

```javascript
// DELETE /transacao/2
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 204
// Sem conteúdo no corpo (body) da resposta
```

```javascript
// HTTP Status 404
{
    "mensagem": "Não existe transação para o id informado."
}
```

### **Obter extrato de transações**

#### `GET` `/transacao/extrato`

Essa é a rota que será chamada quando o usuario logado quiser obter o extrato de todas as suas transações cadastradas.

- **Requisição**  
  Sem parâmetros de rota ou de query.  
  O corpo (body) da requisição não deverá possuir nenhum conteúdo.

- **Resposta**  
  Em caso de **sucesso**, será enviado no corpo (body) da resposta, um objeto contendo a soma de todas as transações do tipo `entrada` e a soma de todas as transações do tipo `saida`.
  Em caso de **falha na validação**, será enviado como resposta, em seu corpo (body), um objeto com uma propriedade **mensagem** que possui como valor, um texto explicando o motivo da falha.

#### **Exemplo de requisição**

```javascript
// DELETE /transacao/extrato
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200
{
	"entrada": 300000,
	"saida": 15800
}
```
