// get elementos
const bodyRespuesta = document.getElementById("bodyRespuesta");
const modalCrearRespuesta = document.getElementById("modalCrearRespuesta");

// Crud (crear)
const crearBTNform = document.getElementById("crearBTNform");
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
          <h4>Dato ${arrayDatosConsulta[i].id}</h4><hr>
          <h3>${arrayDatosConsulta[i].dato}</h3><hr>
          <i class="fa-solid fa-pen-to-square"></i>
          <i class="fa-solid fa-trash" id="${arrayDatosConsulta[i].id}"></i>
        </div>
        `;
    }
    borrarFuncion();
  })
  .catch(error => bodyRespuesta.innerHTML = "<h3 class='error center'>Error en servidor! Esta arrancado?</h3>");

// cruD (borrar)
function borrarFuncion() {
  const faTrashes = document.querySelectorAll(".fa-trash");
  for (let i = 0; i < faTrashes.length; i++) {
    faTrashes[i].addEventListener("click", e => {
      if (confirm("Estás seguro que quieres eliminar el dato?")) {
        fetch("http://localhost:3000/api/v1/borrar", {
          method: "delete",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            "dato": e.target.id
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
