// Importamos express 
const express = require("express");
const app = express();
// Importamos los paquetes necesarios
const axios = require('axios');
const chalk = require('chalk');
const moment = require('moment');
const uuid = require('uuid');
const _ = require('lodash');
// Levantamos el puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor Express iniciado en el puerto ${PORT}`);
});

const { v4: uuidv4 } = require('uuid');
const { Chalk } = require("chalk");



app.get('/', async (req, res) => {

    try {
        // 1. El registro de los usuarios debe hacerse con la API Random User usando axios para consultar la data.
        // Mostramos la API con AXIOS
        const response = await axios.get('https://randomuser.me/api/?results=11');
        const objectData = response.data;
        const userData = objectData.results;
        
        let usuarios = [];
        userData.forEach((user, index) => {
            
            const usuario = {
                id: uuidv4().slice(0, 6),
                nombre: user.name.first,
                apellido: user.name.last,
                genero: user.gender,
                timestamp: moment(user.registered.date).format('MMMM Do YYYY')
            };
            usuarios.push(usuario);
            console.log(chalk.bgWhite.blue(`id: ${uuidv4().slice(0, 6)} / ${user.name.title} ${user.name.first} ${user.name.last} / Fecha de Registro: ${usuario.timestamp} `));

        });
        // Por genero 
        usuarios = _.partition(usuarios, (usuario) => usuario.genero === 'male')
        let mensaje = `
            <h3>Hombres :</h3>
            <ol>
                ${usuarios[0].map(usuario => `<li>Nombre: ${usuario.nombre} - Apellido: ${usuario.apellido} - Id: ${usuario.id} - Fecha de registro: ${usuario.timestamp}</li>`).join('')}
            </ol>
            <h3>Mujeres :</h3>
            <ol>
                ${usuarios[1].map(usuario => `<li>Nombre: ${usuario.nombre} - Apellido: ${usuario.apellido} - Id: ${usuario.id} - Fecha de registro: ${usuario.timestamp}</li>`).join('')}
            </ol>
        `

        res.send(mensaje);

    } catch (error) {
        console.error('Mensaje de error: ', error);
        res.status(500).json({ error: 'Mensaje de error' });
    }
});