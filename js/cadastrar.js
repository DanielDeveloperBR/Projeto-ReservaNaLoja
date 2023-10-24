const btnVoltar = document.getElementById("voltar")
const form = document.querySelector('form')
btnVoltar.addEventListener("click", ()=>{
    window.location.href = "index.html"
})
form.addEventListener("submit", (event) => {
  const nome = form.nome.value
  const senha = form.senha.value
  const email = form.email.value
  const cep = form.cep.value
  const cidade = form.cidade.value
  const bairro = form.bairro.value
  const estado = form.estado.value
  const endereco = form.endereco.value
  event.preventDefault()
  if (nome == "" || senha == "") {
    console.log("preencha")
    return
  } else {
    console.log("Formulário enviado:", JSON.stringify({
      "nome": nome, "senha": senha, "email": email, "cep": cep, "cidade": cidade, "bairro": bairro, "estado": estado, "endereco": endereco
    }))
    fetch('http://localhost:3000/usuario', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "nome": nome, "senha": senha, "email": email, "cep": cep, "cidade": cidade, "bairro": bairro, "estado": estado, "endereco": endereco
      })
    })
      .then(response => response.json())
      .then((data) => {
        console.log("Dados recebidos:", JSON.stringify({data}))
        form.submit()
      })
      .catch(err => console.error("Erro:", err))
  }
})
