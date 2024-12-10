function verificarFormulario() {
    const campos = document.querySelectorAll("#formularioContacto input:not([type='radio']), #formularioContacto textarea");
    const mensajeElemento = document.querySelector("#mensajeFormulario"); // Selecciona el elemento del mensaje
    let todosCompletos = true;

    campos.forEach((campo) => {
        if (campo.value.trim() === "") {
            todosCompletos = false;
        }
    });

    if (todosCompletos) {
        const mensaje = "Todos los campos del formulario están completos.";
        console.log(mensaje); // Aparece en la consola
        mensajeElemento.style.color = "green"; // Mensaje en verde si está completo
        mensajeElemento.textContent = mensaje; // Aparece en la pantalla
    } else {
        const mensaje = "Por favor, complete todos los campos del formulario.";
        console.log(mensaje); // Aparece en la consola
        mensajeElemento.style.color = "red"; // Mensaje en rojo si falta algo
        mensajeElemento.textContent = mensaje; // Aparece en la pantalla
    }
}

// Llama a la función cuando se envíe el formulario
document.querySelector("#formularioContacto").addEventListener("submit", (e) => {
    e.preventDefault(); // Evitar el envío real del formulario
    verificarFormulario();
});

