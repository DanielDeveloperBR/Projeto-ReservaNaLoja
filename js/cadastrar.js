const botaoRadio = document.getElementsByName('opcao')
const formularioCliente = document.getElementById('formCliente')
const formularioEmpresa = document.getElementById('formEmpresa')
botaoRadio.forEach(botao => {
  botao.addEventListener("click", () => {
      if (botao.id === 'empresa') {
        formularioCliente.style.display = 'none'
        formularioEmpresa.style.display = "flex"
      } if (botao.id === 'cliente') {
        formularioEmpresa.style.display = "none"
        formularioCliente.style.display = 'flex'
      }
  })
})
// const form = document.getElementById('formularioCliente');
let cepValido = false

const cep = document.getElementById('cep');
let labelBairro, labelCidade, labelEndereco, labelEstado, inputBairro, inputCidade, inputEndereco, inputEstado, bairro, estado, cidade, endereco;

// Api do cep
cep.addEventListener('input', () => {
  let containerNovosElementos = document.querySelector('.containerNovosElementos')
  cep.value = cep.value.replace(/-/g, '');
  if (cep.value.length > 8) {
    cep.value = ""
    cep.value = cep.value.substring(0, 8);
  }
  if (cep.value.length < 8) {
    containerNovosElementos.innerHTML = ""
    cepValido = false
    return
  } else {
    const elementosAntigos = form.querySelectorAll('.cep-info');
    elementosAntigos.forEach(elemento => elemento.remove());

    $.ajax({
      url: `https://viacep.com.br/ws/${cep.value}/json/`,
      beforeSend: function () {
        // Desabilitar o campo de CEP durante a requisição
        cep.disabled = true;
      },
      success: function (result) {
        if (result.erro === true) {
          alert("CEP não existe")
          containerNovosElementos.innerHTML = ""
          cep.value = ""
          cepValido = false
          return
        }
        containerNovosElementos.innerHTML = ""
        containerNovosElementos.classList.add('containerNovosElementos')
        labelBairro = document.createElement('label');
        containerNovosElementos.appendChild(labelBairro);
        inputBairro = document.createElement('input');
        containerNovosElementos.appendChild(inputBairro);
        labelCidade = document.createElement('label');
        containerNovosElementos.appendChild(labelCidade);
        inputCidade = document.createElement('input');
        containerNovosElementos.appendChild(inputCidade);
        labelEndereco = document.createElement('label');
        containerNovosElementos.appendChild(labelEndereco);
        inputEndereco = document.createElement('input');
        containerNovosElementos.appendChild(inputEndereco);
        labelEstado = document.createElement('label');
        containerNovosElementos.appendChild(labelEstado);
        inputEstado = document.createElement('input');
        containerNovosElementos.appendChild(inputEstado);

        labelBairro.innerHTML = "Bairro"
        inputBairro.value = result.bairro
        labelCidade.innerHTML = "Cidade"
        inputCidade.value = result.localidade
        labelEndereco.innerHTML = "Endereço"
        inputEndereco.value = result.logradouro
        labelEstado.innerHTML = "Estado"
        inputEstado.value = result.uf

        result.cep = cep.value
        inputBairro.classList.add('cep-info');
        inputCidade.classList.add('cep-info');
        inputEndereco.classList.add('cep-info');
        inputEstado.classList.add('cep-info');
        bairro = result.bairro
        cidade = result.localidade
        endereco = result.logradouro
        estado = result.uf
        cepValido = true
      },
      complete: function () {

        cep.disabled = false;

        if (inputBairro) {
          inputBairro.disabled = true;
        }
        if (inputCidade) {
          inputCidade.disabled = true;
        }
        if (inputEndereco) {
          inputEndereco.disabled = true;
        }
        if (inputEstado) {
          inputEstado.disabled = true;
        }
      },
      error: function () {
        alert("CEP não existe!!!");
        inputBairro.disabled = false
        inputCidade.disabled = false
        inputEndereco.disabled = false
        inputEstado.disabled = false
        containerNovosElementos.innerHTML = ""
        cepValido = false
      }
    })
  }
})
// Formulario de cadastrar usuario cliente
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const nome = form.nome.value;
  const senha = form.senha.value;
  const repetirSenha = form.repetirSenha.value;
  const email = form.email.value;

  if (nome.trim() === "" || senha.trim() === "" || email.trim() === "" || cep.value.trim() === "" || !cepValido) {
    alert("Preencha todos os campos");
    return;
  }

  if (senha.length < 8) {
    alert("A senha precisa ter mais de 8 caracteres");
    return;
  }

  if (senha !== repetirSenha) {
    alert("As senhas não são iguais.");
    return;
  }

  console.log("Formulário enviado:", JSON.stringify({
    "nome": nome, "senha": senha, "email": email, "cep": cep.value, "cidade": cidade, "bairro": bairro, "estado": estado, "endereço": endereco
  }));
  fetch('http://localhost:3000/usuario', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "nome": nome, "senha": senha, "email": email, "cep": cep.value, "bairro": bairro, "cidade": cidade, "endereco": endereco, "estado": estado
    })
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro na solicitação. Status: ' + response.status);
      }
      document.location.href = "./login.html"
      return response.json();
    })
    .catch(err => console.error("Erro:", err))
})