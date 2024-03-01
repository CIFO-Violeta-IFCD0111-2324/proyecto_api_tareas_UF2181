
const addBtn = document.querySelector("button.btn.btn-light");

addBtn.addEventListener("click", insertSQL);

async function insertSQL() {
    const nombre = document.querySelector("form input.form-control:nth-of-type(1)");
    const fechaIn = document.querySelector("form input.form-control:nth-of-type(2)");
    const fechaFin = document.querySelector("form input.form-control:nth-of-type(3)");
    const desc = document.querySelector("form input.form-control:nth-of-type(4)");
    console.log(nombre, fechaIn, fechaFin, desc)
    // comprobador
    const inputs = document.querySelectorAll("inputs.form-control")
    inputs.forEach(input => {
        if (input.value == "") {
            return
        }
    });

    const url = "http://localhost:3000/insert";
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








