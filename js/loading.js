// Adicione isso ao seu script JS existente
document.addEventListener('DOMContentLoaded', () => {
    const loadingSpinner = document.getElementById('loading-spinner');
 
    // Mostra a bolinha giratória
    loadingSpinner.style.display = 'block';
 
    window.addEventListener('load', () => {
       // Esconde a bolinha giratória quando a página está totalmente carregada
       loadingSpinner.style.display = 'none';
    });
 });
 