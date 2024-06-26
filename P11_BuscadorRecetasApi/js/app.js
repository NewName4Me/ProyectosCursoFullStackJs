//region VARIABLES
document.addEventListener('DOMContentLoaded', inicarApp);

//region INICAR APP
function inicarApp() {

    const resultado = document.querySelector('#resultado');

    const selectCategorias = document.querySelector('#categorias');
    if (selectCategorias) { //condicinal prevenir error en pagina de favoritos
        selectCategorias.addEventListener('change', selectCategoria);
        //region __Get Categorias
        obtenerCategorias();
    }
    const favoritosDiv = document.querySelector('.favoritos');
    if (favoritosDiv) {
        obtenerFavoritos();
    }

    const modal = new bootstrap.Modal('#modal', {});

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
            recetaImagen.alt = `Imagen de la receta ${strMealThumb ?? receta.titulo}`;
            recetaImagen.src = strMealThumb ?? receta.ima;

            const recetaCardBody = document.createElement('DIV');
            recetaCardBody.classList.add('card-body');

            const recetaHeading = document.createElement('H3');
            recetaHeading.classList.add('card-title', 'mb-3');
            recetaHeading.textContent = strMeal ?? receta.titulo;

            const recetaButton = document.createElement('BUTTON');
            recetaButton.classList.add('btn', 'btn-danger', 'w-100');
            recetaButton.textContent = 'Ver receta';
            /* recetaButton.dataset.bsTarget = "#modal";
            recetaButton.dataset.bsToggle = "modal"; */
            recetaButton.onclick = function () {
                seleccionarReceta(idMeal ?? receta.id)
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
    function seleccionarReceta(id) {
        const url = `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
        fetch(url)
            .then(respuesta => respuesta.json())
            .then(resultado => mostrarRecetaModal(resultado.meals[0]));
    }

    //region __Show Receta Modal
    function mostrarRecetaModal(receta) {
        const { idMeal, strInstructions, strMeal, strMealThumb } = receta;
        const modalTitle = document.querySelector('#modal .modal-title');
        const modalBody = document.querySelector('#modal .modal-body');

        modalTitle.textContent = strMeal;
        modalBody.innerHTML = `
            <img class = "img-fluid" src = "${strMealThumb}" alt="receta ${strMeal}"/>
            <h3 class = "my-3" >Instrucciones</h3>
            <p>${strInstructions}</p>
            <h3 class="my-3">Ingredientes y Cantidades</h3>
        `;

        const listGroup = document.createElement('UL');
        listGroup.classList.add('list-group');
        //mostrar cantidades e ingredientes
        for (let i = 1; i <= 20; i++) {
            if (receta[`strIngredient${i}`]) {
                const ingrediente = receta[`strIngredient${i}`];
                const cantidad = receta[`strMeasure${i}`];

                const ingredienteLi = document.createElement('LI');
                ingredienteLi.classList.add('list-group-item');
                ingredienteLi.textContent = `${ingrediente} - ${cantidad}`;

                listGroup.appendChild(ingredienteLi);
            }
        }

        modalBody.appendChild(listGroup);

        //botones de cerrar y favorito
        const modalFooter = document.querySelector('.modal-footer');
        limparHTML(modalFooter);

        //favorito
        const btnFavorito = document.createElement('BUTTON');
        btnFavorito.classList.add('btn', 'btn-danger', 'col');
        btnFavorito.textContent = existeStorage(idMeal) ? 'Eliminar Favorito' : 'Guardar Favorito';

        btnFavorito.onclick = function () {
            if (existeStorage(idMeal)) {
                eliminarFavorit(idMeal);
                btnFavorito.textContent = 'Guardar Favorito';
                mostrarToast('Eliminado correctamente');
                return;
            }
            agregarFavorito({
                id: idMeal,
                titulo: strMeal,
                ima: strMealThumb,
            });
            btnFavorito.textContent = 'Eliminar Favorito';
            mostrarToast('Agregado Correctamente');
        }

        //cerrar
        const btnCerrarModal = document.createElement('BUTTON');
        btnCerrarModal.classList.add('btn', 'btn-secondary', 'col');
        btnCerrarModal.textContent = 'Cerrar';

        btnCerrarModal.onclick = () => modal.hide();

        modalFooter.appendChild(btnFavorito);
        modalFooter.appendChild(btnCerrarModal);

        modal.show();
    }

    //region __Agregar Favorito
    function agregarFavorito(receta = {}) {
        const favoritos = JSON.parse(localStorage.getItem('favoritos')) ?? [];
        localStorage.setItem('favoritos', JSON.stringify([...favoritos, receta]));
    }

    //region __Eliminar Favorito
    function eliminarFavorit(id) {
        const favoritos = JSON.parse(localStorage.getItem('favoritos')) ?? [];
        const nuevosFavoritos = favoritos.filter(favorito => favorito.id !== id);
        localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos));
    }

    //region __Existe Storage
    function existeStorage(id) {
        const favoritos = JSON.parse(localStorage.getItem('favoritos')) ?? [];
        return favoritos.some(favorito => favorito.id === id);
    }

    //region __Show Toast
    function mostrarToast(mensaje) {
        const toastDiv = document.querySelector('#toast');
        const toastBody = document.querySelector('.toast-body');
        toastBody.textContent = mensaje;

        const toast = new bootstrap.Toast(toastDiv);
        toast.show();
    }

    //region __Get Favoritos
    function obtenerFavoritos() {
        const favoritos = JSON.parse(localStorage.getItem('favoritos')) ?? [];
        if (favoritos.length) {
            mostrarRecetas(favoritos);
            return;
        }
        const noFavoritos = document.createElement('P');
        noFavoritos.textContent = 'No hay favoritos';
        noFavoritos.classList.add('font-bold', 'text-center', 'fs-4', 'mt-5');
        resultado.appendChild(noFavoritos);

    }

    //region __Limpiar HTML
    function limparHTML(selector) {
        while (selector.firstChild) {
            selector.removeChild(selector.firstChild);
        }
    }
}