function getAuthHeaders(){
    const token = localStorage.getItem("token");

    console.log("TOKEN: ", token);
    
    if(!token) {
        alert("Sem token, faça login!");
        return null;
    };

    return {
        Authorization: "Bearer " + token
    };
}

function login() {
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, senha })
    })
    .then(res => res.json())
    .then(data => {
        if(!data.token){
            alert("Erro no login!");
            return;
        }

        localStorage.setItem("token", data.token);
        liberarSistema();
    });
}

function logout(){
    localStorage.removeItem("token");
    location.reload();
}