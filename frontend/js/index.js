// get elementos
const nombre_tarea = document.querySelector("#nombre_tarea");
const fecha_inicio = document.querySelector("#fecha_inicio");
const fecha_fin = document.querySelector("#fecha_fin");
const descripcion = document.querySelector("#descripcion");

// FALTA MODAL EN VARIAS PARTES
// Crud (crear)
const boton = document.querySelector("#validar");
boton.addEventListener("click", () => {
  // VALIDACION
  if (nombre_tarea.value.length === 0 || fecha_inicio.value.length === 0 || fecha_fin.value.length === 0 || descripcion.value.length === 0) {
    alert("Rellena todos los campos!");
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
    .catch(error => console.log(error))
});

// cRud (LEER)
fetch("http://localhost:3333/api/v1/leer")
  .then(res => res.json())
  .then(test => {
    const cajaResultados = document.querySelector("#cajaResultados");
    const arrayDatosConsulta = test.resultado;
    if (arrayDatosConsulta.length === 0) {
      cajaResultados.innerHTML = "<h3 style='color:red'>Todavía no hay tareas guardadas</h3>";
      return;
    }
    for (let i = 0; i < arrayDatosConsulta.length; i++) {
      cajaResultados.innerHTML += `
        <ul>
          <li>${arrayDatosConsulta[i].nombre_tarea}</li>
          <li>${formatearFECHA(arrayDatosConsulta[i].fecha_inicio)}</li>
          <li>${formatearFECHA(arrayDatosConsulta[i].fecha_fin)}</li>
          <li>${arrayDatosConsulta[i].descripcion}</li>
          <button>Editar</button>
          <button id="${arrayDatosConsulta[i].id}">Borrar</button>
        </ul>
        <hr>
      `;
    }
  })
  .catch(error => console.log(error));

// cruD (borrar)
function borrarDatos() {
  const faTrashes = document.querySelectorAll(".fa-trash");
  for (let i = 0; i < faTrashes.length; i++) {
    faTrashes[i].addEventListener("click", e => {
      if (confirm("Estas seguro de querer eliminar esta Tarea?")) {
        const idDatoBorrar = e.target.getAttribute("datosBorrarAtributo");
        fetch("http://localhost:3333/api/v1/borrar", {
          mothod: "delete",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            "nombre_tarea": idDatoBorrar,
            "fecha_inicio": idDatoBorrar,
            "fecha_fin": idDatoBorrar,
            "descripcion": idDatoBorrar
          })
        })
        .then(res => res.json())
        .then(msg => {
          bodyRespuesta.innerHTML += msg.mensaje;
          setTimeout(() => {
            location.reload();
          }, 2000);
        })
        .catch(error => bodyRespuesta.innerHTML = "<h3 class='error'>Error en servidor! </h3>");
      }
    });

  }
}

// FUNCION QUE FORMATEA LA FECHA QUE LLEGA DE LA API 
function formatearFECHA(fecha) {
  let date = new Date(fecha)
  let day = date.getDate()
  let month = date.getMonth() + 1
  let year = date.getFullYear()
  return `${day}-${month}-${year}`;
}