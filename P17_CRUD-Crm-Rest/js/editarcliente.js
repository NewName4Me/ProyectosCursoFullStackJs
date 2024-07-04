import { obtenerCliente } from './API.js';

//region IIFE
(function () {

    //region Variables Formulario
    const nombreInput = document.querySelector('#nombre');
    const emailInput = document.querySelector('#email');
    const telefonoInput = document.querySelector('#telefono');
    const empresaInput = document.querySelector('#empresa');
    const idHiddenInput = document.querySelector('#id');

    //region DOMContentoLoaded
    document.addEventListener('DOMContentLoaded', async () => {
        const parametrosURL = new URLSearchParams(window.location.search);
        const idCliente = parametrosURL.get('id');

        const cliente = await obtenerCliente(idCliente);

        mostrarCliente(cliente);
    });

    //region Display Cliente
    function mostrarCliente(cliente) {
        const { nombre, empresa, email, telefono, id } = cliente;

        nombreInput.value = nombre;
        emailInput.value = email;
        empresaInput.value = empresa;
        telefonoInput.value = telefono;
        idHiddenInput.value = id;
    }
})();