const url = 'http://localhost:3000/clientes';

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