const inputs=document.querySelectorAll("input");
const comentario=document.querySelector("textarea");
const aceptar=document.querySelector("button");
const output=document.querySelector("footer");

//Aceptar
console.log(aceptar);
aceptar.addEventListener("click",()=>{
    for (let i = 0; i < inputs.length; i++) {
        if(inputs[i].value==""){
            output.innerHTML="Al menos una casilla incompleta";
            return};
    };
    if(comentario.value==""){
        output.innerHTML="Escribe el comentario";
        return
    };

    const url="http://localhost:3000/insertar";
    
    fetch(url,{
        method:"post",
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify({
            "start":inputs[0].value,
            "deadline":inputs[1].value,
            "activity":inputs[2].value,
            "comentary":comentario.value

        })

    })
     .then(res=>res.json())
     .then(mensaje=>output.innerHTML=mensaje)
    //inputs.reset();
    //comentario.reset();


  
})