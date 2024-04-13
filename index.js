// Importamos express 
const express = require("express");
const app = express();
// Importamos los paquetes necesarios
const axios = require('axios');
const chalk = require('chalk')
const moment = require('moment')
const uuid = require('uuid');
const _ = require('lodash');
// Levantamos el puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor Express iniciado en el puerto ${PORT}`);
});


app.get('/', async(req, res) => {
try {
    // 1. El registro de los usuarios debe hacerse con la API Random User usando axios para consultar la data.
    // Mostramos la API con AXIOS
    const response = await axios.get('https://randomuser.me/api/?results=11');
    const objectData = response.data;
    const userData = objectData.results;
    console.log('Propiedad data del objeto response.data: ', userData);

    // Enviamos con send la informacion para que sea vista por el navegador, maquillada con etiquetas html
    res.send("todo ok");

} catch (error) {
    console.error('Mensaje de error: ', error);
    res.status(500).json({ error: 'Mensaje de error' });
}
});