const botonGuardar = document.querySelector("#GuardarTarea");
const mensajes = document.querySelector("#mensajes");

//variable de almacenaje de datos
let almacen = [];


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
    almacen = arrayDatosConsulta;
    console.log("al declarar "+ [almacen]);
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

                contenedorDatos.innerHTML += "<div class='indiv'><p class='titulo'>TAREA: " + tarea.id +"</p><p class='detalle'>" + descripcionConSaltos + "</p><div class='row'><div class='col-25'>INICIO:</div><div class='col-75'>"+ tarea.diaInicio + "-"+ tarea.mesInicio + "-" + tarea.anoInicio + "</div></div><div class='row'><div class='col-25'>FIN:</div> <div class='col-75'>" + tarea.diafin + "-"+ tarea.mesfin + "-" + tarea.anofin + "</div></div><div class='row'><div class='col-25'>ESTADO: </div><div class='col-75'> " + tarea.Estado_tarea +"</div></div><div id='iconosPosit'><i class='fa-regular fa-pen-to-square editarBTN' id='"+ tarea.id +"'></i> <i class='fa-regular fa-trash-can' id='"+ tarea.id +"'></i></div></div>";
                }

            borrarFuncion();
            editarDatoFuncion();
          }
          
    })
  .catch(error => contenedorDatos.innerHTML =error);

  // crUd (update)//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  function editarDatoFuncion() {
    console.log(almacen );
    const botonesEditar = document.querySelectorAll(".editarBTN");
    for (let i = 0; i < botonesEditar.length; i++) {
        botonesEditar[i].addEventListener("click", lapicito => {
            editarMODAL.style.display = "Block";
            const idED = lapicito.target.id.toString();
            console.log(idED);

            // Encuentra el elemento en el array `almacen` con el ID correspondiente
            function encontrarTareaPorId(id) {
              for (let i = 0; i < almacen.length; i++) {
                  if (almacen[i].id.toString() === id) {
                      return almacen[i];
                  }
              }
              return null; // Retorna null si no se encuentra la tarea con el ID proporcionado
          }
          
          const tareaEditada = encontrarTareaPorId(idED);

            if (tareaEditada) {
              // Si se encuentra el elemento, puedes acceder a sus propiedades
              const campoDescripcionED = document.querySelector("#descripcionED");
              const campoFecha_inicioED = document.querySelector("#fecha_inicioED");
              const campoFecha_finalED = document.querySelector("#fecha_finalED");
              const campoEstadoTareaED = document.querySelector("#estadoTareaED");

              // Llena los campos del formulario con los valores del elemento encontrado
              campoDescripcionED.value = tareaEditada.descripcion;
              campoFecha_inicioED.value = `${tareaEditada.diafin}/${tareaEditada.mesfin}/${tareaEditada.anofin}`;
              campoFecha_finalED.value = `${tareaEditada.diafin}/${tareaEditada.mesfin}/${tareaEditada.anofin}`;
              campoEstadoTareaED.value = tareaEditada.Estado_tarea;

          } else {
              console.log("No se encontró ninguna tarea con el ID proporcionado.");
          }
        });
    }
}


// FIN crUd (update)//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





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

