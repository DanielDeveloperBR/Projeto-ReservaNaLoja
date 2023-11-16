const botao = document.getElementById("logout")
botao.addEventListener("click", (e) => {
    e.preventDefault()
    fetch('http://localhost:3000/logout', {
        method: 'GET'
    })
        .then((response) => response.text())
        .then((data) => {
            console.log("Logout realizado com sucesso: " + data);
            window.location.href = "../index.html";
        })
        .catch((error) => {
            console.error("Erro ao fazer logout: " + error);
        });
})