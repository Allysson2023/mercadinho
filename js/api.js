const API_URL = "http://localhost:3000";

function apiFetch(url, options = {}){
    return fetch(API_URL + url, {
        ...options,
        headers: {
            ...getAuthHeaders(),
            ...(options.headers || {})
        }
    });
}