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

function fecharModal(){
    document.getElementById("modal").classList.add("oculto");
}

function abrirModalTroco(){
    document.getElementById("modal-troco").classList.remove("oculto");
}

function fecharModalTroco(){
    document.getElementById("modal-troco").classList.add("oculto");
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
const somAdd = new Audio("mixkit-select-click-1109.wav");
somAdd.volume = 0.3;


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

function abrirConfirmacao(){
    document.getElementById("modal-confirmar").classList.remove("oculto");
}

function fecharConfirmacao(){
    document.getElementById("modal-confirmar").classList.add("oculto");
}
