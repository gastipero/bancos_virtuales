let usuario1
let contrasena1
let op
let op2
let opModificar
let ingresado
let banco_filtrado
let banco_filtro
let cuentasLS
let barra_de_progreso
let generador_token
let btnAgregarCuenta
let divAdministrarCuentas
let divInversiones
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
const cont_body = document.querySelector('.container-body')
const barra_progreso = document.querySelector('.progress')
const barra_progreso_azul = document.querySelector('.progress-bar')

nav_container.addEventListener ('mouseover',() => {
    nav_container.classList = 'navigator-show'
    nav_li[0].obj.addEventListener ("click", () => {limpiar(); administrarCuentas();limpiarBarra()})
    nav_li[1].obj.addEventListener ("click", () => {limpiar(); limpiarBarra(); generarToken()})
    nav_li[2].obj.addEventListener ("click", () => {limpiar(); inversiones(); limpiarBarra()})
    nav_li[3].obj.addEventListener ("click", () => {limpiar(); controlGastos(); limpiarBarra()})
    nav_li[4].obj.addEventListener ("click", () => {limpiar(); pagoServicios();limpiarBarra()})
    nav_li[5].obj.addEventListener ("click", () => {limpiar(); modificar();limpiarBarra()})
    nav_li[6].obj.addEventListener ("click", () => {limpiar(); salir();limpiarBarra()})
})

nav_container.addEventListener ('mouseout',() => {
    nav_container.classList = 'navigator'
})

function administrarCuentas(op2) {
    console.log(`>1.Agregar cuenta. 
>2.Resumen de cuentas. 
>3.Eliminar cuenta.
>4.Ver cuenta
>7.Volver.`)
    /* op2= prompt(`Seleccione una opción.`) */
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
    cont_body.innerHTML = "<li><ul>Agregar cuenta</ul><ul>Resumen de cuentas</ul></li>"
    cont_body.firstChild.classList="nav-cuentas"
    let ul_cuentas = cont_body.firstChild.children
    for (const item of ul_cuentas) {
        item.classList= "item-cuenta"
    }
    ul_cuentas[0].addEventListener ('click', () => {limpiarAdminCuenta(),agregarCuenta()})
    ul_cuentas[1].addEventListener ('click', () => {limpiarAdminCuenta(),resumenCuenta()})
} 
function generarToken () {
    let progreso = 0
    generarContenido()
    generador_token = setInterval(() =>  {
        generarContenido()
        }, 8000
        )
    function generarContenido () {
        cont_body.innerHTML = `<h2 class="Token">Token</h2><p class="Num-token">${parseInt(Math.random()*1000000)}</p>`
    }
    barra_de_progreso = setInterval (()=>{
        progreso = progreso + (1000/8000)
        if (progreso >= 100){
            progreso = 0
        }
        barra_progreso.style.display = "flex",
        barra_progreso_azul.setAttribute('style',`width: ${progreso}%`)
    },10)
}

function limpiarBarra () {
    barra_progreso.style.display = "none",
    clearInterval(barra_de_progreso)
    clearInterval(generador_token)
}

function inversiones(){
    cont_body.innerHTML = "<li><ul>Acciones</ul><ul>Criptomonedas</ul><ul>Monedas Extranjeras</ul></li>"
    cont_body.firstChild.classList="nav-inversiones"
    let ul_inversiones = cont_body.firstChild.children
    for (const item of ul_inversiones) {
        item.classList= "item-inversion"
    }
    ul_inversiones[0].addEventListener ('click', () => {limpiarInversiones()})
    ul_inversiones[1].addEventListener ('click', () => {limpiarInversiones(),inversionCripto()})
    ul_inversiones[2].addEventListener ('click', () => {limpiarInversiones()})
}

function controlGastos() {
    console.log("funcion en desarrollo")
}

function pagoServicios () {
    console.log("funcion en desarrollo")
}

function modificarUsuario (usuario) { 
    if (usuario!="") {
        /* agregar validación para ingresar usuario anterior */
        usuario=prompt("Ingrese nuevo usuario")
        localStorage.setItem("usuario_nuevo",usuario)
        usuario1 = localStorage.getItem("usuario_nuevo")
        Swal.fire({
            title: 'Éxito!',
            text: 'Usuario modificado exitosamente',
            icon: 'success',
            confirmButtonText: 'Ok'
          })
        location.href = "../index.html"
    }
    else {console.log("Ingrese al menos un caracter")}
}
function modificarContrasena (contrasena) { 
    if (contrasena!="") {
        /* agregar validación para ingresar contraseña anterior */
        contrasena=prompt("Ingrese nueva contraseña")
        localStorage.setItem("contrasena_nueva",contrasena)
        contrasena1=localStorage.getItem("contrasena_nueva")
        Swal.fire({
            title: 'Éxito!',
            text: 'Contraseña modificada exitosamente',
            icon: 'success',
            confirmButtonText: 'Ok'
          })
        location.href = "../index.html"
    }
    else {console.log("Ingrese al menos un caracter")}
}

function salir () {
    location.href = "../index.html"
}

function limpiar () {
    cont_body.innerHTML = ""
}


/* Agregar cuentas */

class cuenta {
    constructor(bancoNuevo1,aliasNuevo1,saldoBuevo1) {
        this.banco=bancoNuevo1
        this.alias=aliasNuevo1
        this.saldo=saldoBuevo1
        this.id =Date.now()
    }
}
let cuentas=[]

let agregarCuenta = () => {
    divAdministrarCuentas = document.createElement('div')
    divAdministrarCuentas.classList = "administrar-cuenta"
    cont_body.appendChild(divAdministrarCuentas)
    if(cont_body.children[2]){
        cont_body.children[2].remove()
    }
    divAdministrarCuentas.innerHTML='<form id="confirmaAgregarCuenta"><label for="agregar-banco">Banco</label><input type="text" name="agregar-banco" id="agregar-banco"><label for="agregar-alias">Alias</label><input type="text" name="agregar-alias" id="agregar-alias"><label for="agregar-saldo">Saldo</label><input type="text" name="agregar-saldo" id="agregar-saldo"><button type="submit">Ingresar</button><button type="reset">Borrar</button></form>'
    
    formAgregarCuenta = document.querySelector("#confirmaAgregarCuenta")
    function agregarBanco(evt){
        evt.preventDefault()
        let ingresoBanco = document.querySelector("#agregar-banco")
        let ingresoAlias = document.querySelector("#agregar-alias")
        let ingresoSaldo = document.querySelector("#agregar-saldo")
        if (!ingresoBanco.value || !ingresoAlias || !ingresoSaldo) {
            Swal.fire({
                title: 'Error',
                text: 'Debe completar todos los datos',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }
        else {
            let bancoNuevo = ingresoBanco.value;
            let aliasNuevo = ingresoAlias.value;
            let saldoNuevo = ingresoSaldo.value;
            localStorage.getItem('cuentasLS') && (cuentas = JSON.parse(localStorage.getItem('cuentasLS')))
            cuentas.push(new cuenta(bancoNuevo,aliasNuevo,saldoNuevo));
            localStorage.setItem('cuentasLS',JSON.stringify(cuentas))
            cuentasLS = JSON.parse(localStorage.getItem('cuentasLS'))
            console.log(cuentasLS)
            ingresoBanco.value = ""
            ingresoAlias.value = ""
            ingresoSaldo.value = ""
        }  
    }
    formAgregarCuenta.addEventListener("submit", agregarBanco)
};

function resumenCuenta (){
    divAdministrarCuentas = document.createElement('div')
    divAdministrarCuentas.classList = "administrar-cuenta"
    cont_body.appendChild(divAdministrarCuentas)
    cuentasLS = JSON.parse(localStorage.getItem('cuentasLS'));
    cuentasLS.forEach(cuentaFE => {
        let each_banco =document.createElement('li')
        each_banco.classList = "resumenBanco"
        each_banco.id = cuentaFE.id
        divAdministrarCuentas.appendChild(each_banco).innerHTML = `<ul>${cuentaFE.banco}</ul><ul>${cuentaFE.alias}</ul><ul>${cuentaFE.saldo}</ul><i class="fas fa-times" id="delete"></i>`
    });
    const eliminarElemento = document.querySelectorAll("#delete")
    eliminarElemento.forEach(cruz => {
        cruz.addEventListener ('click',borrarCuenta)
    });
    
}

function borrarCuenta (evt) {
    evt.preventDefault()
    console.log(evt.target.parentElement.id)
    const idResumen=evt.target.parentElement.id
    cuentasLS = cuentasLS.filter (cuentaFil => cuentaFil.id != idResumen)
    localStorage.setItem('cuentasLS',JSON.stringify(cuentasLS))
    limpiarAdminCuenta()
    resumenCuenta()
    

}

function limpiarAdminCuenta() {
    if (document.querySelector(".administrar-cuenta")) {
        let contenedor_admin_cuentas = document.querySelector(".administrar-cuenta")
        contenedor_admin_cuentas.remove()
    }
}

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


/* Inversiones - API */
let newSymbol = [];

async function agregarCryptoBinance (simboloFiltrado) {
    let URL = `https://api.binance.com/api/v3/ticker/24hr`
    await fetch(URL)
        .then ((res) => res.json())
        .then((result) => {
            result.forEach(simbolo => {
                if(simbolo.symbol == simboloFiltrado.toUpperCase()) {
                    newSymbol.push(simbolo)
                    console.log(newSymbol)
                    localStorage.setItem ('Symbols',JSON.stringify(newSymbol)) 
                    SymbolsLS=  JSON.parse(localStorage.getItem ('Symbols'))
                    escribirCrypto()
                }
            });            
        })
        .catch(err => console.log(err))

}

/* Intento hacer una actualización en los valores de la API */
function peticionBinance () {
    let URL = `https://api.binance.com/api/v3/ticker/24hr`
    fetch(URL)
        .then ((res) => res.json())
        .then((result) => {
            SymbolsLS =  JSON.parse(localStorage.getItem ('Symbols'))
            result.forEach(crypto => {
                SymbolsLS.forEach(cryptoLS => {
                    if (crypto.symbol == cryptoLS.symbol){
                        newCryptoLS= []
                        newCryptoLS.push(crypto)
                        console.log(newCryptoLS)
                    }})
            });
        })
        .catch(err => console.log(err))
}

function inversionCripto () { 
    divInversiones = document.createElement ('div')
    divInversiones.classList = 'div-inversiones'
    cont_body.appendChild(divInversiones)
    divInversiones.innerHTML =' <form id="formBuscaCrypto"><label for="buscarCrypto">Simbolo</label><input type="text" name="buscarCrypto" id="buscarCrypto"><button type="submit">Buscar</button>'
    let inputCrypto = document.querySelector("#buscarCrypto")
    let formCrypto = document.querySelector("#formBuscaCrypto")
    formCrypto.addEventListener('submit',encontrarCrypto)
    setInterval(() => {
        peticionBinance()
    }, 10000);
    if (localStorage.getItem ('Symbols')){
        SymbolsLS= JSON.parse(localStorage.getItem ('Symbols'))
        newSymbol=SymbolsLS
    }
    function encontrarCrypto (evt) {
        evt.preventDefault()
        console.log(inputCrypto.value)
        cryptoBuscada = inputCrypto.value
        agregarCryptoBinance(cryptoBuscada)
        inputCrypto.value=""
    }
    escribirCrypto()
}



function escribirCrypto () {
    divCryptos = document.createElement ('div')
    divCryptos.classList = 'tabla-cryptos'
    divInversiones.appendChild(divCryptos)
/*     console.log(SymbolsLS) */
    SymbolsLS.forEach(cryptomoneda => {
        let each_crypto = document.createElement ('li')
        each_crypto.classList = 'lista-cryptos'
        divCryptos.appendChild(each_crypto)
        each_crypto.innerHTML = `<ul>${cryptomoneda.symbol}</ul><ul>${cryptomoneda.lastPrice}</ul><ul>${cryptomoneda.priceChange}</ul><ul>${cryptomoneda.priceChangePercent}%</ul>` 
    });
}


function limpiarInversiones () {document.querySelector(".div-inversiones") && document.querySelector(".div-inversiones").remove()}