// 🔓 FUNÇÕES GLOBAIS (FORA DO DOMContentLoaded)

function liberarSistema(){
    document.getElementById("tela-login").style.display = "none";
    document.getElementById("sistema").style.display = "block";

    carregarProdutos();
}

function bloquearSistema(){
    document.getElementById("tela-login").style.display = "flex";
    document.getElementById("sistema").style.display = "none";
}


// 🚀 INÍCIO DO SITE
document.addEventListener("DOMContentLoaded", () => {

    const token = localStorage.getItem("token");

    if(token){
        liberarSistema();
    } else {
        bloquearSistema();
    }

    carregarCarrinho();
    atualizandoBotaoCarrinho();

    //mostrarPromocoes();

    // FORM
    const form = document.getElementById("form-produto");

    if(!form){
        console.log("Form NÃO encontrado ❌");
        return;
    }

    console.log("Form OK ✅");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        console.log("CLICOU 🔥");

        const nome = document.getElementById("nome-produto").value;
        const preco = document.getElementById("preco-produto").value;
        const imagem = document.getElementById("imagem-produto").files[0];

        console.log("DADOS:", nome, preco, imagem);

        const formData = new FormData();
        formData.append("nome", nome);
        formData.append("preco", preco);
        formData.append("imagem", imagem);

        fetch("http://localhost:3000/upload-produto", {
            method: "POST",
            headers: {
                ...getAuthHeaders()
            },
            body:formData
        })
        .then(res => res.json())
        .then(data => {
            alert("Produto cadastrado!");
            form.reset();
            carregarProdutos();
        })
        .catch(err => {
            console.log("ERRO:", err);
            alert("Erro ao cadastrar!");
        });
    });

});