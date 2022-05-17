let usuario1 = localStorage.getItem("usuario_nuevo")
let contrasena1 = localStorage.getItem("contrasena_nueva")
const btn_iniciar = document.querySelector("#btn_iniciar")
const formulario = document.querySelector("#formingreso")



/* if (usuario1 == undefined){
    localStorage.setItem("usuario_nuevo","admin");
    usuario1 = localStorage.getItem("usuario_nuevo");
}
else {
    usuario1 = localStorage.getItem("usuario_nuevo");
} */
/* Se optimiza esto con operadores condicionales */
usuario1 == undefined && localStorage.setItem("usuario_nuevo","admin");
usuario1 = localStorage.getItem("usuario_nuevo");

/* if (contrasena1 == undefined){
    localStorage.setItem("contrasena_nueva","1234");
    contrasena1 = localStorage.getItem("contrasena_nueva");
}
else {
    contrasena1 = localStorage.getItem("contrasena_nueva");
} */

contrasena1 || localStorage.setItem("contrasena_nueva","1234");
contrasena1 = localStorage.getItem("contrasena_nueva");


const ingreso = (evt) => {
        evt.preventDefault()

        if (evt.target[0].value == usuario1 && evt.target[1].value == contrasena1) {
            console.log("Ingreso exitoso")
            location.href = "./paginas/home.html"
        }
        else if (evt.target[0].value == "" && evt.target[1].value == "") {
            let timerInterval
            Swal.fire({
                title: 'Error!',    
                text: 'Ingrese usuario y contraseña!',
                icon: 'error',
                timer: 3000,
                timerProgressBar: true,
                willClose: () => {
                    clearInterval(timerInterval)
                }
                }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                    console.log('I was closed by the timer')
                }
            })
        }
        else {
            let timerInterval
            Swal.fire({
                title: 'Error!',    
                text: 'Datos incorrectos',
                icon: 'question',
                timer: 3000,
                timerProgressBar: true,
                willClose: () => {
                    clearInterval(timerInterval)
                }
                }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                    console.log('I was closed by the timer')
                }
            })
        }
        evt.target[0].value
}

formulario.addEventListener("submit",ingreso)





