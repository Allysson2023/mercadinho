// 🔓 FUNÇÕES GLOBAIS (FORA DO DOMContentLoaded)

function liberarSistema(){
    document.getElementById("sistema").style.display = "block";

    carregarProdutos();
}

function bloquearSistema(){
    document.getElementById("tela-login").style.display = "flex";
    document.getElementById("sistema").style.display = "none";
}

function abrirLoginAdmin(){
    document.getElementById("modal-admin-login").classList.remove("oculto");
}

function fecharLoginAdmin(){
    document.getElementById("modal-admin-login").classList.add("oculto");
}

function fazerLoginAdmin(){
    const email = document.getElementById("admin-email").value;
    const senha = document.getElementById("admin-senha").value;

    fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, senha })
    })
    .then(res => res.json())
    .then(data => {
        if (data.token){
            localStorage.setItem("token", data.token);
            localStorage.setItem("isAdmin", "true");
            
            alert("Bem-vindo admin!");

            location.reload();
        } else {
            alert("Login inválido");
        }
    });
}

function logoutAdmin(){
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");

    alert("Voce saiu do modo admin!");

    location.reload();
}

// 🚀 INÍCIO DO SITE
document.addEventListener("DOMContentLoaded", () => {

    const token = localStorage.getItem("token");

    liberarSistema();
    
    const isAdmin =localStorage.getItem("isAdmin");

    const adminActions = document.querySelector(".admin-actions");
    if (adminActions){
        if(isAdmin === "true"){
            adminActions.style.display = "block";
        } else {
            adminActions.style.display = "none";
        }
    }

    const btnLogout = document.getElementById("btn-logout");

    if(btnLogout){
        if(isAdmin === "true"){
            btnLogout.style.display = "flex";
        } else {
            btnLogout.style.display = "none";
        }
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