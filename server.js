import express from 'express';
import fs from 'fs';

const app = express();
const PORT = 3000;
const DB = './products_db.json';

// Middleware para entender JSON no corpo das requisições
app.use(express.json());

// --- FUNÇÕES AUXILIARES ---

// Ler dados do JSON com tratamentos de erros
const lerDados = () => {
    try {
        const data = fs.readFileSync(DB, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

// Escrever dados no JSON com tratamentos de erros
const escreverDados = (data) => {
    fs.writeFileSync(DB, JSON.stringify(data, null, 2));
};

// --- ROTAS ---

// 0. Home
app.get('/', (req, res) => {
    res.send('Bem-vindo à API de produtos!');
});

// 1. Adicionar produtos
app.post('/products/insert', (req, res) => {
    const { nome, categoria, quantidade, preco } = req.body;
    
    // Validação simples
    if (!nome || !categoria || !quantidade || !preco) {
        return res.status(400).json({ erro: 'Nome, categoria, quantidade e preço são obrigatórios' });
    }

    const db = lerDados();

    let lastID = 0;
    db.forEach(product => {
        lastID = product.id;
    });

    lastID++;
    lastID = lastID.toString();
    
    const newProduct = {
        id: lastID,
        nome,
        categoria,
        quantidade,
        preco: preco || 0 // Preço padrão será 0
    };

    db.push(newProduct);
    escreverDados(db);

    res.status(201).json(newProduct);
    console.log("\nCadastro realizado!");
});

// 2. Listar produtos
app.get('/products/list', (req, res) => {
    const db = lerDados();
    const { busca } = req.query;

    if (busca) {
        // Filtra se houver parâmetro de busca (ex: ?busca=Tecnologia)
        const resultados = db.filter(product => 
            product.nome.toLowerCase().includes(busca.toLowerCase()) ||
            product.categoria.toLowerCase().includes(busca.toLowerCase())
        );
        return res.json(resultados);
    }

    res.json(db);
    console.log("\nBusca realizada!");
});

// 3. Buscar produto específico pelo ID ou Nome
app.get('/products/search/:id', (req, res) => {
    const db = lerDados();
    const product = db.find(item => item.id == req.params.id);

    if (!product) return res.status(404).json({ erro: 'Produto não encontrado' });

    res.json(product);
    console.log("\nBusca realizada!");
});

// 4. Atualizar protuto
app.put('/products/update/:id', (req, res) => {
    const { id } = req.params;
    const { nome, categoria, quantidade, preco } = req.body;
    
    const db = lerDados();
    const index = db.findIndex(item => item.id === id);

    if (index === -1) return res.status(404).json({ erro: 'Produto não encontrado' });

    // Atualiza apenas os campos enviados ou mantém o antigo
    db[index] = {
        ...db[index],
        nome: nome || db[index].nome,
        categoria: categoria || db[index].categoria,
        quantidade: quantidade !== undefined ? quantidade : db[index].quantidade,
        preco: preco !== undefined ? preco : db[index].preco
    };

    escreverDados(db);
    res.json(db[index]);

    console.log("\nAtualização realizada!");
});

// 5. Excluir produto
app.delete('/products/delete/:id', (req, res) => {
    const { id } = req.params;
    const db = lerDados();
    
    const novaLista = db.filter(product => product.id !== id);

    if (db.length === novaLista.length) {
        return res.status(404).json({ erro: 'Produto não encontrado' });
    }

    escreverDados(novaLista);
    console.log("\nProduto excluido com sucesso!");
    res.status(204).send(); // 204 = No Content (sucesso sem corpo)
});

// --- EXECUÇÃO ---

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});