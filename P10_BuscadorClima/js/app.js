const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima);
});

function buscarClima(e) {
    e.preventDefault();

    //Validar
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if (pais === '' || ciudad.trim() === '') {
        //hubo un error
        mostrarError('Ambos campos son obligatorios');
    }
}

function mostrarError(mensaje) {
    //prevenir multiples alertas
    const alertaSelector = document.querySelector('.bg-red-100');
    if (alertaSelector) return;

    //crear una alerta 
    const alerta = document.createElement('DIV');
    alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'text-center', 'mt-6');
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