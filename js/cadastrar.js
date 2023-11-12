const botaoRadio = document.getElementsByName('opcao')
const formularios = document.getElementById('formularios')
let cepCliente = document.querySelector('#cepCliente');
let cepEmpresa = document.querySelector('#cepEmpresa');
let cepAtual = cepCliente;

// Evento do radio
botaoRadio.forEach(botao => {
  botao.addEventListener("click", () => {
    if (botao.id === 'empresa') {
      formularios.querySelector('#formCliente').style.display = 'none'
      formularios.querySelector('#formEmpresa').style.display = "flex"
      cepAtual = cepEmpresa
    } if (botao.id === 'cliente') {
      formularios.querySelector('#formEmpresa').style.display = "none"
      formularios.querySelector('#formCliente').style.display = 'flex'
      cepAtual = cepCliente
    }
    eventoCep()
  })
})

// Api do cep
function eventoCep() {
  cepAtual.addEventListener('input', async () => {
    // Remover formatação do CEP e garantir que tem exatamente 8 dígitos
    cepAtual.value = cepAtual.value.replace(/-/g, '');
    if (cepAtual.value.length > 8) {
      resetarCampos();
      return;
    }

    const response = await fetch(`https://viacep.com.br/ws/${cepAtual.value}/json/`);
    const result = await response.json();
    if (response) {
      console.log("foi")
    } else {
      console.log("fetch nao pegou")
      console.log("status " + response.status)
    }
    console.log("O resultado: " + result)

    if (response.ok && !result.erro) {
      if (cepAtual === cepCliente) {
        preencherCampos(result, formularios.querySelector('#formCliente'));
      } else if (cepAtual === cepEmpresa) {
        preencherCampos(result, formularios.querySelector('#formEmpresa'));
      } else {
        resetarCampos();
        if (result.erro) {
          mostrarMensagem('CEP não encontrado');
        } else {
          mostrarMensagem('Erro ao buscar CEP');
        }
      }
    }
  })
}

// Resetar o campo do input do CEP
function resetarCampos() {
  if (cepAtual === cepCliente) {
    const containerNovosElementosCliente = document.querySelector('.containerNovosElementosCliente');
    containerNovosElementosCliente.innerHTML = ""
  } else if (cepAtual === cepEmpresa) {
    const containerNovosElementosEmpresa = document.querySelector('.containerNovosElementosEmpresa');
    containerNovosElementosEmpresa.innerHTML = ""
  }
  cepAtual.value = ""
  cepValido = false;
}

// Preechendo os compos dinamicamente usando as class dos containers dos cep
function preencherCampos(result, formularioAtual) {
  const containerNovosElementosEmpresa = formularioAtual.querySelector('.containerNovosElementosEmpresa');
  const containerNovosElementosCliente = formularioAtual.querySelector('.containerNovosElementosCliente');
  if (cepAtual == cepEmpresa) {
    containerNovosElementosEmpresa.classList.add('containerNovosElementosEmpresa');
  } else if (cepAtual == cepCliente) {
    containerNovosElementosCliente.classList.add('containerNovosElementosCliente');
  }

  criarInput('Bairro', result.bairro);
  criarInput('Cidade', result.localidade);
  criarInput('Endereço', result.logradouro);
  criarInput('Estado', result.uf);

  // Atualizado para usar a variável cepAtual
  result.cepAtual = cepAtual.value;

  cepValido = true;
}


// Criar inputs e labels dinamicamente
function criarInput(labelText, inputValue) {
  if (cepAtual === cepCliente) {
    const containerNovosElementosCliente = document.querySelector('.containerNovosElementosCliente');
    const label = document.createElement('label');
    label.innerHTML = labelText;
    containerNovosElementosCliente.appendChild(label);

    const input = document.createElement('input');
    input.value = inputValue;
    input.classList.add('cep-info');
    input.readOnly = true;
    containerNovosElementosCliente.appendChild(input);
  } else if (cepAtual === cepEmpresa) {
    const containerNovosElementosEmpresa = document.querySelector('.containerNovosElementosEmpresa');
    const label = document.createElement('label');
    label.innerHTML = labelText;
    containerNovosElementosEmpresa.appendChild(label);

    const input = document.createElement('input');
    input.value = inputValue;
    input.classList.add('cep-info');
    input.readOnly = true;
    containerNovosElementosEmpresa.appendChild(input);
  }
  console.log("inputs criados dinamicamte")

}

// Mensagem de erro
function mostrarMensagem(mensagem) {
  // Implemente a lógica para mostrar a mensagem na interface (pode ser um alert, uma div na página, etc.)
  console.log("que mensagem? " + mensagem);
}

// Rodando a api do cep
eventoCep()

// Pegar os dados do formulario => formulario.exemplo
function formularioDados(formulario, nome) {
  return formulario[nome];
}

// Enviar dados do body: JSON.stringify
function enviarDados(nome, dado) {
  const resultado = { [nome]: dado };
  return resultado;
}

// Pega todos os dados do formulario.exemplo e pega todos os dados para enviar no body: JSON.stringify
function todosDados(formulario, campos) {
  const dados = {};

  campos.forEach(nome => {
    const dado = formularioDados(formulario, nome);
    dados[nome] = dado
  });

  return dados;
}
// Enviar para o banco de dados e backend
function realizarEnvioDados(rota, formulario, campos) {
  const dadosParaEnviar = todosDados(formulario, campos);
  console.log(dadosParaEnviar)

  fetch(`http://localhost:3000/${rota}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dadosParaEnviar),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro na solicitação. Status: ' + response.status);
      }
      document.location.href = "./login.html";
      return response.json();
    })
    .catch(err => console.error("Erro:", err));
}

// Cadastrar a empresa
formularios.querySelector('#formEmpresa').addEventListener("submit", (event) => {
  event.preventDefault();
  const formularioEmpresa = formularios.querySelector('#formEmpresa')

  const nome = formularioEmpresa.nome.value;
  const empresa = formularioEmpresa.empresa.value;
  const senha = formularioEmpresa.senha.value;
  const repetirSenha = formularioEmpresa.repetirSenha.value;
  const email = formularioEmpresa.email.value;
  const cep = formularios.querySelector('#cepEmpresa').value;
  const cnpj = formularioEmpresa.cnpj.value;


  if (nome.trim() === "" || senha.trim() === "" || email.trim() === "" || cep.trim() === "" || !cepValido || cnpj === "" || empresa === "") {
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

  const camposParaEnviar = ["nome", "empresa", "senha", "email", "cnpj", "cep", "bairro", "cidade", "endereco", "estado"];
  realizarEnvioDados("empresa", formularioEmpresa, camposParaEnviar);
})

// Cadastrar o cliente
formularios.querySelector('#formCliente').addEventListener("submit", (event) => {
  event.preventDefault();

  const formularioCliente = formularios.querySelector('#formCliente');
  const nome = formularioCliente.nome.value;
  const senha = formularioCliente.senha.value;
  const repetirSenha = formularioCliente.repetirSenha.value;
  const email = formularioCliente.email.value;
  const cep = formularioCliente.cep.value;

  if (nome.trim() === "" || senha.trim() === "" || email.trim() === "" || cep.trim() === "" || !cepValido) {
    alert("Preencha todos os campos");
    console.log("preencha todos os campos")
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

  const camposParaEnviar = ["nome", "senha", "email", "cep", "bairro", "cidade", "endereco", "estado"];
  realizarEnvioDados("usuario", formularioCliente, camposParaEnviar);
})