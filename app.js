import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';

const rl = readline.createInterface({ input, output });
const API_URL = 'http://localhost:3000/products';

// --- FUNÇÕES ---

const esperarEnter = async () => {
    await rl.question('\nPressione ENTER para continuar...');
};

const cabecalho = (titulo) => {
    console.clear();
    console.log('='.repeat(40));
    console.log(`   AGILSTORE - ${titulo}`);
    console.log('='.repeat(40));
    console.log('');
};

// --- FUNÇÕES DO SISTEMA ---

// 2. Listar produtos
const listarProdutos = async () => {
    cabecalho('LISTAGEM DE PRODUTOS');
    console.log('Pressione [ENTER] vazio para listar todos.');
    
    // A própria função agora gerencia a entrada do usuário
    const filtro = await rl.question('Digite Nome ou Categoria para filtrar: ');

    try {
        const url = filtro 
            ? `${API_URL}/list?busca=${encodeURIComponent(filtro)}` 
            : `${API_URL}/list`;
            
        console.log(`\nBuscando dados...`);
        
        const res = await fetch(url);
        const produtos = await res.json();

        if (produtos.length === 0) {
            console.log('\nNenhum produto encontrado.');
        } else {
            console.table(produtos, ['id', 'nome', 'categoria', 'quantidade', 'preco']);
        }
    } catch (error) {
        console.log('Erro ao conectar com a API.');
    }
};

// 1. Adicionar produto
const adicionarProduto = async () => {
    cabecalho('ADICIONAR PRODUTO');
    console.log('\nPreencha os campos abaixo:');
    console.log('\n---');
    
    const nome = await rl.question('Nome do Produto: ');
    const categoria = await rl.question('Categoria: ');
    const qtdStr = await rl.question('Quantidade em estoque: ');
    const precoStr = await rl.question('Preço (R$): ');

    const corpo = {
        nome,
        categoria,
        quantidade: parseInt(qtdStr),
        preco: parseFloat(precoStr.replace(',', '.'))
    };

    const res = await fetch(`${API_URL}/insert`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(corpo)
    });

    if (res.status === 201) {
        console.log('\n✅ Produto cadastrado com sucesso!');
    } else {
        console.log('\n❌ Erro ao cadastrar produto.');
    }
    await esperarEnter();
};

// 3. Atualizar produto
const atualizarProduto = async () => {
    cabecalho('ATUALIZAR ESTOQUE');
    await listarProdutos(); // Mostra a lista para facilitar
    console.log('\n---');

    const id = await rl.question('Digite o ID do produto para atualizar: ');
    
    // Busca o produto atual para mostrar ao usuário
    const checkRes = await fetch(`${API_URL}/search/${id}`);
    if (checkRes.status !== 200) {
        console.log('❌ Produto não encontrado.');
        await esperarEnter();
        return;
    }
    
    console.log('\nDeixe em branco para manter o valor atual.');
    const nome = await rl.question('Novo Nome: ');
    const categoria = await rl.question('Nova Categoria: ');
    const qtdStr = await rl.question('Nova Quantidade: ');
    const precoStr = await rl.question('Novo Preço: ');

    const corpo = {};
    if (nome) corpo.nome = nome;
    if (categoria) corpo.categoria = categoria;
    if (qtdStr) corpo.quantidade = parseInt(qtdStr);
    if (precoStr) corpo.preco = parseFloat(precoStr.replace(',', '.'));

    const res = await fetch(`${API_URL}/update/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(corpo)
    });

    if (res.status === 200) console.log('\n✅ Produto atualizado!');
    else console.log('\n❌ Erro ao atualizar.');
    
    await esperarEnter();
};

// 4. Excluir produto
const excluirProduto = async () => {
    cabecalho('REMOVER PRODUTO');
    await listarProdutos();
    console.log('\n---');

    const id = await rl.question('Digite o ID do produto para EXCLUIR: ');
    const confirmacao = await rl.question(`Tem certeza que deseja apagar o ID ${id}? (s/n): `);

    if (confirmacao.toLowerCase() === 's') {
        const res = await fetch(`${API_URL}/delete/${id}`, { method: 'DELETE' });
        
        if (res.status === 204) console.log('\n✅ Produto removido do sistema.');
        else if (res.status === 404) console.log('\n❌ Produto não encontrado.');
        else console.log('\n❌ Erro ao excluir.');
    } else {
        console.log('\nOperação cancelada.');
    }
    await esperarEnter();
};

// 5. Buscar produto específico pelo ID
const buscarProduto = async () => {
    cabecalho('BUSCAR NO CATÁLOGO');
    
    // Usamos 'perguntar' para o terminal esperar a digitação
    const id = await rl.question('Digite o ID do produto: ');

    if (!id) {
        console.log('\nCampo de busca vazio.');
        await esperarEnter();
        return;
    }

    try {
        console.log(`\nBuscando ID: "${id}"...`);

        const res = await fetch(`${API_URL}/search/${id}`);

        if (res.status === 404) {
            console.log('\n❌ Produto não encontrado.');
        } else {
            const produto = await res.json();
            
            console.log(`\n✅ Produto encontrado:`);
            console.table([produto], ['id', 'nome', 'categoria', 'quantidade', 'preco']);
        }

    } catch (error) {
        console.log('\n❌ Erro de conexão. Verifique se o servidor está rodando.');
    }

    await esperarEnter();
};

// --- MENU PRINCIPAL ---

const menu = async () => {
    while (true) {
        cabecalho('CONTROLE DE ESTOQUE');
        console.log('1. Listar todos os produtos');
        console.log('2. Adicionar novo produto');
        console.log('3. Atualizar dados/estoque');
        console.log('4. Excluir produto');
        console.log('5. Buscar produto específico');
        console.log('0. Sair');
        console.log('='.repeat(40));

        const opcao = await rl.question('Escolha uma opção: ');

        switch (opcao) {
            case '1':
                cabecalho('LISTA COMPLETA');
                await listarProdutos();
                await esperarEnter();
                break;
            case '2':
                await adicionarProduto();
                break;
            case '3':
                await atualizarProduto();
                break;
            case '4':
                await excluirProduto();
                break;
            case '5':
                await buscarProduto();
                break;
            case '0':
                console.log('Saindo do sistema...');
                rl.close();
                process.exit(0);
                break;
            default:
                console.log('Opção inválida.');
                await esperarEnter();
        }
    }
};

menu();