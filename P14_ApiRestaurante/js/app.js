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

    cliente = { ...cliente, mesa, hora, } //rellenar objecto con datos dados
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