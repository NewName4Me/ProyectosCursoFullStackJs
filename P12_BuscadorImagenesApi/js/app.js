//region Variables
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');
const API_KEY = '44561483-815f678ecc162bb56735260a9';

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