// get elementos
const bodyRespuesta = document.getElementById("bodyRespuesta");
const modalCrearRespuesta = document.getElementById("modalCrearRespuesta");
const crearBTNform = document.getElementById("crearBTNform");
const editarBTNform = document.getElementById("editarBTNform");

// Crud (crear)
crearBTNform.addEventListener("click", () => {
  const crearINPUT = document.getElementById("crearINPUT");
  if (crearINPUT.value.length === 0) {
    alert("Añade un dato!");
    return;
  }
  fetch("http://localhost:3000/api/v1/crear", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      "dato": crearINPUT.value
    })
  })
    .then(res => res.json())
    .then(msg => {
      modalCrearRespuesta.innerHTML = msg.mensaje;
      setTimeout(() => {
        location.reload(); // refresca página
      }, 2000);
    })
    .catch(error => modalCrearRespuesta.innerHTML = "<h3 class='error'>Error en servidor!</h3>");
});

// cRud (leer)
fetch("http://localhost:3000/api/v1/leer")
  .then(res => res.json())
  .then(datos => {
    const arrayDatosConsulta = datos.resultado;
    if (arrayDatosConsulta.length === 0) {
      bodyRespuesta.innerHTML = "Todavía no hay datos guardados";
      return;
    }
    for (let i = 0; i < arrayDatosConsulta.length; i++) {
      bodyRespuesta.innerHTML += `
        <div class="caja-dato">
          <h4>Dato ${i+1}</h4><hr>
          <h3>${arrayDatosConsulta[i].dato}</h3><hr>
          <i class="fa-solid fa-pen-to-square editarBTN" datoEditarAtributo="${arrayDatosConsulta[i].id}"></i>
          <i class="fa-solid fa-trash" datoBorrarAtributo="${arrayDatosConsulta[i].id}"></i>
        </div>
        `;
    }
    borrarDatoFuncion();
    editarDatoFuncion();
  })
  .catch(error => bodyRespuesta.innerHTML = "<h3 class='error center'>Error en servidor! Esta arrancado?</h3>");

// cruD (borrar)
function borrarDatoFuncion() {
  const faTrashes = document.querySelectorAll(".fa-trash");
  for (let i = 0; i < faTrashes.length; i++) {
    faTrashes[i].addEventListener("click", e => {
      if (confirm("Estás seguro que quieres eliminar el dato?")) {
        const idDatoBorrar = e.target.getAttribute("datoBorrarAtributo");
        fetch("http://localhost:3000/api/v1/borrar", {
          method: "delete",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            "dato": idDatoBorrar
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

// crUd (actualizar)
function editarDatoFuncion() {
  let id;
  // editar Modal (IMPORTANTE! se añade en app.js ya que en primera instancia no se han creado las cajas de dato)
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
  }
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == editarMODAL) {
      editarMODAL.style.display = "none";
    }
  }

  // DETECTAR SI HA HABIDO CAMBIO EN EL FORM DE EDITAR, SI HUBO EDITA EL DATO EN SERVIDOR
  const editarForm = document.querySelectorAll("form")[1];
  editarBTNform.addEventListener("click", () => {
    editarForm.addEventListener("change", () => {
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
          // setTimeout(() => {
          //   location.reload(); // refresca página
          // }, 2000);
        })
        .catch(error => modalEditarRespuesta.innerHTML = "<h3 class='error'>Error en servidor!</h3>");
    });
    const modalEditarRespuesta = document.getElementById("modalEditarRespuesta");
    modalEditarRespuesta.innerHTML = "<h3 class='error'>Añade un cambio en el dato!</h3>";
  });
}