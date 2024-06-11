//region IIFE
(function () {
    let DB;
    let idCliente;
    const nombreInput = document.querySelector('#nombre');
    const emailInput = document.querySelector('#email');
    const telefonoInput = document.querySelector('#telefono');
    const empresaInput = document.querySelector('#empresa');

    const formulario = document.querySelector('#formulario');

    document.addEventListener('DOMContentLoaded', () => {
        conectarDB();

        //actualiza el registro formulario
        formulario.addEventListener('submit', actualizarCliente);

        //verificar el ID de la URL
        const parametrosURL = new URLSearchParams(window.location.search);
        idCliente = parametrosURL.get('id')
        if (idCliente) {
            //region futuro asincrona
            /* esto es porque conectarse a la base de datos tarde y esto da fallo, lo arregla la asincronia cosa que aun on dimos, y tambien con promises */
            setTimeout(() => {
                obtenerCliente(idCliente);
            }, 100);
        }
    });

    //region obtener cliente
    function obtenerCliente(id) {
        const transaction = DB.transaction(['crm'], 'readwrite');
        const objectStore = transaction.objectStore('crm');

        const cliente = objectStore.openCursor();
        cliente.onsuccess = function (e) {
            const cursor = e.target.result;
            if (cursor) {
                if (cursor.value.id === Number(id)) {
                    llenarFormulario(cursor.value);
                }
                cursor.continue();
            }
        }
    }

    //region llenar formulario
    function llenarFormulario(datosCliente) {
        const { nombre, email, telefono, empresa } = datosCliente;

        nombreInput.value = nombre;
        emailInput.value = email;
        telefonoInput.value = telefono;
        empresaInput.value = empresa;
    }

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

    //region actualizar cliente
    function actualizarCliente(e) {
        e.preventDefault();

        if (nombreInput.value === '' || emailInput === '' || emailInput === '' || telefonoInput === '') {
            imprimirAlerta('Todos los campos son obligatorios', 'error');
            return;
        }

        /* actualiar cliente */
        const clienteaActualizado = {
            nombre: nombreInput.value,
            email: emailInput.value,
            empresa: empresaInput.value,
            telefono: telefonoInput.value,
            id: Number(idCliente),
        }

        const transaction = DB.transaction(['crm'], 'readwrite');
        const objectStore = transaction.objectStore('crm');
        objectStore.put(clienteaActualizado);

        transaction.oncomplete = function () {
            imprimirAlerta('Editado correctamente');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        }
        transaction.onerror = function () {
            imprimirAlerta('Hubo un error - Correo existente', 'error');
        }
    }
}());