const boton = document.querySelector("button");
const mensajes = document.querySelector("#mensajes");
boton.addEventListener("click", () => {
    const campoDescripcion = document.querySelector("#descripcion");
    const campoFecha_inicio = document.querySelector("#fecha_inicio");
    const campoFecha_final = document.querySelector("#fecha_final");
    const campoEstadoTarea = document.querySelector("#estadoTarea");

    
    if (campoDescripcion.value.length === 0 ||
        campoFecha_inicio.value.length === 0 || 
        campoFecha_final.value.length === 0 || 
        campoEstadoTarea.value.length === 0) {
            mensajes.innerHTML = "Campos vacios!";
        } else {
            const url = "http://localhost:3000/crearTarea";
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
            .then(mensaje => mensajes.innerHTML = mensaje)
        }
})