const botaoRadio = document.getElementsByName('opcao');
const formularios = document.getElementById('formularios');
let cepCliente = document.querySelector('#cepCliente');
let cepEmpresa = document.querySelector('#cepEmpresa');
let cepAtual = cepCliente;
let cepValido = false;

// Evento do radio
botaoRadio.forEach(botao => {
  botao.addEventListener("click", () => {
    if (botao.id === 'empresa') {
      formularios.querySelector('#formCliente').style.display = 'none';
      formularios.querySelector('#formEmpresa').style.display = "flex";
      cepAtual = cepEmpresa;
    } else if (botao.id === 'cliente') {
      formularios.querySelector('#formEmpresa').style.display = "none";
      formularios.querySelector('#formCliente').style.display = 'flex';
      cepAtual = cepCliente;
    }
    eventoCep();
  });
});

// Api do cep
function eventoCep() {
  cepAtual.addEventListener('input', async () => {
    const cep = cepAtual.value.trim();
    cepAtual.value = cepAtual.value.replace(/-/g, '');
    if (cep.length !== 8) {
      return;
    }
    if (cep.length > 8) {
      resetarCampos();
      return;
    }
    try {
      const response = await fetch(`http://localhost:3000/cep/${cep}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Erro na solicitação. Status: ' + response.status);
      }
      const result = await response.json();
      if (cepAtual.value == cepCliente.value) {
        preencherCampos(result, formularios.querySelector('#formCliente'));
      } else if (cepAtual.value == cepEmpresa.value) {
        preencherCampos(result, formularios.querySelector('#formEmpresa'));
      } else if (result.erro) {
        mostrarMensagem('CEP não encontrado');
      }
    } catch (error) {
        resetarCampos();
        mostrarMensagem('Erro ao buscar CEP');
    }
  });
}
// resetar os campos
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
// preencher os campos dos inputs dinamicos
function preencherCampos(result, formularioAtual) {
  const containerNovosElementosEmpresa = formularioAtual.querySelector('.containerNovosElementosEmpresa');
  const containerNovosElementosCliente = formularioAtual.querySelector('.containerNovosElementosCliente');

  if (cepAtual.value === cepEmpresa.value) {
    formularioAtual = containerNovosElementosEmpresa
  } else if (cepAtual.value == cepCliente.value) {
    formularioAtual = containerNovosElementosCliente
  }

  criarInput(formularioAtual, 'Bairro', result.bairro, 'bairro');
  criarInput(formularioAtual, 'Cidade', result.localidade, 'cidade');
  criarInput(formularioAtual, 'Endereco', result.logradouro, 'endereco');
  criarInput(formularioAtual, 'Estado', result.uf, 'estado')

  result.cepAtual = cepAtual.value;

  cepValido = true;
}
// Criar input dinamico
function criarInput(formulario, labelText, inputValue, nomeInput) {
  const label = document.createElement('label');

  label.innerHTML = labelText;
  label.for = nomeInput
  formulario.appendChild(label);

  const input = document.createElement('input');
  input.name = nomeInput
  input.value = inputValue;
  input.classList.add('cep-info');
  input.readOnly = true;
  formulario.appendChild(input);
}
// Mostrar mensagem de erro
function mostrarMensagem(mensagem) {
  alert(mensagem)
}
eventoCep()
// Cadastrar a empresa
formularios.querySelector('#formEmpresa').addEventListener("submit", (event) => {
  event.preventDefault();
  const formularioEmpresa = formularios.querySelector('#formEmpresa')
  const nome = formularioEmpresa.nome.value;
  const empresa = formularioEmpresa.empresa.value;
  const senha = formularioEmpresa.senha.value;
  const repetirSenha = formularioEmpresa.repetirSenha.value;
  const email = formularioEmpresa.email.value;
  const cep = formularios.querySelector('#cepEmpresa')
  const cnpj = formularioEmpresa.cnpj.value;
  const bairro = formularioEmpresa.bairro.value;
  const cidade = formularioEmpresa.cidade.value;
  const endereco = formularioEmpresa.endereco.value;
  const estado = formularioEmpresa.estado.value;


  if (!cepValido) {
    mostrarMensagem('CEP inválido');
    return;
  }
  if (nome.trim() === "" || senha.trim() === "" || email.trim() === "" || cep.value.trim() === "" || cnpj === "" || empresa === "" || cep.value.trim()) {
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

  fetch('http://localhost:3000/empresa', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "nome": nome, "empresa": empresa, "senha": senha, "email": email, "cnpj": cnpj, "cep": cep.value, "bairro": bairro, "cidade": cidade, "endereco": endereco, "estado": estado
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

// Cadastrar o cliente
formularios.querySelector('#formCliente').addEventListener("submit", (event) => {
  event.preventDefault();
  const formularioCliente = formularios.querySelector('#formCliente');
  const nome = formularioCliente.nome.value;
  const senha = formularioCliente.senha.value;
  const repetirSenha = formularioCliente.repetirSenha.value;
  const email = formularioCliente.email.value;
  const cep = formularios.querySelector('#cepCliente')
  const bairro = formularioCliente.bairro.value;
  const cidade = formularioCliente.cidade.value;
  const endereco = formularioCliente.endereco.value;
  const estado = formularioCliente.estado.value;

  if (nome.trim() === "" || senha.trim() === "" || email.trim() === "" || cep.value.trim() === "" || !cepValido) {
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