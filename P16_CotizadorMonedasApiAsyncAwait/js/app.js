//region Variables
const monedaSelect = document.querySelector('#moneda');
const criptoSelect = document.querySelector('#criptomonedas');
const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');

const objBusqueda = {
    moneda: '',
    criptomoneda: ''
}

//crear un Promise
const obtenerCriptomonedas = criptomonedas => new Promise(resolve => {
    resolve(criptomonedas);
});

//region DOM Loaded
document.addEventListener('DOMContentLoaded', () => {
    consultarCriptomonedas();

    formulario.addEventListener('submit', submitFormulario);

    criptoSelect.addEventListener('change', leerValor);
    monedaSelect.addEventListener('change', leerValor);
});

//region Consultar Cripto
async function consultarCriptomonedas() {
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';//10 monedas más populares

    /*  fetch(url)
         .then(respuesta => respuesta.json())
         .then(resultado => obtenerCriptomonedas(resultado.Data))
         .then(criptomonedas => selectCriptomonedas(criptomonedas)); */

    try {
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        const criptomonedas = await obtenerCriptomonedas(resultado.Data);
        selectCriptomonedas(criptomonedas);
    } catch (err) {
        console.log(err);
    }
}

//region Select Cripto
function selectCriptomonedas(criptomonedas = []) {
    criptomonedas.forEach(cripto => {
        const { FullName, Name } = cripto.CoinInfo;

        const option = document.createElement('OPTION');
        option.value = Name;
        option.textContent = FullName;
        criptoSelect.appendChild(option);
    });
}

//region Submit Form
function submitFormulario(e) {
    e.preventDefault();

    const { criptomoneda, moneda } = objBusqueda;
    if (criptomoneda === '' || moneda === '') {
        mostrarAlerta('Ambos campos son obligatorios');
    }

    //consultar la API con los resultados
    consultarApi();
}

//region Read Value
function leerValor(e) {
    objBusqueda[e.target.name] = e.target.value;
}

//region Consultar Api
async function consultarApi() {
    const { criptomoneda, moneda } = objBusqueda;
    const url = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${criptomoneda},ETH&tsyms=${moneda}`;

    mosstrarSpinner();

    /*     fetch(url)
            .then(respuesta => respuesta.json())
            .then(cotizacion => {
                mostrarCotizacionHTML(cotizacion[criptomoneda][moneda]);
            }) */

    try {
        const respuesta = await fetch(url);
        const cotizacion = await respuesta.json();
        mostrarCotizacionHTML(cotizacion[criptomoneda][moneda])
    } catch (err) {
        console.log(err);
    }
}

//region Show spinner()}
function mosstrarSpinner() {
    limpiarHTML(resultado);
    const spinner = document.createElement('div');
    spinner.classList.add('spinner');
    spinner.innerHTML = `
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
    `;

    resultado.appendChild(spinner);
}

//region Show Cotizacion
function mostrarCotizacionHTML(cotizacion) {
    limpiarHTML(resultado);
    const { criptomoneda, moneda } = objBusqueda;

    const precio = document.createElement('p');
    precio.classList.add('precio');
    precio.innerHTML = `1 ${criptomoneda} son ${cotizacion}${moneda}`;
    resultado.appendChild(precio);
}

//region Show Alerta
function mostrarAlerta(mensaje) {
    if (document.querySelector('.error')) return;

    const divMensaje = document.createElement('DIV');
    divMensaje.classList.add('error');
    divMensaje.textContent = mensaje;

    formulario.appendChild(divMensaje);

    setTimeout(() => {
        divMensaje.remove();
    }, 2500);
}

//region Limpiar HTML
function limpiarHTML(objeto) {
    while (objeto.firstChild) {
        objeto.removeChild(objeto.firstChild);
    }
}