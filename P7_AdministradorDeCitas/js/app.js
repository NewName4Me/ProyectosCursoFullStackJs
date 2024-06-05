//region + SELECTORES
const pacienteInput = document.querySelector('#paciente');
const propietarioInput = document.querySelector('#propietario');
const emailInput = document.querySelector('#email');
const fechaInput = document.querySelector('#fecha');
const sintomasInput = document.querySelector('#sintomas');

const formulario = document.querySelector('#formulario-cita');
const formularioSubmit = document.querySelector('#formulario-cita input[type="submit"]');

const contenedorCitas = document.querySelector('#citas');

let editando = false; //para detectar cuando estamos editando el valor de una cita 

//region ____Objetos de cita
const citaObj = {
    id: generarID(),
    paciente: '',
    propietario: '',
    email: '',
    fecha: '',
    sintomas: '',
};

//region + EVENTOS
pacienteInput.addEventListener('input', datosCita);
propietarioInput.addEventListener('input', datosCita);
emailInput.addEventListener('input', datosCita);
fechaInput.addEventListener('input', datosCita);
sintomasInput.addEventListener('input', datosCita);

formulario.addEventListener('submit', submitCita);
formulario.addEventListener('reset', limpiarObjetoCita);

//region + CLASES



//region ____Notificaciones
class Notificacion {
    constructor({ texto, tipo }) {
        this.texto = texto;
        this.tipo = tipo;

        this.mostrar();
    }

    mostrar() {
        const alerta = document.createElement('DIV');
        alerta.classList.add('text-center', 'w-full', 'p-3', 'text-white', 'my-5', 'alert', 'uppercase', 'font-bold', 'text-sm');

        //eliminar alertas duplicadas para que solo se muestre una
        const alertaPrevia = document.querySelector('.alert');
        alertaPrevia?.remove();

        //si el tipo es error agregamos una clase más
        this.tipo === 'error' ? alerta.classList.add('bg-red-500') : alerta.classList.add('bg-green-500');

        //mensaje de error
        alerta.textContent = this.texto;

        //agregar al DOM
        formulario.parentElement.insertBefore(alerta, formulario);

        //quitar despues de 3 segundos
        setTimeout(() => {
            alerta.remove()
        }, 3000);
    }
}

//region ____Admin Citas
class AdminCitas {
    constructor() {
        this.citas = []; //cada cita se agregaa a este array
    }

    agregarCita(cita) {
        this.citas = [...this.citas, cita];
        this.mostrarCitas();
    }

    editarCita(citaActualizada) {
        this.citas = this.citas.map(cita => cita.id === citaActualizada.id ? citaActualizada : cita);
        this.mostrarCitas();
    }

    eliminarCita(id) {
        this.citas = this.citas.filter(cita => cita.id !== id);
        this.mostrarCitas();
    }

    mostrarCitas() {
        //limpiar el HTML previo
        this.limpiarHTMLCitas();


        //comprobar si hay citas para mostrar o no mensaje
        if(this.citas.length ===0){
            contenedorCitas.innerHTML = ` <p class="text-xl mt-5 mb-10 text-center">No Hay Pacientes</p>`;
            return;
        }

        //generando las citas
        this.citas.forEach(cita => {
            const divCita = document.createElement('div');
            divCita.classList.add('mx-5', 'my-10', 'bg-white', 'shadow-md', 'px-5', 'py-10', 'rounded-xl', 'p-3');

            const paciente = document.createElement('p');
            paciente.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            paciente.innerHTML = `<span class="font-bold uppercase">Paciente: </span> ${cita.paciente}`;

            const propietario = document.createElement('p');
            propietario.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            propietario.innerHTML = `<span class="font-bold uppercase">Propietario: </span> ${cita.propietario}`;

            const email = document.createElement('p');
            email.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            email.innerHTML = `<span class="font-bold uppercase">E-mail: </span> ${cita.email}`;

            const fecha = document.createElement('p');
            fecha.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            fecha.innerHTML = `<span class="font-bold uppercase">Fecha: </span> ${cita.fecha}`;

            const sintomas = document.createElement('p');
            sintomas.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            sintomas.innerHTML = `<span class="font-bold uppercase">Síntomas: </span> ${cita.sintomas}`;

            //region ____//btn editar eliminar
            const btnEditar = document.createElement('button');
            btnEditar.classList.add('py-2', 'px-10', 'bg-indigo-600', 'hover:bg-indigo-700', 'text-white', 'font-bold', 'uppercase', 'rounded-lg', 'flex', 'items-center', 'gap-2', 'btn-editar');
            btnEditar.innerHTML = 'Editar <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>';

            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('py-2', 'px-10', 'bg-red-600', 'hover:bg-red-700', 'text-white', 'font-bold', 'uppercase', 'rounded-lg', 'flex', 'items-center', 'gap-2');
            btnEliminar.innerHTML = 'Eliminar <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';

            const clonCita = structuredClone(cita); /* esto es igual que  const clone = {...cita}*/
            btnEditar.onclick = () => cargarEdicion(clonCita);
            btnEliminar.onclick = () => this.eliminarCita(cita.id);

            const contenedorBotones = document.createElement('DIV');
            contenedorBotones.classList.add('flex', 'justify-between', 'mt-10');
            contenedorBotones.appendChild(btnEditar);
            contenedorBotones.appendChild(btnEliminar);

            // Agregar al HTML
            divCita.appendChild(paciente);
            divCita.appendChild(propietario);
            divCita.appendChild(email);
            divCita.appendChild(fecha);
            divCita.appendChild(sintomas);
            divCita.appendChild(contenedorBotones);
            contenedorCitas.appendChild(divCita);
        });
    }

    limpiarHTMLCitas() {
        while (contenedorCitas.firstChild) {
            contenedorCitas.removeChild(contenedorCitas.firstChild);
        }
    }
}


//region + FUNCIONES
/**
 * funcion que rellena nuestro objeto de cita con los datos del formulario
 * @param {*} e 
 */
//region ____datos cita
function datosCita(e) {
    citaObj[e.target.name] = e.target.value;
}

//region ____enviar cita
const citas = new AdminCitas();
function submitCita(e) {
    e.preventDefault();

    //comprobar que los campos estan rellenos (se puede con un super if larguisimo pero podemos hacerlo mejor con ArrayMethods)
    //usaremos algo llamada : "Object.values"

    //alerta de error
    if (Object.values(citaObj).some(valor => valor.trim() === '')) { //en lugar de some se puede includes('') - pero si dejan espacios no sirve
        new Notificacion({
            texto: 'Todos los campos son obligatorios',
            tipo: 'error',
        });
        return;
    }


    if (editando) {
        citas.editarCita({ ...citaObj });
        new Notificacion({
            texto: 'Actualizado Correctamente',
            tipo: 'exito',
        });

    } else {
        //almacenamos un copia de citaObj y no el original porque si no cada vez que añadamos una cita esta
        //reescribe a las anteriores 
        citas.agregarCita({ ...citaObj });

        //alerta de existo
        new Notificacion({
            texto: 'Paciente registrado',
            tipo: 'exito' //en realidad esto da igual porque solo comprobamos si da error
        });
    }

    formulario.reset(); //nota abajo (3)
    formularioSubmit.valor = 'Registrar Paciente';
    editando = false;
}

//region ____limpiarObjetoCita
function limpiarObjetoCita() {

    /*  citaObj.paciente = '';
     citaObj.propietario = '';
     citaObj.email = '';
     citaObj.fecha = '';
     citaObj.sintomas = ''; */

    //(que objeto quieres escribir, por cual lo quieres reeplazar)
    Object.assign(citaObj, {
        id: generarID(),
        paciente: '',
        propietario: '',
        email: '',
        fecha: '',
        sintomas: '',
    })
}

/**
 * cuando le dan a editar cita esta funcion se ejecuta que carga todos los datos de la cita de vuelta 
 * en el formulario para su nueva edicion
 * @param {*} cita 
 */
//region ____cargar edicion cita
function cargarEdicion(cita) {
    Object.assign(citaObj, cita);

    pacienteInput.value = cita.paciente;
    propietarioInput.value = cita.propietario;
    emailInput.value = cita.email;
    fechaInput.value = cita.fecha;
    sintomasInput.value = cita.sintomas;

    editando = true;

    formularioSubmit.valor = 'Actualizar Paciente';
}

//region ____generar id unico
function generarID() {
    return Math.random().toString(36).substring(2) + Date.now();
}




//region + ANOTACIONES
/* 

1)
Para el formulario podriamos hacer esto 5 veces : 
pacienteInput.addEventListener('input',(e)=>{
    citaObj.paciente = e.target.value;
});
pero es un coñazo tener tanto codigo repetido por lo que buscamos otra forma mas eficiente que detecte en que parte
del formulario estamos trabajando


2)
para prevenir tener alertas duplicadas utilizammos al principio 
//eliminar alertas duplicadas para que solo se muestre una
        const alertaPrevia = document.querySelector('.alert'); //alert la creo yo no es de tailwind
        if (alertaPrevia) {
            alertaPrevia.remove();
        }
pero ahora existe una cosa que es el encadenamiento opcional de javascript que esta muy bien


3)
a pesar de que haga un formulario reset la informacion se guarda y si siguen pulsando aunque se vea vacio no lo está
porque citaObj sigue lleno aunque el formulario no lo esté
*/