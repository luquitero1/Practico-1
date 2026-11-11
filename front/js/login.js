const loginForm = document.getElementById('loginForm');

obtenerSesion().then((usuario) => {
    if (usuario) {
        window.location.replace(PANELES[usuario.id_rol]);
    }
});

loginForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const respuesta = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: loginForm.email.value,
            password: loginForm.password.value
        })
    });
    const data = await respuesta.json();

    if (respuesta.ok) {
        window.location.replace(PANELES[data.id_rol]);
    } else {
        document.getElementById('loginError').textContent = data.message;
    }
});
