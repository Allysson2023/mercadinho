let carrinho = []

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

    somAdd.currentTime = 0;
    somAdd.play().catch(() => {});

    salvaCarrinho();
    atualizarCarrinho();
    atualizandoBotaoCarrinho();

    mostrarToast("✔ Produto adicionado: " + produto.nome);
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

    const btnLimpar = document.querySelector(".btn-limpar");

    if(btnLimpar){
        btnLimpar.style.display = carrinho.length === 0 ? "none" : "block";
    }

    const btnContinuar = document.querySelector(".btn-continua");

    if (btnContinuar) {
        btnContinuar.style.display = carrinho.length === 0 ? "none" : "block";
        btnContinuar.disabled = carrinho.length === 0;
    }
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

function atualizarTudo(){
    salvaCarrinho();
    atualizarCarrinho();
    atualizandoBotaoCarrinho();
}


function atualizandoBotaoCarrinho(){
    const btnCarrinho = document.getElementById("btn-carrinho");
    
    let totalItns = 0;

    carrinho.forEach(item => {
        totalItns +=item.quantidade;
    })

    btnCarrinho.innerText =  `🛒 Carrinho (${totalItns})`;
}

function limpaCarrinho(){
    
    if(carrinho.length === 0) return;

        carrinho= [];
        localStorage.removeItem("carrinho");
        
        atualizarCarrinho();
        atualizandoBotaoCarrinho();
    
}

function confirmarLimpeza(){
    carrinho = [];
    localStorage.removeItem("carrinho");

    atualizarCarrinho();
    atualizandoBotaoCarrinho();

    fecharConfirmacao();

    mostrarToast("🗑 Carrinho limpo!")
}