
const botonGuardar = document.querySelector("#GuardarTarea");
const mensajes = document.querySelector("#mensajes");

//guardar los datos en la bbdd
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
            mensajes.innerHTML = "Tarea Insertada <i class='fas fa-spinner fa-spin'></i>";
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
                                // Obtener la descripción y dividirla en fragmentos de 15 caracteres
                                const descripcion = tarea.descripcion;
                                const fragmentos = [];
                                for (let j = 0; j < descripcion.length; j += 15) {
                                    fragmentos.push(descripcion.substring(j, j + 15));
                                }
                                // Unir los fragmentos con saltos de línea o <br>
                                const descripcionConSaltos = fragmentos.join("<br>");

                contenedorDatos.innerHTML += "<div class='indiv'><p class='titulo'>TAREA: " + tarea.id +"</p><p class='detalle'>" + descripcionConSaltos + "</p><div class='row'><div class='col-25'>INICIO:</div><div class='col-75'>"+ tarea.diaInicio + "-"+ tarea.mesInicio + "-" + tarea.anoInicio + "</div></div><div class='row'><div class='col-25'>FIN:</div> <div class='col-75'>" + tarea.diafin + "-"+ tarea.mesfin + "-" + tarea.anofin + "</div></div><div class='row'><div class='col-25'>ESTADO: </div><div class='col-75'> " + tarea.Estado_tarea +"</div></div><div id='iconosPosit'><i class='fa-regular fa-pen-to-square' id='"+ tarea.id +"'></i> <i class='fa-regular fa-trash-can' id='"+ tarea.id +"'></i></div></div>";
                }
            borrarFuncion();
           // editarDatoFuncion()
          }
    })
  .catch(error => contenedorDatos.innerHTML =error);

  // crUd (update)

  function editarDatoFuncion() {
    let id;
    // editar Modal (IMPORTANTE! se añade en index.js ya que en primera instancia no se han creado las cajas de dato)
    const editarMODAL = document.getElementById("editarMODAL");
    // Get the button that opens the modal
    const editarBTNs = document.querySelectorAll(".editarBTN");
    // Get the <span> element that closes the modal
    const editarSpan = document.getElementsByClassName("close")[1];
    // When the user clicks on the button, open the modal
    // GETION DE AÑADIR DATO CORRESPONDIENTE AL MODAL
    for (let i = 0; i < editarBTNs.length; i++) {
      editarBTNs[i].onclick = function (e) {
        editarMODAL.style.display = "block";
        const dato = e.target.previousSibling.previousSibling.previousSibling.innerHTML; // para recoger el valor del h3
        const editarINPUT = document.getElementById("editarINPUT");
        editarINPUT.value = dato;
        id = e.target.getAttribute("datoEditarAtributo");
      }
    }
    // When the user clicks on <span> (x), close the modal
    editarSpan.onclick = function () {
      editarMODAL.style.display = "none";
      resetForms();
    }
    // DETECTAR SI HA HABIDO CAMBIO EN EL FORM DE EDITAR, SI HUBO EDITA EL DATO EN SERVIDOR
    const editarBTNform = document.getElementById("editarBTNform");
    const editarForm = document.querySelectorAll("form")[1];
    // Gestiona si ha habido cambios en el form
    let cambioForm = false;
    editarForm.addEventListener("change", () => {
      cambioForm = true;
    })
  
    editarBTNform.addEventListener("click", () => {
      if (!cambioForm) {
        alert("Modifica el dato!");
        return;
      }
      
      if (editarINPUT.value.length === 0) {
        alert("Añade un dato!");
        return;
      }
      fetch("http://localhost:3000/api/v1/editar", {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          "dato": editarINPUT.value,
          "id": id
        })
      })
        .then(res => res.json())
        .then(msg => {
          modalEditarRespuesta.innerHTML = msg.mensaje;
          setTimeout(() => {
            location.reload(); // refresca página
          }, 2000);
        })
        .catch(error => modalEditarRespuesta.innerHTML = "<h3 class='error'>Error en servidor!</h3>");
    });
    const modalEditarRespuesta = document.getElementById("modalEditarRespuesta");
  }








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

