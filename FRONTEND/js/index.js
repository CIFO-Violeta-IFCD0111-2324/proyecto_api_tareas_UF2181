
const botonGuardar = document.querySelector("#GuardarTarea");
const mensajes = document.querySelector("#mensajes");

botonGuardar.addEventListener("click", () => {
    const campoDescripcion = document.querySelector("#descripcion");
    const campoFecha_inicio = document.querySelector("#fecha_inicio");
    const campoFecha_final = document.querySelector("#fecha_final");
    const campoEstadoTarea = document.querySelector("#estadoTarea");

    
    if (campoDescripcion.value.length === 0 ||
        campoFecha_inicio.value.length === 0 || 
        campoFecha_final.value.length === 0 || 
        campoEstadoTarea.value.length === 0) {
            mensajes.innerHTML = "Campos vacios!";
            return;
        }
    const url = "http://localhost:3500/api/v1/crearTarea";
    fetch(url, {
        method: "post",
        headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
               "Descripcion" : campoDescripcion.value,
                "FechaInicio" : campoFecha_inicio.value,
                "Fechafinal" : campoFecha_final.value,
                "Estado" : campoEstadoTarea.value
            })
        })
        .then(res => res.json())
        //.then(mensaje => mensajes.innerHTML = mensaje)
        .then(mensaje => {
            mensajes.innerHTML = "<h1 class='titulo'> Tarea, <b>¡¡¡Insertada!!!</b></h1>";
            setTimeout(() => {
              location.reload(); // refresca página
            }, 1000);
          })
        .catch(error => alert(error))
        
});

// cRud (leer)
fetch("http://localhost:3500/api/v1/leer")
  .then(res => res.json())
  .then(datos => {
    const contenedorDatos = document.getElementById("contenedorDatos");
    const arrayDatosConsulta = datos.resultado;
    if (arrayDatosConsulta.length===0) {
      contenedorDatos.innerHTML ="<h1 class='titulo'> No hay ninguna tarea, <b>¡¡¡espabila!!!</b> que te pilla el toro </h1>";
     }else{
            for (let i = 0; i < arrayDatosConsulta.length; i++) {
              const tarea = arrayDatosConsulta[i];
              contenedorDatos.innerHTML += "<div class='indiv'><h3 class='titulo'>TAREA: " + tarea.id +"</h3>"+ "<BR>"+ "<h2 class='detalle'>" +tarea.descripcion +"</h2>" + "<p>INICIO: "
                                        + (tarea.fecha_inicio ? tarea.fecha_inicio : "N/A") 
                                        + "<BR>"+"FIN: " + (tarea.fecha_fin ? tarea.fecha_fin : "N/A")
                                        + "<BR>"+ "<BR>"+ " ESTADO: " + tarea.Estado_tarea + "<BR>"+ "<BR>"+ "<div id='iconosPosit'><i class='fa-regular fa-pen-to-square' id='"+ tarea.id +"'></i> <i class='fa-regular fa-trash-can' id='"+ tarea.id +"'></i></div></p></div>";    }
          }
    })
  .catch(error => contenedorDatos.innerHTML =error);

  // cruD (borrar)
function borrarFuncion() {
  const papeleras = document.querySelectorAll(".fa-trash-can");
  for (let i = 0; i < papeleras.length; i++) {
    papeleras[i].addEventListener("click", e => {
      if (confirm("Estás seguro que quieres eliminar la tarea?")) {
        fetch("http://localhost:3500/api/v1/borrar", {
          method: "delete",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            "id": e.target.id
          })
        })
          .then(res => res.json())
          .then(msg => {
            bodyRespuesta.innerHTML += msg.mensaje;
            setTimeout(() => {
              location.reload(); // refresca página
            }, 2000);
          })
          .catch(error => bodyRespuesta.innerHTML = "<h3 class='error'>Error en servidor!</h3>");
      }
    });
  }
}

