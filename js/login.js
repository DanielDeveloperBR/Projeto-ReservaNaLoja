const form = document.querySelector("form");
let tipoAtual = 'cliente';

const botaoRadio = document.getElementsByName("opcao");
let imagem = document.querySelector('.imgLogin')

botaoRadio.forEach(botao => {
    botao.addEventListener("click", () => {
        if (botao.id === 'cliente') {
            imagem.style.backgroundImage = "url(../img/bgCalendario.png)"
        } else if (botao.id === 'empresa') {
            imagem.style.backgroundImage = 'url(../img/graficoAgenda.png)'
        }
        tipoAtual = botao.id;
    })
})

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
            window.location.href = 'http://localhost:3000/dashboard';
        } else {
            alert("Login ou senha incorretos!")
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error);
    }
})