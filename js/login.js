document.addEventListener('DOMContentLoaded', function() {
  const token = localStorage.getItem('token');
  if (token) {
      window.location.href = "logado.html"
  }
  const form = document.querySelector("form");
  form.addEventListener("submit", (e) => {
      e.preventDefault();
      const login = form.login.value;
      const senha = form.senha.value;

      fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ "nome": login, "senha": senha })
      })
      .then(response => response.json())
      .then(data => {
          if (data.token) {
              localStorage.setItem('token', data.token);
              window.location.href = "logado.html";
          } else {
              console.error('Erro ao fazer login:', data.message);
          }
      })
      .catch(error => console.error('Erro:', error));
  });
})