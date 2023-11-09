const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const login = form.login.value;
    const senha = form.senha.value;

    fetch('http://localhost:3000/usuario/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "nome": login, "senha": senha })
    })
        .then(response => {
            if (response.status === 200) {
                window.location.href = "logado.html";
            } else {
                return response.text();
            }
        })
        .then(data => {
            if (data) {
                console.error("Erro ao fazer login:", data);
            }
        })
        .catch(error => {
            console.error('Erro ao fazer login:', error);
        });
});
