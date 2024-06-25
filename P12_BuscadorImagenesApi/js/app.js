//region Variables
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

//region DOM Loaded
document.addEventListener('DOMContentLoaded', () => {
    formulario.addEventListener('submit', validarFormulario);
});

//region Validar Formulario
function validarFormulario(e) {
    e.preventDefault();

    const terminoBusqueda = document.querySelector('#termino').value;
    if (terminoBusqueda.trim() === '') {
        mostrarAlerta('Rellene el campo');
        return;
    }

    buscarImagenes(terminoBusqueda);
}

//region Show Alerta
function mostrarAlerta(mensaje) {
    if (document.querySelector('.error')) return;//prevenir multiples alertas

    const alerta = document.createElement('p');
    alerta.classList.add('bg-red-100', 'text-red-700', 'px-4', 'rounded', 'border-red-400', 'text-center', 'mt-6', 'error');
    alerta.innerHTML = `
         <strong class="font-bold">Error!</strong><br>
         <span class="block sm:inline">${mensaje}</span>
    `;
    formulario.appendChild(alerta);

    setTimeout(() => {
        alerta.remove();
    }, 2500);
}

//region Search Images
function buscarImagenes(termino) {
    const API_KEY = '44561483-815f678ecc162bb56735260a9';
    const url = `https://pixabay.com/api/?key=${API_KEY}&q=${termino}&per_page=100`;

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => mostrarImagenes(resultado.hits));
}

//region Show Images
function mostrarImagenes(imagenes) {
    limpiarHTML(resultado);
    //iterar sobre lista de imagenes y construir html
    imagenes.forEach(imagen => {
        const { previewURL, likes, views, largeImageURL } = imagen;

        resultado.innerHTML += `
            <div class="w-1/2 md:w-1/3 lg:w-1/4 p-3 mb-4">
                <div class="bg-white">
                    <img class="w-full" src="${previewURL}">
                    <div class="p-4">
                        <p class="font-bold">${likes} <span class="font-light">Me gusta</span></p>
                        <p class="font-bold">${views} <span class="font-light">Veces vista</span></p>

                        <a class="w-full bg-blue-800 hover:bg-blue-500 text-white uppercase font-bold text-center rounded mt-5 p-1"
                        href="${largeImageURL}" target="_blanck" rel="noopener noreferrer">
                            Ver imagen
                        </a>
                    </div>
                <div>        
            </div>
        `;
    });
}

//region Limpiar HTML
function limpiarHTML(objeto) {
    while (objeto.firstChild) {
        objeto.removeChild(objeto.firstChild);
    }
}