let carrinho = []

const lista = document.getElementById("lista-produtos");
let produtoAtual = null;

const somAdd = new Audio("mixkit-select-click-1109.wav");
somAdd.volume = 0.3;

document.addEventListener("DOMContentLoaded", () => {


    
    fetch('http://localhost:3000/produtos')
    .then(res => res.json())
    .then(data => {
    const container = document.getElementById('lista-produtos')
    
    data.forEach(produto => {
        console.log(produto);
        
        const div = document.createElement('div')

        div.innerHTML = `
            <img src="${produto.imagem}" width="150" > 
            <h3>${produto.nome}</h3>
            <p> Preço: R$ ${produto.preco} </p>

            <button onclick="deletarProduto(${produto.id})">
                Deletar
            </button>

            <button onclick="editarProduto(${produto.id}, '${produto.nome}', ${produto.preco}) ">
                Editar
            </button>

            <br><br>
            `
            container.appendChild(div)
    })
    .catch(err => console.log("Erro API:", err))
})

})


document.addEventListener("click", () => {
    somAdd.play().then(() => {
        somAdd.pause();
        somAdd.currentTime = 0;
    }).catch(() => {});
}, { once: true});


const btnCarrinho = document.getElementById("btn-carrinho");
btnCarrinho.addEventListener("click", () => {
    document.getElementById("modal-carrinho").classList.remove("oculto");
})

function fecharCarrinho() {
    document.getElementById("modal-carrinho").classList.add("oculto");
}

const selectPagamento = document.getElementById("pagamento");
const campoTroco = document.getElementById("campo-troco");


selectPagamento.addEventListener("change", () => {
    if(selectPagamento.value === "Dinheiro"){
        //campoTroco.style.display = "block";
        abrirModalTroco();
    } else {
        campoTroco.style.display = "none";
        document.getElementById("troco").value = "";
    }
})

function abrirModalTroco(){
    document.getElementById("modal-troco").classList.remove("oculto");
}

function fecharModalTroco(){
    document.getElementById("modal-troco").classList.add("oculto");
}

function naoPrecisaTroco(){
    const campoTroco = document.getElementById("campo-troco");

    campoTroco.style.display = "none";
    document.getElementById("troco").value = "";

    fecharModalTroco();
}

function precisaTroco(){
    const campoTroco = document.getElementById("campo-troco");
    campoTroco.style.display = "block";

    fecharModalTroco();
}

function atualizandoBotaoCarrinho(){
    const btnCarrinho = document.getElementById("btn-carrinho");
    
    let totalItns = 0;

    carrinho.forEach(item => {
        totalItns +=item.quantidade;
    })

    btnCarrinho.innerText =  `🛒 Carrinho (${totalItns})`;
}

function mostrarProdutos(listaProdutos){
    lista.innerHTML = "";
    listaProdutos.forEach((produto,index) => {

        const card = document.createElement("div");
        card.classList.add("card");

        card.style.animationDelay = `${index * 0.05}s`;
        
        const img = document.createElement("img");
        img.src = produto.imagem;
        
        img.addEventListener("click", () => {
            card.classList.add("preco-destaque");

            setTimeout(() => {
                abrirModal(produto.id);
            }, 300);

            setTimeout(() => {
                card.classList.remove("preco-destaque");
            }, 600);
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
}

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

function abrirModal(id){
    const produto = produtos.find(p=> p.id === id);
    if(!produto) return;

    produtoAtual = produto;

    document.getElementById("nome").innerText = produto.nome;
    document.getElementById("descricao").innerText = produto.descricao;
    document.getElementById("preco").innerText = "R$ " + produto.preco;

    const imgPrincipal = document.getElementById("img-principal");
    imgPrincipal.src = produto.imagem;

    

    document.getElementById("modal").classList.remove("oculto");
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

function abrirConfirmacao(){
    document.getElementById("modal-confirmar").classList.remove("oculto");
}

function fecharConfirmacao(){
    document.getElementById("modal-confirmar").classList.add("oculto");
}

function confirmarLimpeza(){
    carrinho = [];
    localStorage.removeItem("carrinho");

    atualizarCarrinho();
    atualizandoBotaoCarrinho();

    fecharConfirmacao();

    mostrarToast("🗑 Carrinho limpo!")
}

function limpaCarrinho(){
    
    if(carrinho.length === 0) return;

        carrinho= [];
        localStorage.removeItem("carrinho");
        
        atualizarCarrinho();
        atualizandoBotaoCarrinho();
    
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
function smsAdicionado(){
    if(!produtoAtual) return;
    adicionarProduto(produtoAtual);
    fecharModal();
}

function fecharModal(){
    document.getElementById("modal").classList.add("oculto");
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
    const valorTroco = Number(troco);
    const agora = new Date();
    const data = agora.toLocaleDateString("pt-BR");
    const hora = agora.toLocaleTimeString("pt-BR", {
        hour: '2-digit',
        minute: '2-digit'
    });

    // ✅ VALIDAÇÃO PRIMEIRO
    if(!nome || !endereco || !telefone){
        mostrarToast("⚠ Preencha todos os dados!");
        return;
    }

    let total = 0;
    carrinho.forEach(item => {
        total += item.preco * item.quantidade;
    });

    if(pagamento === "Dinheiro"){
        if(!troco){
            mostrarToast("⚠ Informe o valor para troco!");
            return;
        }

        if(valorTroco < total){
            mostrarToast("❌ Valor do troco menor que o total!");
            return;
        }
    }

    // 🟢 MENSAGEM BONITA
    let mensagem = "🛒 *NOVO PEDIDO*\n";
    mensagem += "━━━━━━━━━━━━━━━\n\n";

    mensagem += `👤 *Cliente:* ${nome}\n`;
    mensagem += `📞 *Telefone:* ${telefone}\n\n`;
    mensagem += `🕒 *Data:* ${data} às ${hora}\n\n`;

    mensagem += "🧾 *Itens do Pedido:*\n";

    carrinho.forEach(item => {
        mensagem += `• ${item.quantidade}x ${item.nome}\n`;
    });

    mensagem += "\n━━━━━━━━━━━━━━━\n";

    mensagem += `📍 *Endereço:*\n${endereco}, Nº ${numero}\n\n`;

    mensagem += `💳 *Pagamento:* ${pagamento}\n`;

    if(pagamento === "Dinheiro" && troco){
        mensagem += `💰 *Troco para:* R$ ${troco}\n`;
    }

    mensagem += "\n━━━━━━━━━━━━━━━\n";
    mensagem += "🙏 Obrigado pelo pedido!";

    const numeroWhats = "5585921996610";

    const link = `https://wa.me/${numeroWhats}?text=${encodeURIComponent(mensagem)}`;

    window.open(link, "_blank");
    limpaCarrinho();
    fecharModalCliente();
    mostrarToast("✔ Pedido Enviado com sucesso!");
}

function mostrarToast(mensagem){
    const toast = document.getElementById("toast");

    toast.innerText = mensagem;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000)
}

function filtrarCategoria(categoria, botaoClicado){
    const botoes = document.querySelectorAll(".categoria-btn");

    botoes.forEach(btn => btn.classList.remove("ativo"));

    botaoClicado.classList.add("ativo");

    if(categoria === "Todos") {
        mostrarProdutos(produtos);
        return;
    }

    const filtrados = produtos.filter(
        p => p.categoria === categoria
    );

    mostrarProdutos(filtrados);

}

function mostrarPromocoes(){
    const container = document.getElementById("lista-promocoes");

    container.innerHTML = "";

    promocoes.forEach(promo => {
        const card = document.createElement("div");
        card.classList.add("promo-card");

        const img = document.createElement("img");
        img.src = promo.imagem;

        const texto = document.createElement("div");
        texto.classList.add("promo-texto");
        texto.innerText = "🔥 Promoções do dia";

        card.appendChild(img);
        card.appendChild(texto);

        container.appendChild(card);
    })
}

const form = document.getElementById("form-produto");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const preco = document.getElementById("preco").value;
    const imagem = document.getElementById("imagem").files[0];

    const formData = new FormData();

    formData.append("nome", nome);
    formData.append("preco", preco);
    formData.append("imagem", imagem);

    fetch("http://localhost:3000/upload-produto", {
        method: "POST",
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        alert("Produto cadastrado com sucesso!");
        form.reset();
    })
    .catch(err => console.log("Erro", err));

});

function deletarProduto(id){
    const confirmar = confirm("Tem certeza que desejar deletar?");

    if (!confirmar) return;

    fetch(`http://localhost:3000/produtos/${id}`, {
        method: "DELETE"
    })
    .then(res => res.json())
    .then(data => {
        alert("Produto deletado com sucesso!");
        location.reload();
    })
    .catch(err => console.log("Erro:", err));
}

function editarProduto(id, nome, preco){
    const novoNome = prompt("Novo nome: ", nome);
    const novoPreco = prompt("Novo preço: ", preco);

    if(!novoNome || !novoPreco) return;

    fetch(`http://localhost:3000/produtos/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nome: novoNome,
            preco: novoPreco
        })
    })
    .then(res => res.json())
    .then(() => {
        alert("Produto atualizado!");
        location.reload();
    })
    .catch(err => console.log(err));
}

carregarCarrinho();
atualizandoBotaoCarrinho();
//mostrarProdutos(produtos);
mostrarPromocoes();