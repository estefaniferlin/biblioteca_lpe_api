const { Router } = require('express');

const { verificaJWT } = require('../controllers/segurancaController');

const { getAutores, addAutor, 
    updateAutor, deleteAutor, getAutorPorCodigo } 
    = require('../controllers/autorController');

const rotasAutores = new Router();

rotasAutores.route('/autor')
    .get(verificaJWT, getAutores)
    .post(verificaJWT, addAutor)
    .put(verificaJWT, updateAutor)

rotasAutores.route('/autor/:codigo')
    .get(verificaJWT, getAutorPorCodigo)
    .delete(verificaJWT, deleteAutor)

module.exports = { rotasAutores };