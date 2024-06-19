//region VARIABLES
const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

//region LOAD
window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima);
});

//region BUSCAR CLIMA
function buscarClima(e) {
    e.preventDefault();

    //Validar
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if (pais === '' || ciudad.trim() === '') {
        //hubo un error
        mostrarError('Ambos campos son obligatorios');
    }

    //Consultar la API
    consultarApi(ciudad, pais);
}

//region MOSTRAR ERROR
function mostrarError(mensaje) {
    //prevenir multiples alertas
    if (container.querySelector('.error')) return;

    //crear una alerta 
    const alerta = document.createElement('DIV');
    alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'text-center', 'mt-6', 'error');
    alerta.innerHTML = `
        <strong class="font-bold">Error!</strong>
        <span class="block">${mensaje}</span>
    `;

    container.appendChild(alerta);

    //eliminar alerta al cabo de un tiempo
    setTimeout(() => {
        alerta.remove();
    }, 3000);
}

//region CONSULTAR API
function consultarApi(ciudad, pais) {
    const appID = '9ab000b03034987dd4fc7b7a035d07e6';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},{state code},${pais}&appid=${appID}`;

    spinner(); // Mostrar el spinner

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            LimpiarHTMl(); // Limpiar el HTML antes de mostrar nuevos resultados

            if (datos.cod === '404') {
                mostrarError('Ciudad No Encontrada');
                return;
            }

            mostrarClima(datos); // Mostrar los datos del clima
        });
}

//region MOSTRAR CLIMA
function mostrarClima(datos) {
    const { name, main: { temp, temp_max, temp_min } } = datos;

    const centigrados = (temp - 273.15).toFixed(2);
    const max = (temp_max - 273.15).toFixed(2);
    const min = (temp_min - 273.15).toFixed(2);

    const actual = document.createElement('p');
    actual.innerHTML = `${centigrados} ºC`;
    actual.classList.add('font-bold', 'text-6xl');

    const tempMax = document.createElement('p');
    tempMax.innerHTML = `Max: ${max} ºC`;
    tempMax.classList.add('text-2xl');

    const tempMin = document.createElement('p');
    tempMin.innerHTML = `Min: ${min} ºC`;
    tempMin.classList.add('text-2xl');

    const nombreCiudad = document.createElement('p');
    nombreCiudad.textContent = name;
    nombreCiudad.classList.add('text-center', 'text-white');

    const resultadoDiv = document.createElement('div');
    resultado.classList.add('text-center', 'text-white', 'text-6xl');
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMax);
    resultadoDiv.appendChild(tempMin);

    resultado.appendChild(resultadoDiv);
}

//region LIMPIAR HTML
function LimpiarHTMl() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

//region SPINNER
function spinner() {
    LimpiarHTMl();

    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-fading-circle');
    divSpinner.innerHTML = `
        <div class="sk-circle1 sk-circle"></div>
        <div class="sk-circle2 sk-circle"></div>
        <div class="sk-circle3 sk-circle"></div>
        <div class="sk-circle4 sk-circle"></div>
        <div class="sk-circle5 sk-circle"></div>
        <div class="sk-circle6 sk-circle"></div>
        <div class="sk-circle7 sk-circle"></div>
        <div class="sk-circle8 sk-circle"></div>
        <div class="sk-circle9 sk-circle"></div>
        <div class="sk-circle10 sk-circle"></div>
        <div class="sk-circle11 sk-circle"></div>
        <div class="sk-circle12 sk-circle"></div>
    `;

    resultado.appendChild(divSpinner);
}