import express from 'express';


const router = express.Router();

router.get('/', (req, res) => { /* req => lo que envviamos res => la respuesta */
    res.render('inicio');
});
router.get('/nosotros', (req, res) => {

    const viajes = 'Viaje a Alemania';

    res.render('nosotros');
});

export default router;