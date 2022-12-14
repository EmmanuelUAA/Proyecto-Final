const mongodb = require('../bd/conexion.js');
const ObjectId = require('mongodb').ObjectId;

//Función que listará todos los Productos existentes en la BD y los retornará en un JSON
const listaProductos = async (req, res, next) => {
    const result = await mongodb.getDb().db().collection('Pelicula').find();
    console.log('Trayendo Productos');
    console.log(result);
    result.toArray().then((Peliculas) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(Peliculas);
    });
};

const listaPorIdProducto = async (req, res, next) => {
    const prodId = parseInt(req.params.id);
   // console.log('ID',prodId);
    const result = await mongodb.getDb().db().collection('Pelicula').find({ id: prodId });
    console.log('Trayendo Producto');

    result.toArray().then((Peliculas) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(Peliculas[0]);
    });
};

const creaProducto = async (req, res, next) => {
    const datosProducto = {
        idP:req.body.idP,
        NombreP:req.body.NombreP,
        Genero:req.body.Genero,
        precio:req.body.precio,
        Reproducciones:req.body.Reproducciones
     };

    const response = await mongodb.getDb().db().collection('Pelicula').insertOne(datosProducto);

    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'Error al crear el Nuevo Producto.');
    }
};

const actualizaProducto = async (req, res, next) => {
    const prodId = parseInt(req.params.id);

    const datosProducto = {
        idP:req.body.idP,
        NombreP:req.body.NombreP,
        Genero:req.body.Genero,
        precio:req.body.precio,
        Reproducciones:req.body.Reproducciones
    };

    const response = await mongodb.getDb().db().collection('Pelicula').replaceOne({ id: prodId }, datosProducto);
    
    if (response.modifiedCount > 0) {
        res.status(200).json(response);
    } else {
        res.status(500).json(response.error || 'Error al Actualizar el Producto');
    }
};

const eliminaProducto = async (req, res, next) => {
    const prodId = parseInt(req.params.id);

    const response = await mongodb.getDb().db().collection('Pelicula').remove({ id: prodId }, true);

    if (response.deletedCount > 0) {
        res.status(200).json(response);
    } else {
        res.status(500).json(response.error || 'Error al Eliminar Contacto');
    }
};

module.exports = { listaProductos, listaPorIdProducto, creaProducto, actualizaProducto, eliminaProducto };