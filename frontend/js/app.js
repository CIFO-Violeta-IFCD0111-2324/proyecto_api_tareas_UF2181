
const addBtn = document.querySelector("button.btn.btn-light");

addBtn.addEventListener("click", insertSQL);

async function insertSQL() {
    const nombre = document.querySelector("input#nombre");
    const fechaIn = document.querySelector("input#fecha-in");
    const fechaFin = document.querySelector("input#fecha-fin");
    const desc = document.querySelector("#descrip");
    console.log(nombre, fechaIn, fechaFin, desc)
    // comprobador
    const inputs = document.querySelectorAll("inputs.form-control")
    inputs.forEach(input => {
        if (input.value == "") {
            return
        }
    });

    const url = "http://localhost:3000/api/insertar";
    await fetch(url, {
        method: "post",
        headers: { "Content-Type": "application/json",},
        body: JSON.stringify({
            "nombre": nombre.value,
            "descripcion": desc.value,
            "fecha_inicio": fechaIn.value,
            "fecha_fin": fechaFin.value,
        })
    })
        .then(res => res.json())
        .then(msg => console.log(msg))

}   








