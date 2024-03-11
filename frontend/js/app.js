import resetForms from "./functions.js";
// get elementos de mensaje de respuesta
const bodyRespuesta = document.getElementById("bodyRespuesta");
const modalCrearRespuesta = document.getElementById("modalCrearRespuesta");
const modalEditarRespuesta = document.getElementById("modalEditarRespuesta");

const apiUrl = "http://localhost:3000/api/v1/";
// const apiUrl ="https://proyecto-api-tareas-uf2181-2.onrender.com/api/v1/";

function fetchData(url, method, bodyData) {
  return fetch(url, {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bodyData)
  })
    .then(response => response.json())
    .catch(error => console.error("Error en servidor:", error));
}

function showMessage(message, container) {
  container.innerHTML = message;
}

function reloadPage() {
  setTimeout(() => {
    location.reload(); // refresca página
  }, 2000);
}

// Crud (crear)
const crearBTNform = document.getElementById("crearBTNform");
const crearINPUT = document.getElementById("crearINPUT");

crearBTNform.addEventListener("click", () => {
  if (crearINPUT.value.length === 0) {
    alert("Añade un dato!");
    return;
  }
  fetchData(apiUrl + "crear", "post", { dato: crearINPUT.value })
    .then(res => {
      showMessage(res.mensaje, modalCrearRespuesta);
      if (res.status === 200)
        reloadPage();
    })
    .catch(error => showMessage("<h3 class='error'>Error en servidor!</h3>", modalCrearRespuesta));
});

// cRud (leer)
fetchData(apiUrl + "leer")
  .then(res => {
    if (res.status !== 200) {
      showMessage(res.mensaje, bodyRespuesta);
      return;
    }
    const arrayDatosConsulta = res.resultado;
    if (arrayDatosConsulta.length === 0) {
      bodyRespuesta.innerHTML = "Todavía no hay datos guardados";
      return;
    }
    for (let i = 0; i < arrayDatosConsulta.length; i++) {
      bodyRespuesta.innerHTML += `
        <div class="caja-dato">
          <h4>Dato ${arrayDatosConsulta[i].posicion_dato}</h4><hr>
          <h3>${arrayDatosConsulta[i].dato}</h3><hr>
          <i class="fa-solid fa-pen-to-square editarBTN" datoEditarAtributo="${arrayDatosConsulta[i].id}"></i>
          <i class="fa-solid fa-trash" datoBorrarAtributo="${arrayDatosConsulta[i].id}"></i>
        </div>
        `;
    }
    borrarDatoFuncion();
    editarDatoFuncion();
  })
  .catch(error => showMessage("<h3 class='error'>Error en servidor!</h3>", modalCrearRespuesta));

// cruD (borrar)
function borrarDatoFuncion() {
  const faTrashes = document.querySelectorAll(".fa-trash");
  for (let i = 0; i < faTrashes.length; i++) {
    faTrashes[i].addEventListener("click", e => {
      if (confirm("Estás seguro que quieres eliminar el dato?")) {
        const idDatoBorrar = e.target.getAttribute("datoBorrarAtributo");
        fetchData(apiUrl + "borrar", "delete", { id: idDatoBorrar })
          .then(msg => {
            showMessage(msg.mensaje, bodyRespuesta);
            if (msg.status === 200) {
              setTimeout(() => {
                location.reload(); // refresca página
              }, 2000);
            }
          })
          .catch(error => showMessage("<h3 class='error'>Error en servidor!</h3>", bodyRespuesta));
      }
    });
  }
}

// crUd (actualizar)
function editarDatoFuncion() {
  let id;
  const editarMODAL = document.getElementById("editarMODAL");
  const editarBTNs = document.querySelectorAll(".editarBTN");
  const editarSpan = document.getElementsByClassName("close")[1];

  for (let i = 0; i < editarBTNs.length; i++) {
    editarBTNs[i].onclick = function (e) {
      editarMODAL.style.display = "block";
      const dato = e.target.previousSibling.previousSibling.previousSibling.innerHTML;
      const editarINPUT = document.getElementById("editarINPUT");
      editarINPUT.value = dato;
      id = e.target.getAttribute("datoEditarAtributo");
    }
  }

  editarSpan.onclick = function () {
    editarMODAL.style.display = "none";
    resetForms();
  }

  const editarBTNform = document.getElementById("editarBTNform");
  const editarForm = document.querySelectorAll("form")[1];
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
    fetchData(apiUrl + "editar", "put", { dato: editarINPUT.value, id: id })
      .then(msg => {
        modalEditarRespuesta.innerHTML = msg.mensaje;
        setTimeout(() => {
          location.reload(); // refresca página
        }, 2000);
      })
      .catch(error => modalEditarRespuesta.innerHTML = "<h3 class='error'>Error en servidor!</h3>");
  });
}