// get elementos
const nombre_tarea = document.querySelector("#nombre_tarea");
const fecha_inicio = document.querySelector("#fecha_inicio");
const fecha_fin = document.querySelector("#fecha_fin");
const descripcion = document.querySelector("#descripcion");

// FALTA MODAL EN VARIAS PARTES

// Crud (crear)
const boton = document.querySelector("#validar");
boton.addEventListener("click", () => {
  if (nombre_tarea.value.length === 0) {
    alert("El campo esta vacio.");
  }
  if (fecha_inicio.value.length === 0) {
    alert("No has seleccionado una fecha.");
  }
  if (fecha_fin.value.length === 0) {
    alert("No has seleccionado una fecha.");
  }
  if (descripcion.value.length === 0) {
    alert("El campo esta vacio.");
    return;
  }
  fetch("http://localhost:3333/api/v1/crear", {
    method: "post",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      "nombre_tarea": nombre_tarea.value,
      "fecha_inicio": fecha_inicio.value,
      "fecha_fin": fecha_fin.value,
      "descripcion": descripcion.value
    })
  })

    .then(res => res.json())
    .then(msg => {
      alert(msg.mensaje);
      setTimeout(() => {
        location.reload(); // refrescar
      }, 3000); // son 3mil milisegundos = 3 seg.
    })
    .catch(error => alert(error))
});


// cRud (LEER)

fetch("http://localhost:3333/api/v1/leer")
  .then(res => res.json())
  .then(test => {
    const cajaResultados = document.querySelector("#cajaResultados");
    console.log(test.resultado);
    const arrayDatosConsulta = test.resultado;

    if (arrayDatosConsulta.length === 0) {
      bodyRespuesta.innerHTML = "Todavía no hay datos guardados";
      return;
    }




    for (let i = 0; i < arrayDatosConsulta.length; i++) {
      cajaResultados.innerHTML += "<h3>" + arrayDatosConsulta[i].nombre_tarea+ "</h3>"
      cajaResultados.innerHTML += "<h3>" + arrayDatosConsulta[i].fecha_inicio+ "</h3>"
      cajaResultados.innerHTML += "<h3>" + arrayDatosConsulta[i].fecha_fin+ "</h3>"
      cajaResultados.innerHTML += "<h3>" + arrayDatosConsulta[i].descripcion+ "</h3>"
    }
  })
  .catch(error => alert(error));











