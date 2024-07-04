const url = 'http://localhost:3000/clientes';

//region Add Cliente
export const nuevoCliente = async cliente => {
    try {
        await fetch(url, {
            method: 'POST',
            body: JSON.stringify(cliente),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        //una vez se a completado la acción redirigimos al usuario
        window.location.href = 'index.html';
    } catch (err) {
        console.log(err);
    }
}

//region Get Clientes
export const obtenerClientes = async () => {
    try {
        const resultado = await fetch(url);
        const clientes = await resultado.json();
        return clientes;
    } catch (err) {
        console.log(err);
    }
}

//region Delete Cliente
export const eliminarCliente = async id => {
    try {
        await fetch(`${url}/${id}`, {
            method: 'DELETE'
        })
    } catch (err) {
        console.log(err);
    }
}

//region Get Cliente By Id
export const obtenerCliente = async id => {
    try {
        const resultado = await fetch(`${url}/${id}`);
        const cliente = resultado.json();
        return cliente;
    } catch (err) {
        console.log(err);
    }
}