//region VARIABLES
const marca=document.querySelector('#marca');
const year=document.querySelector('#year');
const minimo=document.querySelector('#minimo');
const maximo=document.querySelector('#maximo');
const puertas=document.querySelector('#puertas');
const transmision=document.querySelector('#transmision');
const color=document.querySelector('#color');

//contenedor para los resultados
const resultado=document.querySelector('#resultado');

//para los años del select sin usar html
const yearMax=2020;/* new Date().getFullYear(); *///en nuestra db solo tenemos años hasta el 2020
const yearMin=yearMax-5;

const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: '',
};

//eventos
//region DOMCONTENTLOADED
document.addEventListener('DOMContentLoaded',()=>{
    mostrarAutos(autos);//muestra los autos de la base de  datos

    //llena las opcioens de años(se podria con html pero asi aprendemos)
    llenarSelect();
});

marca.addEventListener('change',(e)=>{
    datosBusqueda.marca=e.target.value;
    filtrarAuto();
});
year.addEventListener('change',(e)=>{
    datosBusqueda.year=parseInt(e.target.value);
    filtrarAuto();
});
minimo.addEventListener('change',(e)=>{
    datosBusqueda.minimo=e.target.value;
    filtrarAuto();
});
maximo.addEventListener('change',(e)=>{
    datosBusqueda.maximo=e.target.value;
    filtrarAuto();
});
puertas.addEventListener('change',(e)=>{
    datosBusqueda.puertas=e.target.value;
    filtrarAuto();
});
transmision.addEventListener('change',(e)=>{
    datosBusqueda.transmision=e.target.value;
    filtrarAuto();
});
color.addEventListener('change',(e)=>{
    datosBusqueda.color=e.target.value;
    filtrarAuto();
});


//funciones
//region MOSTRAR ALL AUTOS
function mostrarAutos(autos){
    limpiarHTML();
    autos.forEach(auto=>{
        const autoHTML=document.createElement('P');
        const {marca,modelo,year,precio,puertas,color,transmision}= auto;
        autoHTML.textContent=`
            ${marca} ${modelo} - Año: ${year} - Precio: ${precio} - Puertas: ${puertas} - ${color} - ${transmision}
        `;

        //insertar en el html
        resultado.appendChild(autoHTML);
    });
}

/**
 * esta funciona se encarga de rellenar el selct con los años de forma automatica
 */
//region LLENAR AÑOS SELECT
function llenarSelect(){
    for(let i=yearMax;i>=yearMin;i--){
        const opcion=document.createElement('option');
        opcion.value = i; //a nivel visual esto no afecta pero importa para procesar la informacion puede que más tarde
        opcion.textContent = i;
        year.appendChild(opcion);
    }
}

//region LIMPIAR HTML
function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

//region FILTRAR
function filtrarAuto(){
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear);
    
    mostrarAutos(resultado);
}

function filtrarMarca(auto){ //el parametro auto se pasa automaticamente cuando lo llamas desde filtrarAuto()
    const {marca}=datosBusqueda;

    if(marca){ //comprobamos que no está vacio
        return auto.marca === marca;
    }
    return auto; //si no seleccionan nada les damos todos los automoviles
}

function filtrarYear(auto){ //el parametro auto se pasa automaticamente cuando lo llamas desde filtrarAuto()
    const {year}=datosBusqueda;

    if(year){ //comprobamos que no está vacio
        return auto.year === year;
    }
    return auto; //si no seleccionan nada les damos todos los automoviles
}