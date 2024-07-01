//region Variables
const btnGuardarCliente = document.querySelector('#guardar-cliente');
const formulario = document.querySelector('.modal-body form');

let cliente = {
    mesa: '',
    hora: '',
    pedido: []
}

btnGuardarCliente.addEventListener('click', guardarCliente);

//region Save Cliente
function guardarCliente() {
    const mesa = document.querySelector('#mesa').value;
    const hora = document.querySelector('#hora').value;

    //revisar si hay campos vacios
    const camposVacios = [mesa, hora].some(campo => campo === '');

    if (camposVacios) {
        mostrarAlerta('Todos los campos son obligatorios', formulario);
        return;
    }

    //rellenar objecto con datos dados
    cliente = { ...cliente, mesa, hora, }

    //ocultar modal
    const modalFomulario = document.querySelector('#formulario');
    const modalBootstrap = bootstrap.Modal.getInstance(modalFomulario);
    modalBootstrap.hide();

    //mostrar las secciones
    mostrarSecciones();
}

//region Show Alerta
function mostrarAlerta(mensaje, posicion) {
    const alertaExistente = document.querySelector('.invalid-feedback');
    if (alertaExistente) return;// impedir alertas repetidas

    const alerta = document.createElement('DIV');
    alerta.classList.add('invalid-feedback', 'd-block', 'text-center');
    alerta.textContent = mensaje;

    posicion.appendChild(alerta);

    setTimeout(() => {
        alerta.remove();
    }, 3000);
}

//region Show Secciones
function mostrarSecciones() {
    const seccionesOcultas = document.querySelectorAll('.d-none');
    seccionesOcultas.forEach(seccion => seccion.classList.remove('d-none'));
}