let usuario1 = localStorage.getItem("usuario_nuevo")
let contrasena1 = localStorage.getItem("contrasena_nueva")
const btn_iniciar = document.querySelector("#btn_iniciar")
const formulario = document.querySelector("#formingreso")


if (usuario1 == undefined){
    localStorage.setItem("usuario_nuevo","admin");
    usuario1 = localStorage.getItem("usuario_nuevo");
}
else {
    usuario1 = localStorage.getItem("usuario_nuevo");
}
if (contrasena1 == undefined){
    localStorage.setItem("contrasena_nueva","1234");
    contrasena1 = localStorage.getItem("contrasena_nueva");
}
else {
    contrasena1 = localStorage.getItem("contrasena_nueva");
}

const ingreso = (evt) => {
        evt.preventDefault()

        if (evt.target[0].value == usuario1 && evt.target[1].value == contrasena1) {
            console.log("Ingreso exitoso")
            location.href = "./paginas/home.html"
        }
        else if (evt.target[0].value == "" && evt.target[1].value == "") {
            alert("Debe ingresar un usuario y contraseña")
        }
        else {
            console.log("Ingrese datos correctos")
        }
        evt.target[0].value
}

formulario.addEventListener("submit",ingreso)





