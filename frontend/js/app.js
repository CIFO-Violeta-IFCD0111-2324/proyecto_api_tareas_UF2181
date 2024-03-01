
const addBtn = document.querySelector("button.btn.btn-light");

addBtn.addEventListener("click", insertSQL);

async function insertSQL() {
    const nombre = document.querySelector("div > input.form-control:nth-of-type(1)");
    const fechaIn = document.querySelector("div > input.form-control:nth-of-type(2)");
    const fechaFin = document.querySelector("div > input.form-control:nth-of-type(3)");
    const desc = document.querySelector("div > input.form-control:nth-of-type(4)");

    // comprobador
    const inputs = document.querySelectorAll("inputs.form-control")
    inputs.forEach(input => {
        if (input.value == "") {
            input.classList.add("input-mal")
        }
    });

    

}








