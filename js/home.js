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
let divModUsuario
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

function administrarCuentas() {
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
    divAdministrarCuentas.innerHTML='<form id="confirmaAgregarCuenta"><label for="agregar-banco" class="col-6 my-1">Banco</label><input type="text" name="agregar-banco" class="col-6 my-1" id="agregar-banco"><label class="col-6 my-1" for="agregar-alias">Alias</label><input type="text" name="agregar-alias" class="col-6 my-1" id="agregar-alias"><label for="agregar-saldo" class="col-6 my-1">Saldo</label><input type="text" name="agregar-saldo" class="col-6 my-1" id="agregar-saldo"><button type="submit" class="col-4 offset-2 mt-2">Ingresar</button><button type="reset" class="col-4 mt-2">Borrar</button></form>'
    
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

function modificar() {
    cont_body.innerHTML = "<li><ul>Modifcar usuario</ul><ul>Modificar contraseña</ul></li>"
    cont_body.firstChild.classList="nav-modcuentas"
    let ul_mod_cuentas = cont_body.firstChild.children
    for (const item of ul_mod_cuentas) {
        item.classList= "item-mod-cuenta"
    }
    ul_mod_cuentas[0].addEventListener ('click', () => {/* limpiarModCuenta(), */modificarUsuario()})
    ul_mod_cuentas[1].addEventListener ('click', () => {/* limpiarModCuenta(), */modificarContrasena()})
    divModUsuario = document.createElement ('div')
    divModUsuario.classList = 'modificar-usuario'
    cont_body.appendChild(divModUsuario)
}

function modificarUsuario () { 
    divModUsuario.innerHTML = '<form id="formModificarUsuario"><label for="modUsuario">Nuevo usuario</label><input type="text" name="modUsuario" id="modUsuario"><button type="submit">Modificar</button>'
    let inputUsuario = document.querySelector("#modUsuario")
    let formUsuario = document.querySelector("#formModificarUsuario")
    formUsuario.addEventListener('submit', (e)=>{
        e.preventDefault()
        if(!inputUsuario.value) {
            Swal.fire({
                title: 'Error!',
                text: 'Debe ingresar al menos un caracter',
                icon: 'error',
                confirmButtonText: 'Ok'
              })
        }
        else {
            localStorage.setItem("usuario_nuevo",inputUsuario.value)
            usuario1=inputUsuario.value
            inputUsuario.value = ""
            Swal.fire({
                title: 'Éxito!',
                text: 'Usuario modificado exitosamente',
                icon: 'success',
                confirmButtonText: 'Ok'
              })
              setTimeout(()=> {location.href = "../index.html"}, 2000)
        }
    }
    )
}

function modificarContrasena (contrasena) { 
    divModUsuario.innerHTML = '<form id="formModificarContrasena"><label for="modContrasena">Nueva contraseña</label><input type="text" name="modContrasena" id="modContrasena"><button type="submit">Modificar</button>'
    let inputContra = document.querySelector("#modContrasena")
    let formContra = document.querySelector("#formModificarContrasena")
    formContra.addEventListener('submit', (e)=>{
        e.preventDefault()
        if(!inputContra.value) {
            Swal.fire({
                title: 'Error!',
                text: 'Debe ingresar al menos un caracter',
                icon: 'error',
                confirmButtonText: 'Ok'
              })
        }
        else {
            localStorage.setItem("contrasena_nueva",inputContra.value)
            contrasena1=inputContra.value
            inputContra.value = ""
            Swal.fire({
                title: 'Éxito!',
                text: 'Contraseña modificada exitosamente',
                icon: 'success',
                confirmButtonText: 'Ok'
              })
              setTimeout(()=> {location.href = "../index.html"}, 2000)
        }
    }
    )
}

/* function limpiarModCuenta() {
    if (document.querySelector(".administrar-cuenta")) {
        let contenedor_admin_cuentas = document.querySelector(".administrar-cuenta")
        contenedor_admin_cuentas.remove()
    }
} */


/* Inversiones - API */
let newSymbol = [];

async function agregarCryptoBinance (simboloFiltrado) {
    let URL = `https://api.binance.com/api/v3/ticker/24hr`
    await fetch(URL)
        .then ((res) => res.json())
        .then((result) => {
            result.forEach(simbolo => {
                simbolo.id = Date.now()
                if(simbolo.symbol == simboloFiltrado.toUpperCase()) {
                    newSymbol.push(simbolo)
                    console.log(newSymbol)
                    localStorage.setItem ('Symbols',JSON.stringify(newSymbol)) 
                    SymbolsLS=  JSON.parse(localStorage.getItem ('Symbols'))
                }
            });            
        })
        .catch(err => console.log(err))

}

/* Actualización en los valores de la API */
function peticionBinance () {
    let URL = `https://api.binance.com/api/v3/ticker/24hr`
    fetch(URL)
        .then ((res) => res.json())
        .then((result) => {
            newCryptoLS= []
            SymbolsLS =  JSON.parse(localStorage.getItem ('Symbols'))
            result.forEach(crypto => {
                SymbolsLS.forEach(cryptoLS => {
                    if (crypto.symbol == cryptoLS.symbol){
                        crypto.id = cryptoLS.id
                        newCryptoLS.push(crypto)
                    }})
            });
            localStorage.setItem('Symbols',JSON.stringify(newCryptoLS))
        })
        .catch(err => console.log(err))
}

function inversionCripto () { 
    divInversiones = document.createElement ('div')
    divInversiones.classList = 'div-inversiones'
    cont_body.appendChild(divInversiones)
    divInversiones.innerHTML =' <form id="formBuscaCrypto"><label for="buscarCrypto">Simbolo</label><input type="text" name="buscarCrypto" id="buscarCrypto"><button type="submit">Agregar</button>'
    let inputCrypto = document.querySelector("#buscarCrypto")
    let formCrypto = document.querySelector("#formBuscaCrypto")
    formCrypto.addEventListener('submit',encontrarCrypto)
    if (localStorage.getItem ('Symbols')){
        SymbolsLS= JSON.parse(localStorage.getItem ('Symbols'))
        newSymbol=SymbolsLS
        peticionBinance()
        escribirCrypto()
    }
    function encontrarCrypto (evt) {
        evt.preventDefault()
        let existe=false
        console.log(inputCrypto.value)
        cryptoBuscada = inputCrypto.value
        SymbolsLS.forEach(elemento => {
            if (elemento.symbol == cryptoBuscada) {
                existe = true
            }             
        });
        if (!existe) {
            agregarCryptoBinance(cryptoBuscada)
        }
        else {
            Swal.fire({
                title: 'Error',
                text: 'Este par ya existe',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }
        
        inputCrypto.value=""
    }
    setInterval(() => {
        if (localStorage.getItem ('Symbols')){
            peticionBinance(),
            limpiarEscribirCrypto(),
            escribirCrypto()
        }
    }, 2000);
}



function escribirCrypto () {
    /*     console.log(SymbolsLS) */
    let titulosCrypto = document.createElement('li')
    titulosCrypto.classList = 'titulos-crypto'
    divInversiones.appendChild(titulosCrypto)
    titulosCrypto.innerHTML = `<ul>Simbolo</ul><ul>Último Precio</ul><ul>Cambio de precio 24hr</ul><ul>Cambio de precio 24hr (%)</ul>`
    divCryptos = document.createElement ('div')
    divCryptos.classList = 'tabla-cryptos'
    divInversiones.appendChild(divCryptos)
    SymbolsLS.forEach(cryptomoneda => {
        let each_crypto = document.createElement ('li')
        each_crypto.classList = 'lista-cryptos'
        each_crypto.id = cryptomoneda.id
        divCryptos.appendChild(each_crypto)
        each_crypto.innerHTML = `<ul>${cryptomoneda.symbol}</ul><ul>${cryptomoneda.lastPrice}</ul><ul>${cryptomoneda.priceChange}</ul><ul>${cryptomoneda.priceChangePercent}%</ul><i class="fas fa-times" id="delete1"></i>` 
    });
    const eliminarCrypto = document.querySelectorAll("#delete1")
    eliminarCrypto.forEach(cruz => {
        cruz.addEventListener ('click',borrarCrypto)
    }); 
}

function borrarCrypto (evt) {
    evt.preventDefault()
    console.log(evt.target.parentElement.id)
    const idCrypto=evt.target.parentElement.id
    SymbolsLS = SymbolsLS.filter (simFil => simFil.id != idCrypto)
    localStorage.setItem('Symbols',JSON.stringify(SymbolsLS))    
    newSymbol=SymbolsLS
}

function limpiarEscribirCrypto() {
    document.querySelector(".tabla-cryptos") && document.querySelector(".tabla-cryptos").remove()
    document.querySelector(".titulos-crypto") && document.querySelector(".titulos-crypto").remove()
}


function limpiarInversiones () {document.querySelector(".div-inversiones") && document.querySelector(".div-inversiones").remove()}