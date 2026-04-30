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