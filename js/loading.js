
let modal = document.querySelector('#modal')
// Função para mostrar o indicador de carregamento
function mostrarLoanding() {
   const loadingSpinner = document.getElementById('loading-spinner');
   modal.classList.add("modal")
   loadingSpinner.style.display = 'block';
}

// Função para esconder o indicador de carregamento
function esconderLoading() {
   const loadingSpinner = document.getElementById('loading-spinner');
   modal.classList.remove("modal")
   loadingSpinner.style.display = 'none';
   document.addEventListener('DOMContentLoaded', () => {
   })
}