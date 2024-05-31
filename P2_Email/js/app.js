//me aseguro de que se desccargue todo el html antes de ejcutar nada
document.addEventListener('DOMContentLoaded', function () {
    //region VARIABLES
    const email = {
        email: '',
        asunto: '',
        mensaje: ''
    }

    //seleccionar los elementos de la iterfaz
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#btnEnviar');
    const btnReset = document.querySelector('#btnReset');
    const spinner = document.querySelector('#spinner');

    //asignar eventos
    inputEmail.addEventListener('input', validar);
    inputAsunto.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);
    formulario.addEventListener('submit', enviarEmail);

    //region SPINNER
    function enviarEmail(e) {
        e.preventDefault();
        spinner.classList.remove('hidden');
        
        //reiniciamos el formualrio tras un tiempo y ocultamos el spinner
        setTimeout(() => {
            spinner.classList.add('hidden');
            resetearFormulario();

            const alertaExisto=document.createElement('P');
            alertaExisto.classList.add('bg-green-500','text-center','p-2','text-white','rounded-lg','mt-10','Uppercase','font-bold','text-sm');
            alertaExisto.textContent='Mensaje enviado correctamente';
            formulario.appendChild(alertaExisto);

            setTimeout(()=>{
                formulario.removeChild(alertaExisto);
            },2000);
        }, 2000);
    }

    //region REINICIAR
    btnReset.addEventListener('click', (e) => {
        e.preventDefault();

        /* aunque visualmente al reiniciarllo se vea como que esta vacio, el objeto email no lo esta por lo que lo vaciamos
        a mano porque si no el boton de enviar sigue habilitado*/
        resetearFormulario();
    });

    /**
     * funciton que comprueba que han introducido correctamente los input
     * @param {*} e 
     * @returns 
     */
    //region VALIDAR FORMULARIO
    function validar(e) {
        //comprobamos si el input lo han dejado vacio
        if (e.target.value.trim() === '') {
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
            email[e.target.name] = ''; //lo reiniciamos porque aunque borraramos la informacion perduraba
            comprobarEmail(); //compruebo el email porque en caso de que rellenen y luego borren no de deshabilitaba el boton
            return;
        }

        if (e.target.id == 'email' && !validarEmail(e.target.value)) {
            mostrarAlerta(`El email no es valido`, e.target.parentElement);
            email[e.target.name] = ''; //lo reiniciamos porque aunque borraramos la informacion perduraba
            comprobarEmail();
            return;
        }

        limpiarAlerta(e.target.parentElement);

        //asignar los valores en caso de que pasemos las validaciones se ejecuta esto
        email[e.target.name] = e.target.value.trim().toLowerCase();

        //comprobar el objeto de email
        comprobarEmail();
    }

    /**
     * muestra una alerta cuando sucede algun error en nuestros input
     * @param {*} mensaje
     * @param {*} referencia sirve para indicar debajo de que input del formulario sale la alerta
     */
    //region MOSTRAR ALERTAS
    function mostrarAlerta(mensaje, referencia) {
        limpiarAlerta(referencia);//antes lo comprobabamos poniendo el codigo como tal, pero hacia lo mismo eso y limpiar alerta, es decir la misma comprobacion, por ende ahorramos asi por confuso que sea a primera vista

        //generar alerta en html
        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');

        //inyectar el error al formulario
        referencia.appendChild(error);
    }
    //region LIMPIAR ALERTAS
    function limpiarAlerta(referencia) {
        const alerta = referencia.querySelector('.bg-red-600');
        if (alerta) {
            alerta.remove();
        }
    }

    /**
     * funciona encargada de comprobar que el email dado es valido o no
     * @param {*} email 
     */
    //#region VALIDAR EMAIL
    function validarEmail(email) {
        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
        const resultado = regex.test(email);
        return resultado;
    }

    /**
     * esta funcion se encarga de comprobar que todo el formulario esta lleno 
     * correctamente y por tanto pueden darle al boton de enviar
     */
    //#region COMPROBAR EMAIL
    function comprobarEmail() {
        /*
        Nos devuelve false si todos los valores estan llenos o true si alguno no lo está
        console.log(Object.values(email).includes('')); */

        if (Object.values(email).includes('')) {
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
            return;
        }

        btnSubmit.classList.remove('opacity-50');
        btnSubmit.disabled = false;
    }

    //region RESETAR FORMULARIO
    function resetearFormulario(){
        //como repeti este codigo dos veces lo pongo aqui una vez y ahorro
        email.email = ''; email.asunto = ''; email.mensaje = '';
        comprobarEmail();
        formulario.reset();
    }
});