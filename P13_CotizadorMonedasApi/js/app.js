//region Variables
const monedaSelect = document.querySelector('#moneda');
const criptoSelect = document.querySelector('#criptomonedas');
const formulario = document.querySelector('#formulario');

const objBusqueda = {
    moneda: '',
    criptoMoneda: ''
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
function consultarCriptomonedas() {
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';//10 monedas más populares

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => obtenerCriptomonedas(resultado.Data))
        .then(criptomonedas => selectCriptomonedas(criptomonedas));
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
}

//region Read Value
function leerValor(e) {
    objBusqueda[e.target.name] = e.target.value;
    console.log(objBusqueda);
}