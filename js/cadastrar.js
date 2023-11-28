const botaoRadio = document.getElementsByName('opcao');
const formularios = document.getElementById('formularios');
let cepCliente = document.querySelector('#cepCliente');
let cepEmpresa = document.querySelector('#cepEmpresa');
let cepAtual = cepCliente;
let cepValido = false;

function validarSenha(senha) {
  const regexSenha = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/;
  return regexSenha.test(senha);
}

// Evento do radio
botaoRadio.forEach(botao => {
  botao.addEventListener("click", () => {
    if (botao.id === 'empresa') {
      formularios.querySelector('#formCliente').style.display = 'none';
      formularios.querySelector('#formEmpresa').style.display = "flex";
      cepAtual = cepEmpresa;
      eventoCep(cepAtual);
    } else if (botao.id === 'cliente') {
      formularios.querySelector('#formEmpresa').style.display = "none";
      formularios.querySelector('#formCliente').style.display = 'flex';
      cepAtual = cepCliente;
      eventoCep(cepAtual);
    }
  });
});

function focar() {
  const botoes = document.querySelectorAll('button')
  botoes.forEach((botao) => {
    botao.focus()
  })
}
// Api do cep
function eventoCep(cepAtual) {
  cepAtual.addEventListener('input', async () => {
    const cep = cepAtual.value.trim();
    cepAtual.value = cepAtual.value.replace(/-/g, '');

    if (cep.length > 8) {
      resetarCampos(cepAtual);
      return;
    }

    if (cep.length !== 8) {
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

      if (cepAtual.id === 'cepCliente') {
        preencherCampos(result, formularios.querySelector('#formCliente'), cepAtual);
      } else if (cepAtual.id === 'cepEmpresa') {
        preencherCampos(result, formularios.querySelector('#formEmpresa'), cepAtual);
      } else if (result.erro) {
        mostrarMensagem('CEP não encontrado');
      }
      focar()
    } catch (error) {
      resetarCampos(cepAtual);
      mostrarMensagem('Erro ao buscar CEP');
    }
  });
}

// resetar os campos
function resetarCampos(cepAtual) {
  if (cepAtual.id === 'cepCliente') {
    const containerNovosElementosCliente = document.querySelector('.containerNovosElementosCliente');
    containerNovosElementosCliente.innerHTML = "";
  } else if (cepAtual.id === 'cepEmpresa') {
    const containerNovosElementosEmpresa = document.querySelector('.containerNovosElementosEmpresa');
    containerNovosElementosEmpresa.innerHTML = "";
  }
  cepAtual.value = "";
  cepValido = false;
}

// preencher os campos dos inputs dinamicos
function preencherCampos(result, formularioAtual, cepAtual) {
  if (cepValido) {
    return;
  }

  const containerNovosElementosEmpresa = formularioAtual.querySelector('.containerNovosElementosEmpresa');
  const containerNovosElementosCliente = formularioAtual.querySelector('.containerNovosElementosCliente');

  if (cepAtual.id === 'cepEmpresa') {
    formularioAtual = containerNovosElementosEmpresa;
  } else if (cepAtual.id === 'cepCliente') {
    formularioAtual = containerNovosElementosCliente;
  }

  criarInput(formularioAtual, 'Bairro', result.bairro, 'bairro');
  criarInput(formularioAtual, 'Cidade', result.localidade, 'cidade');
  criarInput(formularioAtual, 'Endereco', result.logradouro, 'endereco');
  criarInput(formularioAtual, 'Estado', result.uf, 'estado');

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
// PReve a imagem
function previewImage(previewId) {
  let imagemInput = document.getElementById('imagem');
  let previewImg = document.getElementById(previewId);
  let imagemArquivo = imagemInput.files[0];

  if (imagemArquivo) {
    let reader = new FileReader();

    reader.onload = function (e) {
      previewImg.style.display = "block"
      previewImg.src = e.target.result;
    };

    reader.readAsDataURL(imagemArquivo);
  } else {
    previewImg.src = '';
  }
}
// Preve o cliente
function previewImageCliente(previewId) {
  let imagemInput = document.getElementById('imagemCliente');
  let previewImg = document.getElementById(previewId);
  let imagemArquivo = imagemInput.files[0];

  if (imagemArquivo) {
    let reader = new FileReader();

    reader.onload = function (e) {
      previewImg.style.display = "block"
      previewImg.src = e.target.result;
    };

    reader.readAsDataURL(imagemArquivo);
  } else {
    previewImg.src = '';
  }
}


function preveImagem(previewId) {
  console.log('Função previewImagemEmpresa chamada.');
  const imagemEmpresa = document.getElementById('imagemEmpresa');
  const previewImg = document.getElementById(previewId);
  const imagemArquivo = imagemEmpresa.files[0];

  if (imagemArquivo) {
    const reader = new FileReader();

    reader.onload = function (e) {
      previewImg.style.display = "block"
      previewImg.src = e.target.result;
    };

    reader.readAsDataURL(imagemArquivo);
  } else {
    previewImg.src = '';
  }
}
// Cadastrar a empresa
formularios.querySelector('#formEmpresa').addEventListener("submit", async (event) => {
  event.preventDefault();
  const formularioEmpresa = formularios.querySelector('#formEmpresa')
  const nome = formularioEmpresa.nome.value;
  const empresa = formularioEmpresa.empresa.value;
  const senha = formularioEmpresa.senha.value;
  const repetirSenha = formularioEmpresa.repetirSenha.value;
  const email = formularioEmpresa.email.value;
  const cep = formularios.querySelector('#cepEmpresa')
  const cnpj = formularioEmpresa.cnpj.value
  const bairro = formularioEmpresa.bairro
  const cidade = formularioEmpresa.cidade
  const endereco = formularioEmpresa.endereco
  const estado = formularioEmpresa.estado
  const imagemPerfil = formularioEmpresa.imagemPerfil.files[0]
  const imagemEmpresa = formularioEmpresa.imagemEmpresa.files[0]
  const categoria = formularioEmpresa.categoria.value

  if (!imagemPerfil || !imagemEmpresa) {
    alert("Selecione uma imagem para o perfil");
    return;
  }

  if (!cepValido) {
    mostrarMensagem('CEP inválido');
    return;
  }

  if (nome.trim() === "" || senha.trim() === "" || email.trim() === "" || cep.value.trim() === "" || cnpj === "" || empresa.trim() === "" || categoria === '') {
    alert("Preencha todos os campos");
    return;
  }

  if (senha.length < 8 || !validarSenha(senha)) {
    alert("A senha precisa ter mais de 8 caracteres, incluindo pelo menos uma letra maiúscula, uma letra minúscula e um símbolo");
    return;
  }

  if (senha !== repetirSenha) {
    alert("As senhas não são iguais.");
    return;
  }

  const formData = new FormData();
  formData.append('nome', nome);
  formData.append('empresa', empresa);
  formData.append('senha', senha);
  formData.append('email', email);
  formData.append('cep', cep.value);
  formData.append('cnpj', cnpj);
  formData.append('bairro', bairro.value);
  formData.append('cidade', cidade.value);
  formData.append('endereco', endereco.value);
  formData.append('estado', estado.value);
  formData.append('imagemPerfil', imagemPerfil);
  formData.append('imagemEmpresa', imagemEmpresa);
  formData.append('categoria', categoria);

  fetch('http://localhost:3000/empresa', {
    method: 'POST',
    body: formData,
  })
    .then(async response => {
      if (!response.ok) {
        if (response.status === 422) {
          return response.json().then(error => {
            throw new Error(`Erro: ${error.error}`);
          });
        }
        throw new Error(`Erro na solicitação. Status: ${response.status}`);
      }
      document.location.href = "./login.html";
      return response.json();
    })
    .catch(err => {
      console.error("Erro:", err.message);
    });
});



// Cadastrar o cliente
formularios.querySelector('#formCliente').addEventListener("submit", (event) => {
  event.preventDefault();
  const formularioCliente = formularios.querySelector('#formCliente');
  const nome = formularioCliente.nome.value;
  const senha = formularioCliente.senha.value;
  const repetirSenha = formularioCliente.repetirSenha.value;
  const email = formularioCliente.email.value;
  const cep = formularios.querySelector('#cepCliente')
  const bairro = formularioCliente.bairro;
  const cidade = formularioCliente.cidade;
  const endereco = formularioCliente.endereco;
  const estado = formularioCliente.estado
  const imagemPerfil = formularioCliente.imagemPerfil.files[0]

  if (!imagemPerfil) {
    alert("Selecione uma imagem para o perfil");
    return;
  }

  if (nome.trim() === "" || senha.trim() === "" || email.trim() === "" || cep.value.trim() === "" || !cepValido) {
    alert("Preencha todos os campos");
    console.log("preencha todos os campos")
    return;
  }

  if (senha.length < 8 || !validarSenha(senha)) {
    alert("A senha precisa ter mais de 8 caracteres, incluindo pelo menos uma letra maiúscula, uma letra minúscula e um símbolo");
    return;
  }

  if (senha !== repetirSenha) {
    alert("As senhas não são iguais.");
    return;
  }
  const formData = new FormData();
  formData.append('nome', nome);
  formData.append('senha', senha);
  formData.append('email', email);
  formData.append('cep', cep.value);
  formData.append('bairro', bairro.value);
  formData.append('cidade', cidade.value);
  formData.append('endereco', endereco.value);
  formData.append('estado', estado.value);
  formData.append('imagemPerfil', imagemPerfil);
  fetch('http://localhost:3000/usuario', {
    method: 'POST',
    body: formData,
  })
    .then(async response => {
      if (!response.ok) {
        if (response.status === 422) {
          return response.json().then(error => {
            throw new Error(`Erro: ${error.error}`);
          });
        }
        throw new Error(`Erro na solicitação. Status: ${response.status}`);
      }
      document.location.href = "./login.html";
      return response.json();
    })
    .catch(err => {
      console.error("Erro:", err.message);
    });
})

// Função para converter imagem para base64
async function convertImageToBase64(imageFile) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(imageFile);
  })
}
eventoCep(cepAtual)