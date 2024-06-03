//#region VARIABLES
const carrito = document.querySelector('#carrito');
const contenedorCarrido = document.querySelector('#lista-carrito tbody');
const listaCursos = document.querySelector('#lista-cursos');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];

/* tenemos dentro del #carrito una tabla que contiene un tbody vacio que se va llenando dinamicamente
segun vayamos añadiendo cursos */
//#region EVENTOS
cargarEventListeners();
function cargarEventListeners() {
    //cuando agregamos un curso pulsando agregar
    listaCursos.addEventListener('click', agregarCurso);

    //elimina cursos del carruto
    carrito.addEventListener('click',eliminarCurso);

    //muestra los curso de localStorage
    document.addEventListener('DOMContentLoaded',()=>{
        articulosCarrito=JSON.parse(localStorage.getItem('carrito'))||[];
        carritoHTML();
    });
    
    //vaciar el carrito
    vaciarCarritoBtn.addEventListener('click',()=>{
        articulosCarrito = []; 
        limpiarHTML();
    });
}

//FUNCIONES
/**
 * elimina un curso del carrito
 */
//#region ELIMINAR
function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const cursoId=e.target.getAttribute('data-id');

        //aliminar del array por el id
        articulosCarrito=articulosCarrito.filter(curso=>curso.id!==cursoId);

        carritoHTML();
    }
}


/**
 * añade un curso a nuestra lista de cursos
 * @param {*} e 
 */
//#region AGREGAR
function agregarCurso(e) {
    /* console.log(e.target.classList); */

    e.preventDefault(); // para que no se vaya arriba al agregar algun elemento
    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

/**
 * extrae la informacion del curso cuando cliqueamos en añadir curos
 * @param {*} curso
 */
//#region LEER INFO CURSO
function leerDatosCurso(curso) {
    //crear un objeto con el contenido del curso actual
    const inforCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1,
    }

    //revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === inforCurso.id);
    if (existe) {
        //actualizamos la cantidad
        const cursos=articulosCarrito.map(curso => {
            if(curso.id===inforCurso.id){
                curso.cantidad++;
            }
            return curso;
        });
        articulosCarrito=[...cursos]
    } else {
        //agrega elementos al array de currito (tambien se puede con .push en lugar de spreadOperator)
        articulosCarrito = [...articulosCarrito, inforCurso];
    }

    carritoHTML();
}

/**
 * muestra el carrito de compras en el DOM
 */
//#region MOSTRAR CARRITO
function carritoHTML() {

    //limpiar el HTMl antes de mostrarlo para que no se repitan elementos
    limpiarHTML();

    articulosCarrito.forEach(curso => {
        const { imagen, titulo, precio, cantidad, id } = curso;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${imagen}" width="100"></td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td><a href="#" class="borrar-curso" data-id="${id}">x<td>
            `;

        //agrega el HTML del carrito en el tbody
        contenedorCarrido.appendChild(row);
    });

    //agregar a localStorage
    sincronizarStorage();
}

function sincronizarStorage(){
    localStorage.setItem('carrito',JSON.stringify(articulosCarrito));
}

/**
 * elimina los cursos del tbody
 */
//#region LIMPIAR
function limpiarHTML() {
    //esta forma de limpiar es muy lenta 
    /* contenedorCarrido.innerHTML = ''; */

    while (contenedorCarrido.firstChild) {
        contenedorCarrido.removeChild(contenedorCarrido.firstChild);
    }
}
