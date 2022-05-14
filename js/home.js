let usuario1
let contrasena1
let op
let op2
let opModificar
let ingresado
let banco_filtrado
let banco_filtro
const nav_bar = document.querySelector("#opciones")
let nav_li = []
for (let i = 0; i < nav_bar.firstElementChild.children.length; i+=1) {
    let obj_list = {
        id: i,
        nombre: nav_bar.firstElementChild.children[i].textContent,
        obj: nav_bar.firstElementChild.children[i]
    }
    nav_li.push(obj_list)
}
const nav_container = document.querySelector('.navigator')

nav_container.addEventListener ('mouseover',() => {
    nav_container.classList = 'navigator-show'
})

nav_container.addEventListener ('mouseout',() => {
    nav_container.classList = 'navigator'
})


console.log(nav_li)  

nav_li[0].obj.addEventListener ("click",administrarCuentas) 
nav_li[1].obj.addEventListener ("click",generarToken) 
nav_li[2].obj.addEventListener ("click",invertirsiones) 
nav_li[3].obj.addEventListener ("click",controlGastos) 
nav_li[4].obj.addEventListener ("click",pagoServicios) 
nav_li[5].obj.addEventListener ("click",modificar)
nav_li[6].obj.addEventListener ("click",salir)




let menuPrincipal = (op) => {
    op= prompt(`Seleccione una opción.`)
    switch(op) {        
        case "2": 
            console.log("Generar Token")
            console.log(parseInt(Math.random()*1000000))
            menuPrincipal()
            break;
        case "3": 
            console.log("Inversiones")
            break;
        case "4": 
            console.log("Control de gastos")
            break;
        case "5": 
            console.log("Pago de servicios")
            break;
        case "6": 
            console.log("Modificar usuario y contraseña")
            modificar()
            break;
        case "7": 
            console.log("Salir")
            ingresado=false
            ingresar(usuario1,contrasena1)
            break;
        default: 
            console.log("Ingrese una opcion válida")
            menuPrincipal(op)
            break
    }
}

function administrarCuentas(op2) {
    console.log(`>1.Agregar cuenta. 
>2.Resumen de cuentas. 
>3.Eliminar cuenta.
>4.Ver cuenta
>7.Volver.`)
    op2= prompt(`Seleccione una opción.`)
    switch (op2) {
        case "1":
            agregarCuenta()
            console.log("Cuenta agregada correctamente")
            menuPrincipal()
            break;
        case "2":
            for (let index = 0; index < cuentas.length; index++) {
                console.log(cuentas[index]);
            }
            menuPrincipal()
            break;
        case "3":
            eliminarCuenta()
            break;
        case "4":
            for (let i = 0; i < cuentas.length; i++) {
                console.log(cuentas[i].banco);
            };
            banco_filtro= prompt("¿Qué cuenta desea ver?");
            banco_filtrado = cuentas.filter(x => x.banco == banco_filtro);
            console.log(banco_filtrado)
            break;    
        case "7":
            menuPrincipal()
            break;

        default:
            break;
    }
} 
function generarToken () {
    console.log("Generar Token")
    console.log(parseInt(Math.random()*1000000))
}

function invertirsiones(){
    console.log("funcion en desarrollo")
}

function controlGastos() {
    console.log("funcion en desarrollo")
}

function pagoServicios () {
    console.log("funcion en desarrollo")
}

function modificarUsuario (usuario) { 
    if (usuario!="") {
        usuario=prompt("Ingrese nuevo usuario")
        localStorage.setItem("usuario_nuevo",usuario)
        usuario1 = localStorage.getItem("usuario_nuevo")
        alert("Usuario modificado, vuelva a ingresar")
        location.href = "../index.html"
    }
    else {console.log("Ingrese al menos un caracter")}
}
function modificarContrasena (contrasena) { 
    if (contrasena!="") {
        contrasena=prompt("Ingrese nueva contraseña")
        localStorage.setItem("contrasena_nueva",contrasena)
        contrasena1=localStorage.getItem(contrasena_nueva)
        alert("Contraseña modificada, vuelva a ingresar")
        location.href = "../index.html"
    }
    else {console.log("Ingrese al menos un caracter")}
}

function salir () {
    location.href = "../index.html"
}


/* administrarCuentas = (op2) => {
    console.log(`>1.Agregar cuenta. 
>2.Resumen de cuentas. 
>3.Eliminar cuenta.
>4.Ver cuenta
>7.Volver.`)
    op2= prompt(`Seleccione una opción.`)
    switch (op2) {
        case "1":
            agregarCuenta()
            console.log("Cuenta agregada correctamente")
            menuPrincipal()
            break;
        case "2":
            for (let index = 0; index < cuentas.length; index++) {
                console.log(cuentas[index]);
            }
            menuPrincipal()
            break;
        case "3":
            eliminarCuenta()
            break;
        case "4":
            for (let i = 0; i < cuentas.length; i++) {
                console.log(cuentas[i].banco);
            };
            banco_filtro= prompt("¿Qué cuenta desea ver?");
            banco_filtrado = cuentas.filter(x => x.banco == banco_filtro);
            console.log(banco_filtrado)
            break;    
        case "7":
            menuPrincipal()
            break;

        default:
            break;
    }
} */
class cuenta {
    constructor(bancoNuevo1) {
        this.banco=bancoNuevo1
        this.alias=prompt("Ingrese Alias")
        this.saldo=prompt("Ingrese saldo en su cuenta")
    }
}
let cuentas=[]

let agregarCuenta = () => {
    let bancoNuevo = prompt("Ingrese banco nuevo");
    cuentas.push(new cuenta(bancoNuevo));
    console.log(cuentas);
};

function modificar(opModificar) {
    console.log("1. Modificar Usuario - 2. Modificar contraseña - 7. Volver al Menú principal")
    opModificar=prompt("Qué desea modificar?")
    switch (opModificar) {
        case "1":
            modificarUsuario()
            break;
        case "2":
            modificarContrasena()
            break;
        case "7":
            menuPrincipal()
            break;
        default:
            alert("Ingrese opcion válida")
            modificar()
            break;
    }
}
