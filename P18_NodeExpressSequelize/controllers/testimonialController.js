const guardarTestimonial = (req, res) => {
    const { nombre, correo, mensaje } = req.body;
    const errores = [];

    if (nombre === '') errores.push({ mensaje: 'Nombre Vacio' })
    if (correo === '') errores.push({ mensaje: 'Correo Vacio' })
    if (mensaje === '') errores.push({ mensaje: 'Mensaje Vacio' })

    if (errores.length > 0) {
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            errores
        });
    }
};

export { guardarTestimonial };