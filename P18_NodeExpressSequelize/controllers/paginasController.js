import { Viaje } from '../models/Viaje.js';

const paginaInicio = (req, res) => {
    res.render('inicio', {
        pagina: 'Inicio'
    });
};

const paginaNosotros = (req, res) => {
    res.render('nosotros', {
        pagina: 'Nosotros'
    });
};

const paginaViajes = async (req, res) => {

    //consultar base de datos
    const viajes = await Viaje.findAll();

    res.render('viajes', {
        pagina: 'Próximos Viajes',
        viajes,
    });
};

const paginaTestimonial = (req, res) => {
    res.render('testimoniales', {
        pagina: 'Testimoniales'
    });
};

//muestra un viaje por su slug
const paginaDetalleViaje = async (req, res) => {
    const { slug } = req.params;

    try {
        const viaje = await Viaje.findOne({ where: { slug } });
        res.render('viaje', {
            pagina: 'Informacion viaje',
            viaje
        })
    } catch (e) {
        console.log(e);
    }

    /* console.log(req.params.viaje); */
};

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimonial,
    paginaDetalleViaje
}