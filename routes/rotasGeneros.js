const { Router } = require('express');

const { verificaJWT } = require('../controllers/segurancaController');

const { getGeneros, addGenero, 
    updateGenero, deleteGenero, getGeneroPorCodigo } 
    = require('../controllers/generoController');

const rotasGeneros = new Router();

rotasGeneros.route('/genero')
    .get(verificaJWT, getGeneros)
    .post(verificaJWT, addGenero)
    .put(verificaJWT, updateGenero)

    rotasGeneros.route('/genero/:codigo')
    .get(verificaJWT, getGeneroPorCodigo)
    .delete(verificaJWT, deleteGenero)

module.exports = { rotasGeneros };