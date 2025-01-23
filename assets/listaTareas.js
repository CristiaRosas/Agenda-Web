document.addEventListener("DOMContentLoaded", () => {
    const tareaInput = document.getElementById("tareaInput");
    const agregarTaInput = document.getElementById("agregarTa");
    const listaTInput = document.getElementById("listaT");
    const selectorPrioridad = document.getElementById("prioridad");

    const cargarTareas = () => {
        const tareasGuardadas = JSON.parse(localStorage.getItem("tareas")) || [];
        tareasGuardadas.forEach(({ tarea, prioridad }) => {
            const listItem = crearElementoTarea(tarea, prioridad);
            listaTInput.appendChild(listItem);
        });
    };

    const guardarTareas = () => {
        const tareas = [];
        listaTInput.querySelectorAll("li").forEach((listItem) => {
            tareas.push({
                tarea: listItem.querySelector("span").textContent,
                prioridad: listItem.classList.contains("urgente") ? "urgente" : "normal",
            });
        });
        localStorage.setItem("tareas", JSON.stringify(tareas));
    };

    const crearElementoTarea = (tarea, prioridad) => {
        const listItem = document.createElement("li");
        listItem.classList.add(prioridad === "urgente" ? "urgente" : "normal");

        listItem.innerHTML = `
            <span>${tarea}</span>
            <button class="complete-btn">Completar</button>
            <button class="editar-btn">Editar</button>
            <button class="eliminar-btn">Eliminar</button>
        `;
        return listItem;
    };

    agregarTaInput.addEventListener("click", () => {
        const tareaValor = tareaInput.value.trim();
        const prioridad = selectorPrioridad.value;

        if (tareaValor) {
            const listItem = crearElementoTarea(tareaValor, prioridad);
            listaTInput.appendChild(listItem);

            if (prioridad === "urgente") {
                listaTInput.insertBefore(listItem, listaTInput.firstChild);
            } else {
                listaTInput.appendChild(listItem);
            }

            guardarTareas(); 
            tareaInput.value = "";
        }
    });

    listaTInput.addEventListener("click", (event) => {
        const { target } = event;

        if (target.classList.contains("complete-btn")) {
            const listItem = target.closest("li");
            listItem.remove(); 
            guardarTareas(); 
        }

        if (target.classList.contains("eliminar-btn")) {
            const listItem = target.closest("li");
            listItem.remove();
            guardarTareas();
        }

        if (target.classList.contains("editar-btn")) {
            const listItem = target.closest("li");
            const tareaSpan = listItem.querySelector("span");
            const textoActual = tareaSpan.textContent;

            const editarInput = document.createElement("input");
            editarInput.type = "text";
            editarInput.value = textoActual;

            const botonGuardar = document.createElement("button");
            botonGuardar.textContent = "Guardar";

            listItem.innerHTML = "";
            listItem.appendChild(editarInput);
            listItem.appendChild(botonGuardar);

            botonGuardar.addEventListener("click", () => {
                const nuevoValor = editarInput.value.trim();
                if (nuevoValor) {
                    listItem.innerHTML = `
                        <span>${nuevoValor}</span>
                        <button class="complete-btn">Completar</button>
                        <button class="editar-btn">Editar</button>
                        <button class="eliminar-btn">Eliminar</button>
                    `;
                    guardarTareas(); 
                }
            });
        }
    });

    const botonR = document.getElementById("botonRegresar");
    botonR.addEventListener("click", () => {
        window.location.href = "/contactos.html";
    });

    cargarTareas();
});
