export function mostrarAlerta(mensaje) {
    const alerta = document.querySelector('.bg-red-100');

    if (!alerta) {
        const alerta = document.createElement('P');
        alerta.classList.add('bg-red-100', 'rounded', 'text-red-700', 'px-4', 'py-3', 'max-w-lg', 'mx-auto', 'mt-6', 'text-center', 'border-red-400');
        alerta.innerHTML = `
            <strong class="font-bold">Error!</strong>
            <span class="block sm:inline">${mensaje}</span> 
        `;

        const formulario = document.querySelector('#formulario');
        formulario.appendChild(alerta);

        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }
}

//region Validar Objeto
export function validarObjeto(obj) {
    //Comprobar que todos los campos han sido rellenados
    return !Object.values(obj).every(input => input !== '');
}