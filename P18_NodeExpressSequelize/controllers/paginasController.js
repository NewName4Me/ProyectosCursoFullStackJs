import { Viaje } from '../models/Viaje.js';
import { Testimoniales } from '../models/Testimoniales.js';

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

const paginaTestimonial = async (req, res) => {
    try {
        const testimoniales = await Testimoniales.findAll();
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            testimoniales
        });
    } catch (e) {
        console.log(e);
    }
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