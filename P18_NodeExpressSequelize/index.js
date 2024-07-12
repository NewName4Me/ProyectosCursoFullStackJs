/* const express = require('express'); *//* sintaxis common js */
import express from 'express'; /* version de imports */
import router from './routes/index.js';

const app = express();

//definir puerto
const port = process.env.PORT || 4000;

/* habilitar PUG */
app.set('view engine', 'pug');

//crear nuestro propio middleware
//obtener el año actual
app.use((req, res, next) => {
    const year = new Date();
    res.locals.ActualYear = year.getFullYear();
    res.locals.nombresitio = "Agencia de Viajes";
    return next();
});

//definir la carpeta publica
app.use(express.static('public'));

//agregar router
app.use('/', router);//use soporta post,get,put ,delete, patch

app.listen(port, () => {
    console.log(`servidor corriendo en el puerto ${port}`);
});
