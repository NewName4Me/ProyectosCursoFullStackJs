//region conectarDB
function conectarDB() {
    const openRequest = window.indexedDB.open('crm', 1);

    openRequest.onerror = function () {
        console.log('Hubo un error');
    }

    openRequest.onsuccess = function () {
        DB = openRequest.result;
        console.log('Db abierta correctamente');
    }
}

//region imprimir alerta
function imprimirAlerta(mensaje, tipo) {
    //impedir alertas duplicadas
    const alerta = document.querySelector('.alerta');
    if (alerta) return;

    //crear y mostrar alertar
    const divAlerta = document.createElement('DIV');
    divAlerta.textContent = mensaje;
    divAlerta.classList.add('px-4', 'py-3', 'rounded', 'max-w-lg', 'mx-auto', 'mt-6', 'text-center', 'border', 'alerta');

    if (tipo === 'error') {
        divAlerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700');
    } else {
        divAlerta.classList.add('bg-green-100', 'border-green-400', 'text-green-700');
    }

    formulario.appendChild(divAlerta);

    setTimeout(() => {
        divAlerta.remove();
    }, 2500);
}