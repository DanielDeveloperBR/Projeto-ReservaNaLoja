const form = document.querySelector("form");
let tipoAtual = 'cliente';

const botaoRadio = document.getElementsByName("opcao");

botaoRadio.forEach(botao => {
    botao.addEventListener("click", () => {
        if (botao) {
            tipoAtual = botao.id;
        }
    });
});

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const tipo = tipoAtual;
    const login = form.login.value;
    const senha = form.senha.value;
try {
    const response = await fetch('http://localhost:3000/usuario/login', {
        method: 'POST',
        headers: {
            'Accept': 'text/html',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "email": login, "senha": senha, "tipo": tipo })
    });

    if (response.ok) {
        const data = await response.text();
        console.log("Login realizado com sucesso:", data);
        
        // Redireciona para a rota do dashboard
        window.location.href = 'http://localhost:3000/dashboard';
    } else {
        const data = await response.json();
        console.error("Erro ao fazer login:", data);
    }
} catch (error) {
    console.error('Erro ao fazer login:', error);
}
})