const lista = document.getElementById("lista-produtos");

let produtos = []

let produtoEditando = null;

let produtoAtual = null;

function abrirModalEditar(produto) {
    produtoEditando = produto;

    document.getElementById("edit-nome").value = produto.nome;
    document.getElementById("edit-preco").value = produto.preco;

    document.getElementById("modal-editar").classList.remove("oculto");
}

function carregarProdutos(){
    apiFetch("/produtos")
    .then(res => res.json())
    .then(data => {
        produtos = data;
        mostrarProdutos(data);
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

function salvarEdicao(){
    if (!produtoEditando) return;

    const nome = document.getElementById("edit-nome").value;
    const preco = parseFloat(document.getElementById("edit-preco").value);
    const imagemInput = document.getElementById("edit-imagem");

    fetch(`http://localhost:3000/produtos/${produtoEditando.id}`, {
        method: "PUT",
        headers: {
            ...getAuthHeaders(),
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ nome, preco })
    })
    .then(() => {
        if(imagemInput.files.length > 0) {
            const formData = new FormData();
            formData.append("imagem", imagemInput.files[0]);

            return fetch(`http://localhost:3000/produtos/${produtoEditando.id}/imagem`, {
                method: "PUT",
                headers: {
                    ...getAuthHeaders()
                },
                body: formData
            });
        }
    })
    .then(() => {
        alert("Produto atualizado!");
        fecharModalEditar();
        carregarProdutos();
    })
    .catch(() => {
        alert("Erro ao atualizar!");
    });
}

function mostrarProdutos(listaProdutos){

    const isAdmin = localStorage.getItem("isAdmin");

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

    const botoes = document.createElement("div");
    botoes.classList.add("botoes-card");

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
    botoes.appendChild(botao);

    if (isAdmin === "true"){
        const btnEditar = document.createElement("button");
        btnEditar.innerText = "Editar";
        
        btnEditar.addEventListener("click", (e) => {
            e.stopPropagation();
            abrirModalEditar(produto);
        });

        botoes.appendChild(btnEditar)
    }
    card.appendChild(botoes);
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

function confirmarDelecao(){
    if (!produtoEditando) return;

    const confirmou = confirm("Tem certeza que deseja deletar este produto?");

    if(confirmou){
        deletarProduto(produtoEditando.id);
        fecharModalEditar();
    }
}

function smsAdicionado(){
    if(!produtoAtual) return;
    adicionarProduto(produtoAtual);
    fecharModal();
}