// CREAR

const button = document.getElementById("crearBTN");

button.addEventListener("click", () => {
  const titulo = document.getElementById("titulo")
  const descripcion = document.getElementById("descripcion")
  const fechainicio = document.getElementById("inicio")
  const fechafinal = document.getElementById("fin")
  const portada = document.getElementById("portada")


  const url = "http://localhost:3001/api/v1/insertar";
  fetch(url, {
    method: "post",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      "titulo": titulo.value,
      "descripcion": descripcion.value,
      "fechainicio": fechainicio.value,
      "fechafinal": fechafinal.value,
      "portada":portada.value
    })

  })
    .then(res => res.json())
    .then(mensaje => {
      setTimeout(() => {
        location.reload(); // refresca página
      }, 1000);
      document.querySelector("div").innerHTML = mensaje.mensaje;
    })

});


// EDITAR
const button2 = document.getElementById("editarBTN");

button2.addEventListener("click", () => {
  alert()

});

function editar () {
  // COGEMOS LOS BOTONES DE EDITAR TAREAS
  const editarBTNS = document.querySelectorAll(".editar");
  const editarFORM = document.querySelector("#editarFORM");
  for (let i = 0; i < editarBTNS.length; i++) {
    editarBTNS[i].addEventListener("click", (e) => {
      // muestra form
      editarFORM.style.display = "flex";
      // añadir los datos de la tarea concreta que se ha clicado, en el form de editar
      
      const tituloTareaClickada = document.querySelector(".titulo"+e.target.id).innerHTML;
      const inputEditarForm = document.querySelector("#editarTitulo");
      inputEditarForm.value = tituloTareaClickada;

    });
  }
}


// LEER
fetch("http://localhost:3001/api/v1/leer")
  .then(res => res.json())
  .then(basedatos => {
    const cajaResultados = document.getElementById("cajaResultados");
    const arrayDatosConsulta = basedatos.resultado;
    for (let i = 0; i < arrayDatosConsulta.length; i++) {
      cajaResultados.innerHTML += `
        <div id="resultado">
        <button class="borrar" id="${arrayDatosConsulta[i].id}">borrar</button>
        <button class="editar" id="${arrayDatosConsulta[i].id}">editar</button>
        <div class="cuadro1">
        <h2 class="encabezados">ID</h2> 
        <h3 id="contenido">${arrayDatosConsulta[i].id}</h3>
        </div>
        <div class="cuadro2">
        <h2 class="encabezados" >Titulo</h2>
        <h3 id="contenido" class="titulo${arrayDatosConsulta[i].id}">${arrayDatosConsulta[i].titulo}</h3>
        </div>
        <div class="cuadro2">
        <h2 class="encabezados">Descripcion</h2>
        <h3 id="contenido">${arrayDatosConsulta[i].descripcion}  </h3>
        </div>
        <div class="cuadro2">
        <h2 class="encabezados">portada</h2>
        <h3 id="contenido">${arrayDatosConsulta[i].portada} </h3> 
        </div>
        <div class="cuadro3">
        <h2 class="encabezados" >FechaInicio</h2>
        <h3 id="contenido">${arrayDatosConsulta[i].fechainicio.substring(0,10)} </h3>
        </div>
        <div class="cuadro3">
        <h2 class="encabezados">FechaFinal</h2>
        <h3 id="contenido">${arrayDatosConsulta[i].fechafinal.substring(0,10)} </h3>
        </div>
        
        </div>   
      `;
    }
    borrar();
    editar();
  })
  .catch(error => alert(error))

// BORRAR
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
          .then(mensaje => {
            document.querySelector("div").innerHTML = mensaje.mensaje;
            setTimeout(() => {
              location.reload(); // refresca página
            }, 1000);
          })
          .catch(error => resultados.innerHTML = "<h3 class='error'>Error en servidor!</h3>");
      }
    });
  }
}

const subir = document.getElementById('subir');
subir.addEventListener('click', () => {
  window.scrollTo(0,0);
})
const bajar = document.getElementById('bajar');
bajar.addEventListener('click', () => {
  window.scrollTo({
    top: document.body.scrollHeight,
})
})





