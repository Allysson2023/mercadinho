document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");

    if(token){
        liberarSistema();
    } else {
        bloquearSistema();
    }
});

function liberarSistema(){
    document.getElementById("tela-login").style.display = "none";
    document.getElementById("sistema").style.display = "block";

    carregarProdutos();
}

function bloquearSistema(){
    document.getElementById("tela-login").style.display = "flex";
    document.getElementById("sistema").style.display = "none";
}