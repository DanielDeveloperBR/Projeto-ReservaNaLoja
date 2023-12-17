const excluirConta = document.getElementById('excluirConta')
function excluirContaUsuario(id, rota){
    fetch(`/${rota}/${id}`, {
        method: 'DELETE',
        headers: {
           'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: user.id })
     })
        .then(response => response.json())
        .then(data => {
           window.location.href = '/login.html'
        })
        .catch(error => console.error(error))
}
excluirConta.addEventListener('click', () => {
    if (user.id_usuario){
        excluirContaUsuario(user.id_usuario, 'usuario')
    }else if (user.id_empresa){
        excluirContaUsuario(user.id_empresa, 'empresa')
    }
})

const menu = document.querySelector('menu');
document.querySelector('#perfil').addEventListener('click', () => {
   if (menu.style.display === 'none' || menu.style.display === '') {
      menu.style.display = 'flex';
   } else {
      menu.style.display = 'none';
   }
})

const menuAfter = document.getElementById('menu-after');

menuAfter.addEventListener('click', (event) => {
   event.stopPropagation()
   menu.style.display = 'none';
});

document.addEventListener('click', (event) => {
   if (event.target !== document.querySelector('header #perfil') && !menu.contains(event.target)) {
      menu.style.display = 'none';
   }
});
