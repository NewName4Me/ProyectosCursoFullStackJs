//region Variables
const btnGuardarCliente = document.querySelector('#guardar-cliente');
const formulario = document.querySelector('.modal-body form');

let cliente = {
    mesa: '',
    hora: '',
    pedido: []
}

const categorias = {
    1: 'Comida',
    2: 'Bebidas',
    3: 'Postres',
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

    mostrarSecciones(); //mostrar las secciones
    obtenerPlatillos();  //obtener platillos api jsonserver
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

//region Get Platillos
function obtenerPlatillos() {
    /* const url = `localhost:4000/platillos` */
    const url = `https://raw.githubusercontent.com/NewName4Me/ProyectosCursoFullStackJs/master/P14_ApiRestaurante/js/db.json`;
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => mostrarPlatillos(resultado.platillos))
        .catch(err => console.log(err));
}

//region Show Platillos
function mostrarPlatillos(listaPlatillos) {
    const contenido = document.querySelector('.contenido');

    listaPlatillos.forEach(platillo => {
        const row = document.createElement('DIV');
        row.classList.add('row', 'py-3', 'border-top');

        const nombre = document.createElement('DIV');
        nombre.classList.add('col-md-4');
        nombre.textContent = platillo.nombre;

        const precio = document.createElement('DIV');
        precio.classList.add('col-md-3', 'fw-bold');
        precio.textContent = `$${platillo.precio}`;

        const categoria = document.createElement('DIV');
        categoria.classList.add('col-md-3');
        categoria.textContent = categorias[platillo.categoria];

        row.appendChild(nombre);
        row.appendChild(precio);
        row.appendChild(categoria);
        contenido.appendChild(row);
    });
}

//region limpiar HTML
function limpiarHTML(objecto) {
    while (objecto.firstChild) {
        objecto.removeChild(objecto.firstChild)
    }
}