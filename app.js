const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./bd/conexion.js');
const cors = require('cors');

const port = process.env.PORT || 3000;
const app = express();

app
    .use(bodyParser.json())
    .use(cors())
    .use((req, res, next) => {
        res.setHeader('Acces-Control-Allow-Origin', '*');
        next();    
    })
    .use('/', require('./routes'));

mongodb.initDb((e, mongodb) => {
    if (e) {
        console.log(e);
    } else {
        app.listen(port);
        console.log(`Conexión Exitosa en puerto: ${port}`);
    }
});