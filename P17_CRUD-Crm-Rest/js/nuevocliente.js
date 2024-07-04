import { mostrarAlerta, validarObjeto } from './funciones.js';
import { nuevoCliente } from './API.js';

//region IIFE
(function () {

    //region Variables
    const formulario = document.querySelector('#formulario');
    formulario.addEventListener('submit', validarCliente);

    //region Validar Cliente
    function validarCliente(e) {
        e.preventDefault();

        const nombre = document.querySelector('#nombre').value;
        const email = document.querySelector('#email').value;
        const telefono = document.querySelector('#telefono').value;
        const empresa = document.querySelector('#empresa').value;

        /* object literal enhacenment */
        const cliente = { nombre, email, telefono, empresa };

        //comprobar si algun campo esta vacio
        if (validarObjeto(cliente)) {
            mostrarAlerta('Todos los campos son obligatorios')
            return;
        }

        //enviar Cliente a nuestra Api
        nuevoCliente(cliente);

        //resetar el formulario una vez pasada todas las validaciones
        formulario.reset();
    }
})();