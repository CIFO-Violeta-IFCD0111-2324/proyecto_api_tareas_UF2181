

async function insertSQL() {
    const nombre = document.querySelector("input#nombre");
    const fechaIn = document.querySelector("input#fecha-in");
    const fechaFin = document.querySelector("input#fecha-fin");
    const desc = document.querySelector("#descrip");

    const url = "http://localhost:3000/api/insert";
    await fetch(url, {
        method: "post",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify({
            "nombre": nombre.value,
            "descripcion": desc.value,
            "fecha_inicio": fechaIn.value,
            "fecha_fin": fechaFin.value,
        })
    })
        .then(res => res.json())
        .then(msg => console.log(msg))
        .catch(err => alter(err))
    setTimeout(() => {
        location.reload(); // refresca página automatico en 1 segundo
    }, 1000);

}

// IIFE immediatly invoked function expression - strict mode activado
// Se usa para separar las variables globales de las locales, no-pollution
(() => {
    'use strict';

    const form = document.querySelector('#tareaForm');
    const btnTarea = document.querySelector('button.btn.btn-light');

    // function que valida el formulario y inserta la tarea
    function handleEnviarEvent(event) {
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            insertSQL();
        }
        form.classList.add('was-validated');
    }

    form.addEventListener('enviar', handleEnviarEvent, false);

    btnTarea.addEventListener('click', () => {
        // Evento sintetico
        const event = new Event('enviar', {
            'bubbles': true,
            'cancelable': true
        });

        form.dispatchEvent(event);
    });
})();



// cRud (leer)
fetch("http://localhost:3000/api/read")
    .then(res => res.json())
    .then(datos => {
        const cajaTareas = document.getElementById("caja-de-tareas");
        const divRespuestas = document.getElementsByClassName("respuestas");
        const tareasOut = datos.resultado;
        if (tareasOut.length == 0) {
            cajaTareas.innerHTML = "Todavia no hay tareas"
        }
        tareasOut.forEach(tarea => {
            const divTarea = document.createElement("div");
            
            // Elemento del nombre
            const nombreElm = document.createElement("h3");
            const textNombre = document.createTextNode(tarea.nombre);
            nombreElm.appendChild(textNombre);
            divTarea.appendChild(nombreElm);

            // Elemento de la descripcion
            const descElm = document.createElement("h5");
            const textDesc = document.createTextNode(tarea.descripcion);
            descElm.appendChild(textDesc);
            divTarea.appendChild(descElm);

            // Elemento de la fecha-in
            const fechaInElm = document.createElement("h6");
            const textFechaIn = document.createTextNode(tarea.fecha_inicio.substring(0, 10));
            fechaInElm.appendChild(textFechaIn);
            divTarea.appendChild(fechaInElm);

            // Elemento de la fecha-fin
            const fechaFinElm = document.createElement("h6");
            const textFechaFin = document.createTextNode(tarea.fecha_fin.substring(0, 10));
            fechaFinElm.appendChild(textFechaFin);
            divTarea.appendChild(fechaFinElm);


            // Papelera
            const papelera = document.createElement("i");
            papelera.classList.add("fa-solid");
            papelera.classList.add("fa-trash");
            papelera.setAttribute("id", tarea.id);

            // cruD Delete 
            papelera.addEventListener("click", e => {
                if (confirm("Estás seguro que quieres eliminar la tarea?")) {
                    fetch("http://localhost:3000/api/delete", {
                        method: "delete",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            "id": e.target.id
                        })
                    })
                        .then(res => res.json())
                        .then(msg => {
                            divRespuestas.innerHTML += msg.mensaje;
                            setTimeout(() => {
                                location.reload(); 
                            }, 1000)
                        })
                        .catch(error => divRespuestas.innerHTML = error);
                }
            });
            divTarea.appendChild(papelera);

            // Append caja al html
            cajaTareas.appendChild(divTarea);
        });
    })
    .catch(error => alert(error))


function deleteTask() {

}




