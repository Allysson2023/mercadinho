const API_URL = "http://localhost:3000";

function apiFetch(url, options = {}){
    return fetch(API_URL + url, {
        ...options,
        headers: {
            ...getAuthHeaders(),
            ...(options.headers || {})
        }
    })
    .then(res => {
        if (res.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("isAdmin");

            mostrarToast("Sessão expirada! Faça login novamente.");

            const adminArea = document.querySelector(".admin-actions");
            if(adminArea) {
                adminArea.style.display = "none";
            }

            setTimeout(() => {
                location.reload();
            }, 1500);

            throw new Error("Token expirado");
        }
        return res;
    })
}