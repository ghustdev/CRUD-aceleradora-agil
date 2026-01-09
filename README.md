# 📦 CRUD Aceleradora Ágil - AgilStore

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
- 🖥️ **Interface CLI:** Terminal interativo para gerenciamento completo

## 🛠️ Stack Tecnológica

- **Runtime:** Node.js (v18+)
- **Framework:** Express.js (v5.2.1)
- **Módulos:** ES Modules (`import`/`export`)
- **Persistência:** File System nativo (fs)
- **Dev Tools:** Nodemon para desenvolvimento
- **CLI:** Readline/promises para interface interativa

![alt text](/images/image.png)

![alt text](/images/code.png)

![alt text](/images/insomnia.png)

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

4. **Acesse a aplicação:**
   - **API REST:** `http://localhost:3000`
   - **CLI Interativa:** `npm run cli` (em outro terminal)

## 📁 Estrutura do Projeto

```
CRUD-aceleradora-agil/
├── server.js           # Servidor principal da API REST
├── app.js              # Interface CLI interativa
├── products_db.json    # Banco de dados JSON (criado automaticamente)
├── package.json        # Configurações e dependências
├── README.md          # Documentação
└── .gitignore         # Arquivos ignorados pelo Git
```

## 🖥️ Interface CLI (Recomendada)

### Como Usar a CLI

1. **Inicie o servidor da API:**
   ```bash
   npm run dev
   ```

2. **Em outro terminal, execute a CLI:**
   ```bash
   npm run cli
   ```

### Funcionalidades da CLI

```
========================================
   AGILSTORE - CONTROLE DE ESTOQUE
========================================

1. Listar todos os produtos
2. Adicionar novo produto
3. Atualizar dados/estoque
4. Excluir produto
5. Buscar produto específico
0. Sair
```

#### 📋 **1. Listar Produtos**
- Lista todos os produtos em formato de tabela
- Permite filtrar por nome ou categoria
- Pressione ENTER vazio para listar todos

#### ➕ **2. Adicionar Produto**
- Interface guiada para cadastro
- Validação automática de campos
- Confirmação visual de sucesso

#### ✏️ **3. Atualizar Produto**
- Mostra lista atual para facilitar seleção
- Permite atualizar campos específicos
- Mantém valores existentes se deixar em branco

#### 🗑️ **4. Excluir Produto**
- Lista produtos antes da exclusão
- Confirmação de segurança obrigatória
- Feedback claro sobre o resultado

#### 🔍 **5. Buscar Específico**
- Busca por ID exato
- Exibe resultado em formato tabular
- Tratamento de erros amigável

### Vantagens da CLI

- ✅ **Interface Amigável:** Menu intuitivo e navegação simples
- ✅ **Validação Visual:** Feedback imediato com emojis e cores
- ✅ **Confirmações de Segurança:** Evita exclusões acidentais
- ✅ **Formatação Tabular:** Visualização clara dos dados
- ✅ **Tratamento de Erros:** Mensagens claras e orientativas

## 📖 Documentação da API REST

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

## 🧪 Testando a Aplicação

### 🖥️ Via CLI (Recomendado)

A forma mais fácil de testar todas as funcionalidades:

```bash
# Terminal 1: Inicie a API
npm run dev

# Terminal 2: Execute a CLI
npm run cli
```

A CLI oferece uma interface completa e intuitiva para todas as operações CRUD.

### 🌐 Via cURL (Testes da API)

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
# Desenvolvimento da API (com hot reload)
npm run dev

# Produção da API
npm start

# Interface CLI interativa
npm run cli

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

## 🚀 Melhorias Futuras

### API
- [ ] Implementar testes automatizados
- [ ] Adicionar middleware de logging
- [ ] Implementar paginação na listagem
- [ ] Adicionar validação de schema (Joi/Yup)
- [ ] Implementar rate limiting
- [ ] Adicionar documentação Swagger/OpenAPI
- [ ] Migrar para banco de dados real (MongoDB/PostgreSQL)
- [ ] Implementar autenticação e autorização
- [ ] Adicionar Docker para containerização

### CLI
- [ ] Adicionar cores no terminal (chalk)
- [ ] Implementar exportação de relatórios
- [ ] Adicionar modo batch para operações em lote
- [ ] Implementar backup/restore do banco
- [ ] Adicionar estatísticas e dashboards
- [ ] Suporte a configurações personalizadas

## 🤝 Contribuição

Este projeto foi desenvolvido como parte do processo seletivo da Aceleradora Ágil da PUCRS.

## 📄 Licença

ISC License - veja o arquivo [package.json](package.json) para detalhes.

---

**Desenvolvido com ❤️ para a Aceleradora Ágil - PUCRS**