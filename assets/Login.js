const credenciales = {
    correoValido: "crosas-2023500@kinal.edu.gt",
    contraValida: "12345"
};

    const boton = document.getElementById("boton");
    const error = document.getElementById("error");

    boton.addEventListener("click", () => {
        const correo = document.getElementById("email").value.trim();
        const contra = document.getElementById("contra").value.trim();
        const contraInput = document.getElementById("contra");

        (correo === credenciales.correoValido && contra === credenciales.contraValida) 
        ?   window.location.href = "/contactos.html"
        :  error.textContent = "Correo o contraseña incorrecta.";
        contraInput.value="";
        
    });