const button = document.querySelector("button");

button.addEventListener("click", () => {
  const titulo = document.getElementById("titulo")
  const descripcion = document.getElementById("descripcion")
  const fechainicio = document.getElementById("inicio")
  const fechafinal = document.getElementById("fin")

  const url = "http://localhost:3001/api/v1/insertar";
  fetch(url, {
    method: "post",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      "titulo": titulo.value,
      "descripcion": descripcion.value,
      "fechainicio": fechainicio.value,
      "fechafinal": fechafinal.value
    })

  })
    .then(res => res.json())
    .then(mensaje => {
      document.querySelector("div").innerHTML = mensaje.mensaje;
    })

});

fetch("http://localhost:3001/api/v1/leer")
  .then(res => res.json())
  .then(basedatos => {
    const cajaResultados = document.getElementById("cajaResultados");
    const arrayDatosConsulta = basedatos.resultado;
    for (let i = 0; i < arrayDatosConsulta.length; i++) {
      cajaResultados.innerHTML += `
        <div id="resultado">
        <button class="borrar" id="${arrayDatosConsulta[i].id}">borrar</button>
        <h2 id="encabezados">ID</h2>
        <h3 id="contenido">${arrayDatosConsulta[i].id}</h3>
        <h2 id="encabezados">Titulo</h2>
        <h3 id="contenido">${arrayDatosConsulta[i].titulo}</h3>
        <h2 id="encabezados" >Descripcion</h2>
        <h3 id="contenido">${arrayDatosConsulta[i].descripcion}  </h3>
        <h2 id="encabezados" >FechaInicio</h2>
        <h3 id="contenido">${arrayDatosConsulta[i].fechainicio} </h3>
        <h2 id="encabezados">FechaFinal</h2>
        <h3 id="contenido">${arrayDatosConsulta[i].fechafinal}
        </h3>
        </div>   
      `;
    }
    borrar()
  })
  .catch(error => alert(error))


function borrar() {
  const buttons2 = document.getElementsByClassName("borrar");
  for (let i = 0; i < buttons2.length; i++) {
    buttons2[i].addEventListener("click", e => {
      if (confirm("Estás seguro que quieres eliminar el dato?")) {
        fetch("http://localhost:3001/api/v1/borrar", {
          method: "delete",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            "id": e.target.id
            //"descripcion": e.target.descripcion,
            //"fechainicio": e.target.fechainicio,
            //"fechafinal": e.target.fechafinal

          })
        })
          .then(res => res.json())
          .then(msg => {
            mensajes.innerHTML = "eliminado";
            setTimeout(() => {
              location.reload(); // refresca página
            }, 1000);
          })
          .catch(error => cajaResultados.innerHTML = "<h3 class='error'>Error en servidor!</h3>");
      }
    });
  }
}




