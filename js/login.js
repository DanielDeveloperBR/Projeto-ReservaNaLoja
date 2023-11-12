const verificarLoginAntesDeRedirecionar = async () => {
    try {
        const verificarResponse = await fetch('http://localhost:3000/verificar-login');
        const verificarData = await verificarResponse.json();

        if (verificarData.loggedUser) {
            console.log("Usuário já está logado. Redirecionando para o dashboard.");
            window.location.href = '/dashboardCliente.html';
        } else {
            console.log("Usuário não está logado. Prossiga com a autenticação.");
            // Continuar com a lógica de autenticação
        }
    } catch (error) {
        console.error('Erro ao verificar o login:', error);
    }
};

verificarLoginAntesDeRedirecionar();

const form = document.querySelector("form");
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const login = form.login.value;
    const senha = form.senha.value;

    try {
        const response = await fetch('http://localhost:3000/usuario/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "email": login, "senha": senha })
        });

        if (response.ok) {
            const data = await response.json();

            console.log("Login realizado com sucesso:", data);

            if (data.redirect) {
                window.location.href = data.redirect;
            } else {
                alert("Login ou senha incorretos!");
                console.error("Resposta do servidor não contém URL de redirecionamento.");
            }

        } else {
            const data = await response.text();
            console.error("Erro ao fazer login:", data);
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error);
    }
});
