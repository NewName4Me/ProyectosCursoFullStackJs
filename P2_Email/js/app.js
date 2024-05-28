//me aseguro de que se desccargue todo el html antes de ejcutar nada
document.addEventListener('DOMContentLoaded', function () {

    //seleccionar los elementos de la iterfaz
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario=document.querySelector('#formulario');

    //asignar eventos
    inputEmail.addEventListener('blur', validar);
    inputAsunto.addEventListener('blur', validar);
    inputMensaje.addEventListener('blur', validar);

    /**
     * funciton que comprueba que han introducido correctamente los input
     * @param {*} e 
     * @returns 
     */
    function validar(e) {
        //comprobamos si el input lo han dejado vacio
        if (e.target.value.trim() === '') {
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`,e.target.parentElement);
            return;
        }

        if(e.target.id=='email' && !validarEmail(e.target.value)){
            mostrarAlerta(`El email no es valido`,e.target.parentElement);
            return;
        }

        limpiarAlerta(e.target.parentElement);
    }

    /**
     * muestra una alerta cuando sucede algun error en nuestros input
     * @param {*} mensaje
     * @param {*} referencia sirve para indicar debajo de que input del formulario sale la alerta
     */
    function mostrarAlerta(mensaje, referencia){
        limpiarAlerta(referencia);//antes lo comprobabamos poniendo el codigo como tal, pero hacia lo mismo eso y limpiar alerta, es decir la misma comprobacion, por ende ahorramos asi por confuso que sea a primera vista

        //generar alerta en html
        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('bg-red-600','text-white','p-2','text-center');

        //inyectar el error al formulario
        referencia.appendChild(error);
    }

    function limpiarAlerta(referencia){
        const alerta = referencia.querySelector('.bg-red-600');
        if(alerta){
            alerta.remove();
        }
    }

    /**
     * funciona encargada de comprobar que el email dado es valido o no
     * @param {*} email 
     */
    function validarEmail(email){
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 
        const resultado = regex.test(email);
        return resultado;
    }
});