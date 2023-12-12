// Para o modal funcionar tem que colocar uma div ou outra tag com o id de modal
function criarModal(pergunta, btnConfirmar, btnCancelar, labelsArray, inputsArray) {
    const containerModal = document.createElement("div");
    const modal = document.createElement("div");
    const modalEditar = document.createElement("div");
    const perguntaH1 = document.createElement("h3");
    perguntaH1.textContent = pergunta;

    const containerBotao = document.createElement("div");
    containerBotao.classList.add("containerBotao");
    containerModal.appendChild(perguntaH1);

    // Adaptei aqui para criar um label e um input por vez
    if (labelsArray !== null || inputsArray !== null) {
        for (let i = 0; i < labelsArray.length; i++) {
            containerModal.appendChild(labelsArray[i]);
            containerModal.appendChild(inputsArray[i]);
        }
    } 
        containerBotao.appendChild(btnConfirmar);
        containerBotao.appendChild(btnCancelar);
        containerModal.append(containerBotao);
        modal.classList.add("modal");
        containerModal.classList.add("containerModal");
        modalEditar.classList.add("modalEditar");
        if (document.querySelector('main')) {
            document.querySelector("main").appendChild(modal);

        } else {
            document.querySelector('body').appendChild(modal)
        }
        containerModal.appendChild(modalEditar);
        modal.appendChild(containerModal);
    }

function criarLabel(texto, nome) {
    const label = document.createElement('label');
    label.textContent = texto;
    label.htmlFor = nome;
    return label;
}

function criarInput(tipo, nome) {
    const input = document.createElement('input');
    input.type = tipo;
    input.name = nome;
    input.id = nome;
    return input;
}

function criarButton(texto, tipo, funcao) {
    const button = document.createElement('button');
    button.textContent = texto;
    button.addEventListener(tipo, funcao);
    return button;
}
