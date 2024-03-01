 const input = document.querySelector("input");
 const boton = document.querySelector("button");

 boton.addEventListener("click", () => {
     if (input.value.length == 0) {
         alert("El campo esta vacio o no cumple los requisitos");
     } else {
         const url = "http://localhost:3333/insertar";

         fetch(url, {
             method: "post",
             headers: { 'Content-Type': "application/json" },
             body: JSON.stringify({
                 "text": input.value
             })
         })

             .then(res => res.json())
             .then(mensaje => console.log(mensaje))
     }
 });
