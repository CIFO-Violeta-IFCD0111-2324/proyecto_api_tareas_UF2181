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
      alert(msg.mensaje);
      setTimeout(() => {
        location.reload(); // refresca página
      }, 3000);
    })
    .catch(error => alert(error))
});

// cRud (leer)
fetch("http://localhost:3000/api/v1/leer")
  .then(res => res.json())
  .then(datos => {
    const cajaResultados = document.getElementById("cajaResultados");
    const arrayDatosConsulta = datos.resultado;
    for (let i = 0; i < arrayDatosConsulta.length; i++) {
      cajaResultados.innerHTML += "<h3>"+arrayDatosConsulta[i].dato+"</h3>";
    }
  })
  .catch(error => alert(error))