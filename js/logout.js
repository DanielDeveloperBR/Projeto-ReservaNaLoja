const botao = document.getElementById("logout")
botao.addEventListener("click", (e) => {
    e.preventDefault()
    fetch('https://backend-express-mu.vercel.app/logout', {
        method: 'GET'
    })
        .then((response) => response.text())
        .then((data) => {
            window.location.href = "../index.html";
        })
        .catch((error) => {
            console.error("Erro ao fazer logout: " + error);
        });
})