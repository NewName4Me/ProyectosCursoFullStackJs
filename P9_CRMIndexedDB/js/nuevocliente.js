//region IIFE
(function () {

    let DB;

    const formulario = document.querySelector('#formulario');

    document.addEventListener('DOMContentLoaded', () => {
        conectarDB();

        formulario.addEventListener('submit', validarCliente);
    });



    //region validar Form
    function validarCliente(e) {
        e.preventDefault();

        //leer todos los inputs
        const nombre = document.querySelector('#nombre').value;
        const email = document.querySelector('#email').value;
        const telefono = document.querySelector('#telefono').value;
        const empresa = document.querySelector('#empresa').value;

        if (nombre === '' || email === '' || telefono === '' || empresa === '') {
            imprimirAlerta('Todos los campos son obligatorios', 'error');
            return;
        }

        //crear un objeto con la información(object literal enhacenmente(destructuring al reves))
        const cliente = {
            nombre,
            email,
            telefono,
            empresa,
            id: Date.now()
        }

        crearNuevoCliente(cliente);
    }

    //region crear Cliente
    function crearNuevoCliente(cliente) {
        const transaction = DB.transaction(['crm'], 'readwrite');
        const objectStore = transaction.objectStore('crm');
        objectStore.add(cliente);

        transaction.onerror = function () {
            console.log('Error al añadir al cliente');
            imprimirAlerta('Email en uso', 'error');
        }
        transaction.oncomplete = function () {
            console.log('Cliente agregado');
            imprimirAlerta('Cliente agregado Correctamente', 'exito');

            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2500);
        }
    }


}());