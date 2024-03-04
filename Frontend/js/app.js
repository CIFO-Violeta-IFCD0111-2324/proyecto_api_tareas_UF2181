
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
    .then(mensaje => {
      document.querySelector("div").innerHTML = mensaje;
    })

});

fetch("http://localhost:3001/api/v1/leer")
  .then(res => res.json())
  .then(basedatos => {
    const cajaResultados = document.getElementById("cajaResultados");
    const arrayDatosConsulta = basedatos.resultado;
    for (let i = 0; i < arrayDatosConsulta.length; i++) {
      cajaResultados.innerHTML += `
        <h3>${arrayDatosConsulta[i].titulo}</h3>
        <h3>${arrayDatosConsulta[i].descripcion}</h3>  
        <h3>${arrayDatosConsulta[i].fechainicio}</h3> 
        <h3>${arrayDatosConsulta[i].fechafinal}</h3>   
      `;
    }
  })
  .catch(error => alert(error))


  