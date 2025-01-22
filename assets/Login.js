document.getElementById('boton').addEventListener('click', function() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('contra').value;

    if (email && password) {
        // Aquí puedes validar las credenciales si es necesario
        window.location.href = '/contactos.html'; // Redirige a la página de contactos
    } else {
        document.getElementById('error').textContent = 'Por favor, complete todos los campos.';
    }
});