
const button = document.querySelector("button");
button.addEventListener("click", () => {

  const titulo = document.getElementById("titulo")
  const descripcion = document.getElementById("descripcion")
  const fechainicio = document.getElementById("inicio")
  const fechafinal = document.getElementById("fin")

  const url = "http://localhost:3001/api/v1/insertar";
  fetch(url, {
    method: "post",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
        "titulo" : titulo.value,
        "descripcion" :descripcion.value,
        "fechainicio" : fechainicio.value,
        "fechafinal" : fechafinal.value
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

fetch("http://localhost:3001/api/v1/leer")
  .then(res => res.json())
  .then(basedatos => {
    const cajaResultados = document.getElementById("cajaResultados");
    const arrayDatosConsulta = basedatos.resultado;
    for (let i = 0; i < arrayDatosConsulta.length; i++) {
      cajaResultados.innerHTML += `
        <h3>titulo -- >${arrayDatosConsulta[i].titulo}</h3>
        <h3>descripcion -- >${arrayDatosConsulta[i].descripcion}</h3>  
        <h3>fechainicio -- >${arrayDatosConsulta[i].fechainicio}</h3> 
        <h3>fechafinal -- >${arrayDatosConsulta[i].fechafinal}</h3>   
      `;
    }
  })
  .catch(error => alert(error))


  