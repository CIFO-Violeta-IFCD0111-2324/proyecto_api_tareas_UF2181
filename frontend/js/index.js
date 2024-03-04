const input = document.querySelector(".text");
const boton = document.querySelector("#validar");
const inputDate = document.querySelector(".date");

boton.addEventListener("click", () => {
  if (input.value.length === 0) {
    alert("El campo esta vacio.");
  }
  if (inputDate.value.length === 0) {
    alert("No has seleccionado una fecha.");
    return;
  }
  fetch("http://localhost:3333/api/v1/crear", {
    method: "post",
    headers: { 'Content-Type': "application/json" },
    body: JSON.stringify({
      "tareas": input.value

    })
  })

    .then(res => res.json())
    .then(msg => {
      alert(msg.mensaje);
      setTimeout(() => {
        location.reload(); // refrescar
      }, 3000);
            })
            .catch (error => alert(error))
});
