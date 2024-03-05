
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
            mensajes.innerHTML = mensaje;
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
    for (let i = 0; i < arrayDatosConsulta.length; i++) {
        const tarea = arrayDatosConsulta[i];
        contenedorDatos.innerHTML += "<div class='indiv'><h3>ID: " + tarea.id +" "+ tarea.descripcion + "</h3><p> Fecha de inicio:"
                                  + (tarea.fecha_inicio ? tarea.fecha_inicio : "N/A") 
                                  + "- Fecha de fin: " + (tarea.fecha_fin ? tarea.fecha_fin : "N/A")
                                  + " || Estado: " + tarea.Estado_tarea 
                                  + " || <a href='"+ tarea.id +"'><img src='./img/iconoEliminar.png' class='icono' alt='Eliminar tarea'></a> <a href='"+ tarea.id +"'><img src='./img/iconoEditar.png' class='icono' alt=Editar tarea'></a></p></div>";    }
  })
  .catch(error => contenedorDatos.innerHTML =error);