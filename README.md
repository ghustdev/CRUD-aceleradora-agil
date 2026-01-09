# 📦 CRUD Aceleradora Ágil

> **Desafio:** Construir um CRUD em JavaScript e Node.js para a 2ª etapa do processo seletivo da Aceleradora Ágil da PUCRS

Uma API RESTful robusta desenvolvida com **Node.js** e **Express**, utilizando persistência em arquivo JSON local. Este projeto implementa um sistema completo de gerenciamento de produtos com operações CRUD e funcionalidades de busca avançada.

## ✨ Funcionalidades

- ✅ **CRUD Completo:** Criar, Ler, Atualizar e Deletar produtos
- 🔍 **Busca Inteligente:** Filtragem por nome ou categoria (case-insensitive)
- 💾 **Persistência Garantida:** Dados mantidos em arquivo JSON local
- 🆔 **IDs Automáticos:** Geração sequencial inteligente baseada no último registro
- 🛡️ **Validação de Dados:** Verificação de campos obrigatórios
- 📊 **Respostas Padronizadas:** Status HTTP apropriados e mensagens de erro claras
- 🔄 **Hot Reload:** Reinicialização automática durante desenvolvimento

## 🛠️ Stack Tecnológica

- **Runtime:** Node.js (v18+)
- **Framework:** Express.js (v5.2.1)
- **Módulos:** ES Modules (`import`/`export`)
- **Persistência:** File System nativo (fs)
- **Dev Tools:** Nodemon para desenvolvimento

## 🚀 Início Rápido

### Pré-requisitos

- [Node.js](https://nodejs.org/) v18 ou superior
- npm (incluído com Node.js)

### Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/ghustdev/CRUD-aceleradora-agil.git
   cd CRUD-aceleradora-agil
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor:**
   ```bash
   # Modo desenvolvimento (com hot reload)
   npm run dev
   
   # Modo produção
   npm start
   ```

4. **Acesse a API:**
   - URL base: `http://localhost:3000`
   - Status: `GET http://localhost:3000/`

## 📁 Estrutura do Projeto

```
CRUD-aceleradora-agil/
├── server.js           # Servidor principal da API
├── products_db.json    # Banco de dados JSON (criado automaticamente)
├── package.json        # Configurações e dependências
├── README.md          # Documentação
└── .gitignore         # Arquivos ignorados pelo Git
```

## 📖 Documentação da API

### Base URL
```
http://localhost:3000
```

### Endpoints Disponíveis

#### 🟢 Status da API
```http
GET /
```
**Resposta:**
```json
"Bem-vindo à API de produtos!"
```

#### 📝 Criar Produto
```http
POST /products/insert
Content-Type: application/json
```

**Body:**
```json
{
  "nome": "Galaxy A56",
  "categoria": "Tecnologia",
  "quantidade": 20,
  "preco": 1000
}
```

**Resposta (201):**
```json
{
  "id": "1",
  "nome": "Galaxy A56",
  "categoria": "Tecnologia",
  "quantidade": 20,
  "preco": 1000
}
```

**Erro (400):**
```json
{
  "erro": "Nome, categoria, quantidade e preço são obrigatórios"
}
```

#### 🔍 Listar Produtos
```http
GET /products/list
GET /products/list?busca=tecnologia
```

**Resposta:**
```json
[
  {
    "id": "1",
    "nome": "Galaxy A56",
    "categoria": "Tecnologia",
    "quantidade": 20,
    "preco": 1000
  }
]
```

#### 🆔 Buscar Produto por ID
```http
GET /products/search/:id
```

**Exemplo:** `GET /products/search/1`

**Resposta (200):**
```json
{
  "id": "1",
  "nome": "Galaxy A56",
  "categoria": "Tecnologia",
  "quantidade": 20,
  "preco": 1000
}
```

**Erro (404):**
```json
{
  "erro": "Produto não encontrado"
}
```

#### ✏️ Atualizar Produto
* Atualiza apenas os campos fornecidos. Os vazios permanecem os mesmos.
```http
PUT /products/update/:id
Content-Type: application/json
```

**Body (campos opcionais):**
```json
{
  "preco": 1100.00,
  "quantidade": 15
}
```

**Resposta (200):**
```json
{
  "id": "1",
  "nome": "Galaxy A56",
  "categoria": "Tecnologia",
  "quantidade": 15,
  "preco": 1100
}
```

#### ❌ Deletar Produto
* Não há verificação do usuário para confirmar exclusão, pois escolhi fazer uma API RESTful padrão.
```http
DELETE /products/delete/:id
```

**Resposta (204):** Sem conteúdo (sucesso)

**Erro (404):**
```json
{
  "erro": "Produto não encontrado"
}
```

## 🧪 Testando a API

### Via cURL (Terminal)

**1. Verificar status:**
```bash
curl http://localhost:3000/
```

**2. Criar produto:**
```bash
curl -X POST http://localhost:3000/products/insert \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "SSD 1TB",
    "categoria": "Armazenamento",
    "quantidade": 20,
    "preco": 300
  }'
```

**3. Listar todos os produtos:**
```bash
curl http://localhost:3000/products/list
```

**4. Buscar com filtro:**
```bash
curl "http://localhost:3000/products/list?busca=ssd"
```

**5. Buscar por ID:**
```bash
curl http://localhost:3000/products/search/1
```

**6. Atualizar produto:**
```bash
curl -X PUT http://localhost:3000/products/update/1 \
  -H "Content-Type: application/json" \
  -d '{"preco": 280, "quantidade": 25}'
```

**7. Deletar produto:**
```bash
curl -X DELETE http://localhost:3000/products/delete/1
```

### Via Clientes HTTP

Recomendamos usar:
- [Postman](https://www.postman.com/)
- [Insomnia](https://insomnia.rest/)
- [Thunder Client](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client) (extensão VS Code)
- [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) (extensão VS Code)

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento (com hot reload)
npm run dev

# Produção
npm start

# Executar testes (não implementado)
npm test
```

## 📊 Códigos de Status HTTP

| Código | Significado | Quando ocorre |
|--------|-------------|---------------|
| 200 | OK | Operação realizada com sucesso |
| 201 | Created | Produto criado com sucesso |
| 204 | No Content | Produto deletado com sucesso |
| 400 | Bad Request | Dados inválidos ou campos obrigatórios ausentes |
| 404 | Not Found | Produto não encontrado |
| 500 | Internal Server Error | Erro interno do servidor |

## 🛡️ Validações Implementadas

- **Campos obrigatórios:** nome, categoria, quantidade, preco
- **Tipos de dados:** Validação automática via JSON parsing
- **IDs únicos:** Geração automática sequencial
- **Busca case-insensitive:** Funciona com maiúsculas e minúsculas

## 🤝 Contribuição

Este projeto foi desenvolvido como parte do processo seletivo da Aceleradora Ágil da PUCRS.

## 📄 Licença

ISC License - veja o arquivo [package.json](package.json) para detalhes.

---

**Desenvolvido  para a Aceleradora Ágil - PUCRS**