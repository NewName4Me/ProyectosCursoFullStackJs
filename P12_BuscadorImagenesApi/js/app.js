//region Variables
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');
const paginacionDiv = document.querySelector('#paginacion');


const registrosPorPagina = 20;
let totalPaginas;
let iterador;
let paginaActual = 1; //siempre partimos de la pagina 1

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

    buscarImagenes();
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
function buscarImagenes() {
    const termino = document.querySelector('#termino').value;

    const API_KEY = '44561483-815f678ecc162bb56735260a9';
    const url = `https://pixabay.com/api/?key=${API_KEY}&q=${termino}&per_page=${registrosPorPagina}&page=${paginaActual}`;

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => {
            totalPaginas = calcularPaginas(resultado.totalHits);
            mostrarImagenes(resultado.hits)
        });
}

//region Paginador
function* crearPaginador(total) {
    for (let i = 1; i <= total; i++) {
        yield i;
    }
}

//region Imprimir Paginador
function imprimirPaginador() {
    limpiarHTML(paginacionDiv);

    iterador = crearPaginador(totalPaginas);

    while (true) {
        const { value, done } = iterador.next();

        if (done) return;

        // Generates a button for each element in the generator
        const boton = document.createElement('BUTTON');
        boton.href = '#';
        boton.dataset.pagina = value;
        boton.textContent = value;
        boton.classList.add('siguiente', 'bg-yellow-400', 'px-4', 'py-1', 'mr-2', 'font-bold', 'rounded', 'mb-10');

        boton.onclick = () => {
            paginaActual = value;//se ajusta la pagina en la que estamos segun a cual le demos click
            buscarImagenes();
        }

        paginacionDiv.appendChild(boton);
    }
}


//region Show Images
function mostrarImagenes(imagenes) {
    limpiarHTML(resultado);
    // Iterar sobre la lista de imágenes y construir HTML
    imagenes.forEach(imagen => {
        const { previewURL, likes, views, largeImageURL } = imagen;

        resultado.innerHTML += `
            <div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-3 mb-4">
                <div class="bg-white h-full flex flex-col justify-between p-4">
                    <img class="w-full h-48 object-cover mb-4" src="${previewURL}">
                    <div class="flex-grow">
                        <p class="font-bold">${likes} <span class="font-light">Me gusta</span></p>
                        <p class="font-bold">${views} <span class="font-light">Veces vista</span></p>
                    </div>
                    <a class="w-full bg-blue-800 hover:bg-blue-500 text-white uppercase font-bold text-center rounded mt-5 p-2"
                        href="${largeImageURL}" target="_blank" rel="noopener noreferrer">
                        Ver imagen
                    </a>
                </div>        
            </div>
        `;
    });

    imprimirPaginador();
}





//region Calcular Paginas
function calcularPaginas(total) {
    return parseInt(Math.ceil(total / registrosPorPagina));
}

//region Limpiar HTML
function limpiarHTML(objeto) {
    while (objeto.firstChild) {
        objeto.removeChild(objeto.firstChild);
    }
}