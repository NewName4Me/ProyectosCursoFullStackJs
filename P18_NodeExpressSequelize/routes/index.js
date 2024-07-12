import express from 'express';
import { paginaInicio, paginaNosotros, paginaViajes, paginaTestimonial } from '../controllers/paginasController.js';

const router = express.Router();

//esto era así al principio pero ajustamos al MVC
/* router.get('/', (req, res) => {
    res.render('inicio', {
        pagina: 'Inicio'
    });
}); */

router.get('/', paginaInicio);
router.get('/nosotros', paginaNosotros);
router.get('/viajes', paginaViajes);
router.get('/testimoniales', paginaTestimonial);

export default router;