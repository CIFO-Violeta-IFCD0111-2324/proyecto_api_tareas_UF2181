
const botonGuardar = document.querySelector("#GuardarTarea");
const mensajes = document.querySelector("#mensajes");

botonGuardar.addEventListener("click", () => {
    // campos del formulario
    const campoDescripcion = document.querySelector("#descripcion");
    const campoFecha_inicio = document.querySelector("#fecha_inicio");
    const campoFecha_final = document.querySelector("#fecha_final");
    const campoEstadoTarea = document.querySelector("#estadoTarea");

    // variable del total de caracteres que aceptaremos
    const caracteresMax = 20;


    //este if comprueba que los datos que llegan no estén vacíos
    if (campoDescripcion.value.length === 0 ||
        campoFecha_inicio.value.length === 0 || 
        campoFecha_final.value.length === 0 || 
        campoEstadoTarea.value.length === 0) {
            mensajes.innerHTML = "Campos vacios!";
            return;
        }
    
    if (campoFecha_inicio.value > campoFecha_final.value) {
              mensajes.innerHTML = "La fecha de inicio no puede ser posterior a la fecha final!";
              return;
          }
    
    if (campoDescripcion.value.length >= caracteresMax){
      mensajes.innerHTML = "La descripción es demasiado larga";
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
        .then(mensaje => {
            mensajes.innerHTML = "Tarea <b>¡¡¡Insertada!!!</b>";
            setTimeout(() => {// refresca página
              location.reload(); 
            }, 1000);
          })
        .catch(error => contenedorDatos.innerHTML =error);
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
                                // Obtener la descripción y dividirla en fragmentos de 10 caracteres
                                const descripcion = tarea.descripcion;
                                const fragmentos = [];
                                for (let j = 0; j < descripcion.length; j += 15) {
                                    fragmentos.push(descripcion.substring(j, j + 15));
                                }
                                // Unir los fragmentos con saltos de línea o <br>
                                const descripcionConSaltos = fragmentos.join("<br>");

                contenedorDatos.innerHTML += "<div class='indiv'><h3 class='titulo'>TAREA: " + tarea.id +"</h3><h2 class='detalle'>" + descripcionConSaltos + "</h2><div class='row'><div class='col-25'>INICIO:</div><div class='col-75'>"+ tarea.diaInicio + "-"+ tarea.mesInicio + "-" + tarea.anoInicio + "</div></div><div class='row'><div class='col-25'>FIN:</div> <div class='col-75'>" + tarea.diafin + "-"+ tarea.mesfin + "-" + tarea.anofin + "</div></div><div class='row'><div class='col-25'>ESTADO: </div><div class='col-75'> " + tarea.Estado_tarea +"</div></div><div id='iconosPosit'><i class='fa-regular fa-pen-to-square' id='"+ tarea.id +"'></i> <i class='fa-regular fa-trash-can' id='"+ tarea.id +"'></i></div></div>";
                }
            borrarFuncion();
          }
    })
  .catch(error => contenedorDatos.innerHTML =error);

  // cruD (borrar)
function borrarFuncion() {
  const papeleras = document.querySelectorAll(".fa-trash-can");
  for (let i = 0; i < papeleras.length; i++) {
    papeleras[i].addEventListener("click", papelerita => {
      if (confirm("Estás seguro que quieres eliminar la tarea?")) {
        fetch("http://localhost:3500/api/v1/borrar", {
          method: "delete",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            "id": papelerita.target.id
          })
        })
          .then(res => res.json())
          .then(mensaje => {
            alert("Tarea eliminada, buen trabajo");
            setTimeout(() => {
              location.reload(); // refresca página
            }, 1000);
          })
          .catch(error => mensajes.innerHTML = "Error en servidor!");
      }
    });
  }
}

