function showMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.classList.add('message');
    document.body.appendChild(messageElement);
    messageElement.classList.add('show');
    setTimeout(() => {
        messageElement.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(messageElement);
        }, 300);
    }, 3000);
}

// Agendamento
const openModalButton = document.getElementById('openModalButton');
const calendarModal = document.getElementById('calendarModal');
const closeModalButton = document.getElementById('closeModal');
const confirmButton = document.getElementById('confirmButton');
const cancelButton = document.getElementById('cancelButton');
const calendarBody = document.getElementById('calendarBody');
const monthSelector = document.getElementById('monthSelector');

// Abrir o modal
openModalButton.addEventListener('click', openCalendarModal);
function openCalendarModal() {
    calendarModal.style.display = 'block';
}
// Fechar o modal
closeModalButton.addEventListener('click', closeCalendarModal);
function closeCalendarModal() {
    calendarModal.style.display = 'none';
}
// Confirmar o botão
confirmButton.addEventListener('click', confirmDate)
// Função para confirmar se é a data que escolheu
function confirmDate() {
    if (!dia || !mes) {
        showMessage("Escolha uma data válida antes de confirmar.");
        return;
    }
    showMessage(`Data selecionada: ${dia}/${mes}`)
    closeCalendarModal();
}
// Evento de cancelar
cancelButton.addEventListener('click', closeCalendarModal);

updateSelectors();
updateCalendar();

// Função para selecionar os mêses começando com o mês atual
function updateSelectors() {
    // Preencher o seletor de mês
    const months = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    const currentMonth = new Date().getMonth() + 1

    for (let i = 1; i <= 12; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = months[i - 1];

        if (i === currentMonth) {
            // Seleciona o mês atual por padrão
            option.selected = true
        }

        monthSelector.appendChild(option);
    }

    // Habilitar o seletor após ser preenchido
    monthSelector.removeAttribute('disabled');
}

// Função para atualizar o calendario
function updateCalendar() {
    const selectedMonth = monthSelector.value;
    const currentYear = new Date().getFullYear();
    const daysInMonth = new Date(currentYear, selectedMonth, 0).getDate();

    renderCalendar(currentYear, selectedMonth, daysInMonth);
}

// Função de renderização da data
function renderCalendar(year, month, daysInMonth) {
    calendarBody.innerHTML = '';

    const firstDay = new Date(year, month - 1, 1).getDay();

    let dayCounter = 1;

    for (let i = 0; i < 6; i++) {
        const row = document.createElement('tr');

        for (let j = 0; j < 7; j++) {
            const cell = document.createElement('td');

            if ((i === 0 && j < firstDay) || dayCounter > daysInMonth) {
                // Empty cells before the first day and after the last day
                cell.textContent = '';
            } else {
                cell.textContent = dayCounter;
                cell.addEventListener('click', handleCellClick);
                dayCounter++;
            }
            row.appendChild(cell);
        }
        calendarBody.appendChild(row);
    }
}

// Função para selecionar a célula que está os dias
let selectedCell = null
function handleCellClick(event) {
    const cell = event.target;
    if (cell.tagName === 'TD' && cell.textContent.trim() !== '') {
        const selectedDay = cell.textContent;
        const selectedMonth = monthSelector.value;
        const selectedYear = new Date().getFullYear();
        if (selectedCell) {
            selectedCell.style.backgroundColor = '';
        }
        mes = selectedMonth
        dia = selectedDay
        cell.style.backgroundColor = 'var(--telaFundo)'
        selectedCell = cell;
    }
}

// Hora aqui
// id para escolher a hora do agendamento
const openPickerButton = document.getElementById('openPicker');
// Pega o id do modal
const timePickerModal = document.getElementById('timePickerModal');
// Selecionando o id do botão para fechar o modal
const closePickerButton = document.getElementById('closePicker');
// Botão dentro do modal para confirmar a hora
const confirmTimeButton = document.getElementById('confirmTime');
// Aqui pega os ids das horas
const hourSelector = document.getElementById('hourSelector');

// Evento para abrir o modal e vai aparecer as horas
openPickerButton.addEventListener('click', function () {
    buildHourSelector();
    timePickerModal.style.display = 'block';
});

// Evento para fechar o modal
closePickerButton.addEventListener('click', function () {
    timePickerModal.style.display = 'none';
});

// Evento para confirmar se é essa hora que ele selecionou
confirmTimeButton.addEventListener('click', function () {
    const selectedHour = getSelectedHour();
    showMessage(`Hora selecionada: ${selectedHour}h`);
    if (selectedHour == null) {
        showMessage("escolha uma hora exata!")
        return
    }
    timePickerModal.style.display = 'none';
})

// Fechar o modal se clicar fora da área do modal
window.addEventListener('click', function (event) {
    if (event.target === timePickerModal) {
        timePickerModal.style.display = 'none';
    }
});

// Função para criar os botões das horas
function buildHourSelector() {
    hourSelector.innerHTML = '';
    for (let i = 6; i <= 18; i++) {
        for (let j = 0; j < 60; j += 30) {
            const button = document.createElement('button');
            button.textContent = `${i.toString().padStart(2, '0')}:${j.toString().padStart(2, '0')}`;
            button.addEventListener('click', function () {
                selectHour(button.textContent);
            });
            hourSelector.appendChild(button);
        }
    }
}
// Evento para selecionar a hora
function selectHour(selectedHour) {
    const buttons = hourSelector.getElementsByTagName('button');
    for (const button of buttons) {
        button.style.backgroundColor = 'var(--botao)';
    }
    const selectedButton = Array.from(buttons).find(button => button.textContent === selectedHour);
    selectedButton.style.backgroundColor = 'var(--telaFundo)';
}

// Evento para pegar a hora
function getSelectedHour() {
    const selectedButton = hourSelector.querySelector('button[style="background-color: var(--telaFundo);"]');
    return selectedButton ? selectedButton.textContent : null;
}
