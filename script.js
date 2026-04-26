let carrinho = [];

const produtos = [
    {
        id: 1,
        nome: "Arroz",
        preco: 4,
        categoria: "Alimentos",
        descricao: "Arroz branco tipo 1, pacote de 1kg, marca camil",
        imagens:[
            "img/arroz camil.jpg",
            "img/arroz camil.jpg",
            "img/arroz camil.jpg"
        ]
    },
    {
        id: 2,
        nome: "Macarrão",
        preco: 4,
        categoria: "Alimentos",
        descricao: " Macarrão Fortaleza",
        imagens:[
            "img/macarraoFortaleza.jpg",
            "img/macarraoFortaleza.jpg",
            "img/macarraoFortaleza.jpg"
        ]
    },
    {
        id: 3,
        nome: "Feijão",
        preco: 6,
        categoria: "Alimentos",
        descricao: "Feijão tipo 1, pacote de 1kg, marca Kicaldo",
        imagens:[
            "img/feijao de corda kicaldo 1 k.jpg",
            "img/feijao de corda kicaldo 1 k.jpg",
            "img/feijao de corda kicaldo 1 k.jpg"
        ]
    }
];

const lista = document.getElementById("lista-produtos");
let produtoAtual = null;

const btnCarrinho = document.getElementById("btn-carrinho");
btnCarrinho.addEventListener("click", () => {
    document.getElementById("modal-carrinho").classList.remove("oculto");
})

function fecharCarrinho() {
    document.getElementById("modal-carrinho").classList.add("oculto");
}

function atualizandoBotaoCarrinho(){
    const btnCarrinho = document.getElementById("btn-carrinho");
    
    let totalItns = 0;

    carrinho.forEach(item => {
        totalItns +=item.quantidade;
    })

    btnCarrinho.innerText =  `🛒 Carrinho (${totalItns})`;
}

produtos.forEach(produto => {
    const card = document.createElement("div");
    card.classList.add("card");

    const img = document.createElement("img");
    img.src = produto.imagens[0];

    img.addEventListener("click", () => {
        abrirModal(produto.id);
    })

    const titulo = document.createElement("h3");
    titulo.innerText = produto.nome;

    const preco = document.createElement("p");
    preco.innerText = "R$ " + produto.preco;

    const botao = document.createElement("button");
    botao.innerText = "Adicionar";

    botao.addEventListener("click", (e) => {
        e.stopPropagation(); 
        adicionarProduto(produto);
        card.classList.add("animar");

        setTimeout(() => {
            card.classList.remove("animar");
        }, 300)
    })

    card.appendChild(img);
    card.appendChild(titulo);
    card.appendChild(preco);
    card.appendChild(botao);

    lista.appendChild(card);
});

function adicionarProduto(produto){
    const itemExitente = carrinho.find(
        p => p.id === produto.id
    );

    if(itemExitente){
        itemExitente.quantidade += 1;
    } else {
        carrinho.push({
            ...produto,
            quantidade: 1
        });
    }

    salvaCarrinho();
    atualizarCarrinho();
    atualizandoBotaoCarrinho();

    mostrarToast("✔ Produto adicionado: " + produto.nome);
}


function abrirModal(id){
    const produto = produtos.find(p=> p.id === id);
    if(!produto) return;

    produtoAtual = produto;

    document.getElementById("nome").innerText = produto.nome;
    document.getElementById("descricao").innerText = produto.descricao;
    document.getElementById("preco").innerText = "R$ " + produto.preco;

    const imgPrincipal = document.getElementById("img-principal");
    imgPrincipal.src = produto.imagens[0];

    

    document.getElementById("modal").classList.remove("oculto");
}

function smsAdicionado(){
    if(!produtoAtual) return;
    adicionarProduto(produtoAtual);
    fecharModal();
}

function fecharModal(){
    document.getElementById("modal").classList.add("oculto");
}

function atualizarCarrinho(){
    const lista = document.getElementById("lista-carrinho");
    const total = document.getElementById("total");

    lista.innerHTML = "";

    let soma = 0;

    carrinho.forEach(item => {

        const li = document.createElement("li");

        li.innerHTML = `
        <span>
        ${item.nome} (x${item.quantidade}) - R$ ${item.preco * item.quantidade}
    </span>

    <div class="botoes-carrinho">
        <button class="corButaoMenos" onclick="diminuir(${item.id})">-</button>
        <button class="corButaoAumentar" onclick="aumentar(${item.id})">+</button>
        <button class="corButaoRemover" onclick="remover(${item.id})">X</button>
    </div>
        `

        lista.appendChild(li);

        soma += item.preco * item.quantidade;
    });
    total.innerText = "Total: R$ " + soma;
}

function aumentar(id){
    const item = carrinho.find(p=> p.id === id);

    if(item){
        item.quantidade += 1;
        atualizarTudo();
    }
}

function diminuir(id){
    const item = carrinho.find( p=> p.id === id);

    if (item) {
        item.quantidade -= 1;

        if(item.quantidade <= 0){
            carrinho = carrinho.filter( p => p.id !== id);
        }
        atualizarTudo();
    }
}

function remover(id){
    carrinho = carrinho.filter( p => p.id !== id);
    atualizarTudo();
}

function atualizarTudo(){
    salvaCarrinho();
    atualizarCarrinho();
    atualizandoBotaoCarrinho();
}

function salvaCarrinho(){
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function carregarCarrinho(){
    const dados = localStorage.getItem("carrinho");

    if(dados){
        carrinho = JSON.parse(dados);
        atualizarCarrinho();
    }
}

function abrirModalCliente(){
    document.getElementById("modal-carrinho").classList.add("oculto");
    document.getElementById("modal-cliente").classList.remove("oculto");
}

function fecharModalCliente(){
    document.getElementById("modal-cliente").classList.add("oculto");
}

function enviarPedido(){
    const nome = document.getElementById("nomeCliente").value;
    const endereco = document.getElementById("endereco").value;
    const numero = document.getElementById("numeroCasa").value;
    const telefone = document.getElementById("telefone").value;
    const pagamento = document.getElementById("pagamento").value;
    const troco = document.getElementById("troco").value;

    let mensagem = "🛒 Pedido:\n\n";

    carrinho.forEach(item => {
        mensagem += `${item.nome} 
        (x${item.quantidade}) valor R$: ${item.preco * item.quantidade}\n `;
    });


    let total = 0;
    carrinho.forEach(item => {
        total += item.preco * item.quantidade;
    });

    mensagem += `\nTotal: R$ ${total}\n\n`;

    mensagem += `👤 Nome: ${nome}\n`;
    mensagem += `📍 Endereço: ${endereco}, Nº ${numero}\n`;
    mensagem += `📞 Telefone: ${telefone}\n`;
    mensagem += `💳 Pagamento: ${pagamento}\n`;

    if(pagamento === "Dinheiro" && troco){
        mensagem += `💰 Troco para: R$ ${troco}\n`;
    }

    if(!nome || !endereco || !telefone){
        return;
    }

    const numeroWhats = "5585921996610";

    const link = `https://wa.me/${numeroWhats}?text=${encodeURIComponent(mensagem)}`;

    window.open(link, "_blank");
    alert("Pedido enviado com sucesso!");

    limpaCarrinho();
    fecharModalCliente();

}
function limpaCarrinho(){
    carrinho= [];
    localStorage.removeItem("carrinho");

    atualizarCarrinho();
    atualizandoBotaoCarrinho();
}

function mostrarToast(mensagem){
    const toast = document.getElementById("toast");

    toast.innerText = mensagem;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000)
}


carregarCarrinho();
atualizandoBotaoCarrinho();