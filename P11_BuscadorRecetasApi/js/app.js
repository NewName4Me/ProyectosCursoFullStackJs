//region VARIABLES
document.addEventListener('DOMContentLoaded', inicarApp);

//region INICAR APP
function inicarApp() {

    const resultado = document.querySelector('#resultado');

    const selectCategorias = document.querySelector('#categorias');
    selectCategorias.addEventListener('change', selectCategoria);

    //region __Get Categorias
    obtenerCategorias();
    function obtenerCategorias() {
        const url = 'https://www.themealdb.com/api/json/v1/1/categories.php';
        fetch(url)
            .then(resultado => resultado.json())
            .then(categorias => mostrarCategorias(categorias.categories));
    }

    //region __Show Categorias
    function mostrarCategorias(categorias = []) {
        categorias.forEach(categoria => {
            const option = document.createElement('OPTION');
            const { strCategory } = categoria;
            option.value = strCategory;
            option.textContent = strCategory;
            selectCategorias.appendChild(option);
        });
    }

    //region __Select Categoria
    function selectCategoria(e) {
        const categoria = e.target.value;
        const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoria}`;

        fetch(url)
            .then(resultado => resultado.json())
            .then(resultado => mostrarRecetas(resultado.meals));
    }

    //region __Show Recetas
    function mostrarRecetas(recetas = []) {
        limparHTML(resultado);

        const heading = document.createElement('H2');
        heading.classList.add('text-center', 'text-black', 'my-5');
        heading.textContent = recetas.length ? ` Resultados:  ${recetas.length}` : 'No hay Resultados';
        resultado.appendChild(heading);

        recetas.forEach(receta => {
            const { idMeal, strMeal, strMealThumb } = receta;

            const recetaContenedor = document.createElement('DIV');
            recetaContenedor.classList.add('col-md-4');

            const recetaCard = document.createElement('DIV');
            recetaCard.classList.add('card', 'mb-4');

            const recetaImagen = document.createElement('IMG');
            recetaImagen.classList.add('card-img-top');
            recetaImagen.alt = `Imagen de la receta ${strMealThumb}`;
            recetaImagen.src = strMealThumb;

            const recetaCardBody = document.createElement('DIV');
            recetaCardBody.classList.add('card-body');

            const recetaHeading = document.createElement('H3');
            recetaHeading.classList.add('card-title', 'mb-3');
            recetaHeading.textContent = strMeal;

            const recetaButton = document.createElement('BUTTON');
            recetaButton.classList.add('btn', 'btn-danger', 'w-100');
            recetaButton.textContent = 'Ver receta';
            /* recetaButton.dataset.bsTarget = "#modal";
            recetaButton.dataset.bsToggle = "modal"; */
            recetaButton.onclick = function(){
                seleccionarReceta(idMeal)
            }

            //inyectar en el codigo HTML
            recetaCardBody.appendChild(recetaHeading);
            recetaCardBody.appendChild(recetaButton);

            recetaCard.appendChild(recetaImagen);
            recetaCard.appendChild(recetaCardBody);

            recetaContenedor.appendChild(recetaCard);

            resultado.appendChild(recetaContenedor);
        });
    }

    //region __Select Receta
    function seleccionarReceta(id){
        const url = `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
        fetch(url)
            .then(respuesta => respuesta.json())
            .then(resultado => mostrarRecetaModal(resultado.meals[0]));
    }

    //region Show Receta Modal
    function mostrarRecetaModal(receta){

    }

    //region __Limpiar HTML
    function limparHTML(selector) {
        while (selector.firstChild) {
            selector.removeChild(selector.firstChild);
        }
    }
}