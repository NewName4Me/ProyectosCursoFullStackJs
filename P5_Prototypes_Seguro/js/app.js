//region CONTRUCTORES
//constructores (toma los datos del formulario)
function Seguro(marca, year, tipoSeguro) {
    this.marca = marca;
    this.year = year;
    this.tipoSeguro = tipoSeguro;
}


/**
 * considero que la mejor forma de hacer esto es utilizando objetos que contengan una lista
 * de clave-valor en lugar de utilizar un switch o if else, pero para este ejemplo lo haremos así 
 */
//region COTIZAR SEGURO
Seguro.prototype.cotizarSeguro = function () {
    /* 
        1 = Americano 1.15
        2 = Asigatico 1.05    
        3 = Europeo   1.35  
    */

    let cantidad;
    let base = 2000;

    switch (this.marca) {
        case '1': cantidad = base * 1.15; break;
        case '2': cantidad = base * 1.05; break;
        case '3': cantidad = base * 1.35; break;
        default: ; break;
    }

    //leer el año(cade año que la diferencia es mayor, es costo le reduce un 3% el seguro)
    const diferencia = new Date().getFullYear() - this.year;
    cantidad -= ((diferencia * 3) * cantidad) / 100;

    /* 
        si el seguro es basico 30% más si es completo 50% más
    */
    if(this.tipoSeguro==='basico'){
        cantidad*=1.30;
    }else{
        cantidad*=1.50;
    }

    return cantidad;
}
//interfaz de usuario
function UI() { }

/**
 * prototype encargado de poner los años permitidos para los coches en nuestro formulario
 * 
 */
//region INTERESANTE (debajo)
/* si quitamos prototype es por asi decirlo un metodo estatico lo que estamos crendo
por lo que en el dom le poemos llamar sin instanciar a ui */
//region LLENAR YEAR FORM
UI.prototype.llenarOpcionesYear = function () {
    const max = new Date().getFullYear(),
        min = max - 20;

    const selectYear = document.querySelector('#year');

    for (let i = max; i > min; i--) {
        let option = document.createElement('option');
        option.value = i;
        option.text = i;
        selectYear.appendChild(option);
    }
}

//muestra alertas en pantalla
//region MOSTRAR MENSAJES
UI.prototype.mostrarMensaje = function (mensaje, tipo) {
    const MensajeSalida = document.createElement('div');
    if (tipo === 'error') {
        MensajeSalida.classList.add('error');
    } else {
        MensajeSalida.classList.add('correcto');
    }
    MensajeSalida.classList.add('mensaje', 'mt-10');
    MensajeSalida.textContent = mensaje;

    //insertar en el html
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.insertBefore(MensajeSalida, document.querySelector('#resultado'));

    setTimeout(() => {
        formulario.removeChild(MensajeSalida);
    }, 3000);
}


//region MOSTRAR RESULTADO
UI.prototype.mostrarResultado = function(seguro,total){

    const {marca,year,tipoSeguro} = seguro;
    let textoMarca;

    switch(marca){
        case '1':textoMarca='Americano';break;
        case '2':textoMarca='Asiatico';break;
        case '3':textoMarca='Europeo';break;
        default:break;
    }

    //crear el resultado
    const mensajeSalida = document.createElement('div');
    mensajeSalida.classList.add('mt-10');
    mensajeSalida.innerHTML = 
    `
        <p class="header">Tu Resumen</p>
        <p class="font-bold">Marca: <span class="font-normal"> $ ${marca}</span></p>
        <p class="font-bold">Año: <span class="font-normal"> $ ${year}</span></p>
        <p class="font-bold">Tipo de Poliza: <span class="font-normal capitalize"> $ ${tipoSeguro}</span></p>
        <p class="font-bold">Total: <span class="font-normal"> $ ${total}</span></p>
    `;

    const resultadoMensajeSaluda = document.querySelector('#resultado');

    //mostrar el spinner 
    const spinner = document.querySelector('#cargando');
    spinner.style.display = 'block';

    //ocultamos el spinner pero mostramos el resultado
    setTimeout(()=>{
        spinner.style.display='none';/* si haciamos un .remove() funciona correctamente pero el navegador manda error porque estamos trabjando con algo eliminado */
        resultadoMensajeSaluda.appendChild(mensajeSalida);
    },3000);

}

const ui = new UI();

//region DOMCONTENTLOADED
document.addEventListener('DOMContentLoaded', () => {
    ui.llenarOpcionesYear();
});

//region EVENT LISTENERS
eventListeners();
function eventListeners() {
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', cotizarSeguro);
}

//region COTIZAR SEGURO
function cotizarSeguro(e) {
    e.preventDefault();

    //leer marca
    const marca = document.querySelector('#marca').value;

    //leear año
    const year = document.querySelector('#year').value;

    //leer tipo Seguro
    const tipoSeguro = document.querySelector('input[name="tipo"]:checked').value;

    if (marca === '' || year === '' || tipoSeguro === '') {
        ui.mostrarMensaje('Rellena todos los campos', 'error');
        return; //si no se valida correctamente de aqui no pasa (basico de los return)
    }

    ui.mostrarMensaje('Cotizando', 'exito');

    //ocultar cotizaciones previas
    const restulados = document.querySelector('#resultado div');
    if(restulados != null){
        restulados.remove();
    }

    //instanciar el seguro
    const seguro = new Seguro(marca, year, tipoSeguro);
    const total = seguro.cotizarSeguro();

    //utilizar el prototype para mostrar el restulado final
    ui.mostrarResultado(seguro,total);
}