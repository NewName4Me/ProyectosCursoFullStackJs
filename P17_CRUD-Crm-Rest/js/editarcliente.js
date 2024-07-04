import { obtenerCliente, editarCliente } from './API.js';
import { validarObjeto, mostrarAlerta } from './funciones.js';
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

        //submit al formulario
        const formulario = document.querySelector('#formulario');
        formulario.addEventListener('submit', validarCliente);
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

    //region Validar Cliente
    function validarCliente(e) {
        e.preventDefault();

        /* object literal enhacenment */
        const cliente = {
            nombre: nombreInput.value,
            email: emailInput.value,
            telefono: telefonoInput.value,
            empresa: empresaInput.value,
            id: idHiddenInput.value,
        };

        //comprobar si algun campo esta vacio
        if (validarObjeto(cliente)) {
            mostrarAlerta('Todos los campos son obligatorios')
            return;
        }

        //reescribe el objeto
        editarCliente(cliente);
    }
})();