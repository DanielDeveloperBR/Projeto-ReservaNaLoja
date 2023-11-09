const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const login = form.login.value;
    const senha = form.senha.value;

    fetch('http://localhost:3000/usuario/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "nome": login, "senha": senha })
    })
        .then(response => {
            console.log('Cabeçalhos da resposta do servidor:', response.headers);
            if (response.ok) {
                document.location.href = "logado.html"
                return response.json(); // Retorne a resposta JSON para a próxima promessa
            } else {
                throw new Error('Falha na resposta do servidor');
            }
        })
        .then(data => {
            console.log('Cookies recebidos do servidor:', document.cookie);
            console.log('Resposta do servidor:', data);
        })
        .catch(error => {
            console.error('Erro ao fazer login:', error);
        });
});
