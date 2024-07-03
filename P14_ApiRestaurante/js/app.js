//region Variables
const btnGuardarCliente = document.querySelector('#guardar-cliente');
const formulario = document.querySelector('.modal-body form');
const contenido = document.querySelector('#resumen .contenido');

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

        const inputCantidad = document.createElement('INPUT');
        inputCantidad.type = 'number';
        inputCantidad.min = 0;
        inputCantidad.value = 0;
        inputCantidad.id = `producto-${platillo.id}`;
        inputCantidad.classList.add('form-control');

        //region __ Detect Plato Agregado
        inputCantidad.onchange = () => { //para prevenir que se llame la funciona antes de agregar
            const cantidad = parseInt(inputCantidad.value);
            agregarPlatillo({ ...platillo, cantidad });
        };

        const agregarInput = document.createElement('DIV');
        agregarInput.classList.add('col-md-2');
        agregarInput.appendChild(inputCantidad);

        row.appendChild(nombre);
        row.appendChild(precio);
        row.appendChild(categoria);
        row.appendChild(agregarInput);
        contenido.appendChild(row);
    });
}

//region Add platillo
function agregarPlatillo(producto = {}) {
    let { pedido } = cliente;

    //Revisar que la cantidad sea mayor a 0
    if (producto.cantidad > 0) {
        //comprueba si el elemento ya existe 
        if (pedido.some(articulo => articulo.id === producto.id)) {
            //actualizar la cantidad
            const pedidoActualizado = pedido.map(articulo => {
                if (articulo.id === producto.id) {
                    articulo.cantidad = producto.cantidad;
                }
                return articulo;
            });

            //se asigne el nuevo array a cliente.pedido
            cliente.pedido = [...pedidoActualizado];
        } else {
            cliente.pedido = [...pedido, producto]
        }
    } else {
        //eliminar cuando la cantidad de elemento sea 0
        const resultado = pedido.filter(articulo => articulo.id !== producto.id);
        cliente.pedido = [...resultado];
    }

    //actualizar la lista de platillo pedidos
    actualizarResumen();
}

//region Update Resumen
function actualizarResumen() {
    limpiarHTML(contenido);

    const resumen = document.createElement('DIV');
    resumen.classList.add('col-md-6', 'card', 'py-5', 'px3', 'shadow');

    //infromacion de la mesa
    const mesa = document.createElement('P');
    mesa.textContent = 'Mesa: ';
    mesa.classList.add('fw-bold');

    const mesaSpan = document.createElement('SPAN');
    mesaSpan.textContent = cliente.mesa;
    mesaSpan.classList.add('fw-normal');

    //infromacion de la hora
    const hora = document.createElement('P');
    hora.textContent = 'Mesa: ';
    hora.classList.add('fw-bold');

    const horaSpan = document.createElement('SPAN');
    horaSpan.textContent = cliente.hora;
    horaSpan.classList.add('fw-normal');

    //informacion titulo seccion
    const heading = document.createElement('H3');
    heading.textContent = 'Platillos consumidos';
    heading.classList.add('my-4', 'text-center');

    //iterar sobre los pedidos del array
    const { pedido } = cliente;
    const grupo = document.createElement('UL');
    grupo.classList.add('list-group');

    pedido.forEach(articulo => {
        const { nombre, cantidad, precio, id } = articulo;

        const lista = document.createElement('LI');
        lista.classList.add('list-group-item');

        const nombreEl = document.createElement('H4');
        nombreEl.classList.add('my-4');
        nombreEl.textContent = nombre;

        const cantidadEl = document.createElement('P');
        cantidadEl.classList.add('fw-bold');
        cantidadEl.innerHTML = `Cantidad: <span class="fw-normal">${cantidad}</span>`;

        const precioEl = document.createElement('P');
        precioEl.classList.add('fw-bold');
        precioEl.innerHTML = `Precio: $<span class="fw-normal">${precio}</span>`;

        const subtotalEl = document.createElement('P');
        subtotalEl.classList.add('fw-bold');
        subtotalEl.innerHTML = `Subtotal: $<span class="fw-normal">${calcularSubtotal(precio, cantidad)}</span>`;

        //boton para eliminar
        const btnEliminar = document.createElement('BUTTON');
        btnEliminar.classList.add('btn', 'btn-danger');
        btnEliminar.textContent = 'Eliminar del Pedido';
        btnEliminar.onclick = () => eliminarProducto(id);

        //agregar elementos al LI
        lista.appendChild(nombreEl);
        lista.appendChild(cantidadEl);
        lista.appendChild(precioEl);
        lista.appendChild(subtotalEl);
        lista.appendChild(btnEliminar);

        //agregar lista al grupo principal
        grupo.appendChild(lista);
    });

    //appends
    mesa.appendChild(mesaSpan);
    hora.appendChild(horaSpan);

    resumen.appendChild(mesa);
    resumen.appendChild(hora);
    resumen.appendChild(heading);
    resumen.appendChild(grupo);

    contenido.appendChild(resumen);
}

//region Math Subtotal
function calcularSubtotal(precio, cantidad) {
    return precio * cantidad;
}

//region Delete Producto
function eliminarProducto(id) {
    const { pedido } = cliente;
    const pedidoActualizado = pedido.filter(articulo => articulo.id !== id);
    cliente.pedido = [...pedidoActualizado];

    limpiarHTML(contenido);
    actualizarResumen();
}

//region limpiar HTML
function limpiarHTML(objecto) {
    while (objecto.firstChild) {
        objecto.removeChild(objecto.firstChild)
    }
}