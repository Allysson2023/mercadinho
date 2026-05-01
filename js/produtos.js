const lista = document.getElementById("lista-produtos");

let produtoAtual = null;

function carregarProdutos(){
    apiFetch("/produtos")
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById('lista-produtos');
        container.innerHTML = "";

        data.forEach(produto => {
            const div = document.createElement('div');

            div.innerHTML = `
                <img src="${produto.imagem}" width="150"> 
                <h3>${produto.nome}</h3>
                <p>R$ ${produto.preco}</p>

                <button onclick="deletarProduto(${produto.id})">Deletar</button>
                <button onclick='editarProduto(${produto.id}, "${produto.nome}", ${produto.preco})'>Editar</button>
                <button onclick="editarImagem(${produto.id})">Trocar Imagem </button>
            `;

            container.appendChild(div);
        });
    });
}

function deletarProduto(id){
    apiFetch(`/produtos/${id}`, {
        method: "DELETE"
    })
    .then(() => {
        alert("Deletado!");
        carregarProdutos();
    });
}

function editarImagem(id) {
    const input = document.createElement("input");
    input.type = "file";

    input.onchange = () => {
        const arquivo = input.files[0];

        if(!arquivo) return;

        const formData = new FormData();
        formData.append("imagem", arquivo);

        fetch(`http://localhost:3000/produtos/${id}/imagem`, {
            method:"PUT",
            headers: {
            ...getAuthHeaders()
        },
        body: formData
        })
        .then(res => {
            console.log("resposta:", res);
            return res.json();
            })
            .then(data => {
                console.log("dados: ", data);
                
            alert("Imagem atualizada!");
            location.reload();
        })
        .catch(err => console.log("Erro real: ", err));
    };
    input.click();
}

function editarProduto(id, nome, preco){
    const token = localStorage.getItem("token");

    if(!token){
        alert("Você precisa estar logado!");
        return;
    }

    const novoNome = prompt("Novo nome: ", nome);
    const novoPreco = parseFloat(prompt("Novo preço: ", preco));

    if(!novoNome || isNaN(novoPreco)) {
        alert("Dados inválidos!");
        return;
    }

    fetch(`http://localhost:3000/produtos/${id}`, {
        method: "PUT",
        headers: {
            ...getAuthHeaders(),
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nome: novoNome,
            preco: novoPreco
        })
    })
    .then(res => {
        console.log("STATUS PUT:", res.status);

        if(!res.ok){
            throw new Error("Erro na requisição");
        }

        return res.json();
    })
    .then(data => {
        console.log("RESPOSTA:", data);
        alert("Produto atualizado!");
        location.reload();
    })
    .catch(err => {
        console.error("Erro PUT:", err);
        alert("Erro ao atualizar produto!");
    });
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

function smsAdicionado(){
    if(!produtoAtual) return;
    adicionarProduto(produtoAtual);
    fecharModal();
}