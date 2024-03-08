
// Crud - crear

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
            "fecha_inicio": fechaIn.value.toISOString,
            "fecha_fin": fechaFin.value.toISOString,
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
        const tareasOut = datos.resultado;
        if (tareasOut.length == 0) {
            cajaTareas.innerHTML = "Todavia no hay tareas"
        }
        tareasOut.forEach(tarea => {
            const divTarea = document.createElement("div");
            divTarea.classList.add(setNota(tarea.id))
            // Elemento del nombre
            const nombreElm = document.createElement("h4");
            const textNombre = document.createTextNode(tarea.nombre);
            nombreElm.appendChild(textNombre);
            divTarea.appendChild(nombreElm);

            // Elemento de la descripcion
            const descElm = document.createElement("p");
            const textDesc = document.createTextNode(tarea.descripcion);
            descElm.appendChild(textDesc);
            divTarea.appendChild(descElm);

            // Contenedor de las fechas
            const divFechas = document.createElement("div");
            divFechas.classList.add("caja-fechas")

            // Elemento de la fecha-in
            const fechaInElm = document.createElement("span");
            const textFechaIn = document.createTextNode("Inicio: " + tarea.fecha_inicio.split("T")[0]);
            fechaInElm.appendChild(textFechaIn);
            divFechas.appendChild(fechaInElm);

            // Elemento de la fecha-fin
            const fechaFinElm = document.createElement("span");
            const textFechaFin = document.createTextNode("Final: " + tarea.fecha_fin.split("T")[0]);
            fechaFinElm.appendChild(textFechaFin);
            divFechas.appendChild(fechaFinElm);
            divTarea.appendChild(divFechas)

            // Div Papelera y edit
            const divPE = document.createElement("div");
            divPE.classList.add("divPE");

            // boton Papelera
            const papelera = document.createElement("i");
            papelera.classList.add("fa-solid");
            papelera.classList.add("fa-trash");
            papelera.setAttribute("id", tarea.id);

            // cruD Delete 
            papelera.addEventListener("click", deletePapel, false);
            divPE.appendChild(papelera);

            // boton editar 

            const btnEdit = document.createElement("i");
            btnEdit.classList.add("fa-solid", "fa-pen-to-square");
            btnEdit.setAttribute("id", tarea.id);
            btnEdit.addEventListener("click", editDato, false)
            divPE.appendChild(btnEdit)

            divTarea.appendChild(divPE);
            // Append caja al html
            cajaTareas.appendChild(divTarea);
        });
    })
    .catch(error => alert(error));



function setNota(id) {
    const notasArray = ["nota-azul", "nota-lila", "nota-naranja", "nota-roja", "nota-turquesa"]
    const index = id % notasArray.length;
    return notasArray[index];
}


async function deletePapel(event) {
    const divRespuestas = document.querySelector("div#caja-respuestas");
    if (confirm("Estás seguro que quieres eliminar la tarea?")) {
        await fetch("http://localhost:3000/api/delete", {
            method: "delete",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "id": event.target.id
            })
        })
            .then(res => res.json())
            .then(msg => {
                divRespuestas.innerHTML = msg.mensaje;
                setTimeout(() => {
                    location.reload();
                }, 3000)
            })
            .catch(error => divRespuestas.innerHTML = error.mensaje);
    }
}


async function editDato(event) {
    const modalEdit = document.querySelector("#myModalEdit");

    modalEdit.style.display = "block";

    nombre = event.target.parentNode.parentNode.firstChild.innerHTML;
    desc = event.target.parentNode.parentNode.firstChild.nextSibling.innerHTML;
    fechaIn = event.target.parentNode.previousSibling.firstChild.innerHTML;
    fechaFin = event.target.parentNode.previousSibling.lastChild.innerHTML;
    id = event.target.id;

    datosIntoModalEdit(nombre, desc, fechaIn, fechaFin, id);
}

(() => {
    'use strict';

    const form = document.querySelector('#tareaFormEdit');
    const btnTarea = document.querySelector('#btnEdit');

    // function que valida el formulario y inserta la tarea
    let cambioForm = false;
    form.addEventListener("change", () => {
        cambioForm = true;
    });

    function handleEnviarEvent(event) {
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        } else if (!cambioForm) {
            alert("Modifica los datos");
            return;
        } else {
            editTareaSQL();
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


function datosIntoModalEdit(n, d, fi, fn, id) {
    const nombreIn = document.querySelector("#nombreEdit");
    const fechaInIn = document.querySelector("#fechaInEdit");
    const fechaFinIn = document.querySelector("#fechaFinEdit");
    const descIn = document.querySelector("#descripEdit");
    const titulo = document.querySelector('p.titulo.editar');
    titulo.setAttribute("id", id);

    nombreIn.value = n;
    fechaInIn.value = new Date(fi.split(" ")[1]).toISOString().substring(0, 10);
    fechaFinIn.value = new Date(fn.split(" ")[1]).toISOString().substring(0, 10);
    descIn.value = d;

}

async function editTareaSQL() {
    const divRespuestas = document.querySelector("div#caja-respuestas");
    const nombreIn = document.querySelector("#nombreEdit").value;
    const fechaInIn = document.querySelector("#fechaInEdit").value;
    const fechaFinIn = document.querySelector("#fechaFinEdit").value;
    const descIn = document.querySelector("#descripEdit").value;
    const id = document.querySelector("p.titulo.editar").id;

    console.log(fechaInIn, fechaFinIn)

    await fetch("http://localhost:3000/api/edit", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "id": id,
                "nombre": nombreIn,
                "descripcion": descIn,
                "fecha_inicio": fechaInIn,
                "fecha_fin": fechaFinIn,
            })
        })
            .then(res => res.json())
            .then(msg => {
                divRespuestas.innerHTML = msg.mensaje;
                setTimeout(() => {
                    location.reload(); // refresca página
                  }, 2000);
                })
            .catch(err => divRespuestas.innerHTML = "<h3 class='error'>Error en servidor!</h3>")
    
}


