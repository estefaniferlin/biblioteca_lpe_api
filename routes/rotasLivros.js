const { Router } = require('express');

const { verificaJWT } = require('../controllers/segurancaController');

const { getLivros, addLivro, 
    updateLivro, deleteLivro, getLivroPorCodigo } 
    = require('../controllers/livroController');

const rotasLivros = new Router();

rotasLivros.route('/livro')
    .get(verificaJWT, getLivros)
    .post(verificaJWT, addLivro)
    .put(verificaJWT, updateLivro)

    rotasLivros.route('/livro/:codigo')
    .get(verificaJWT, getLivroPorCodigo)
    .delete(verificaJWT, deleteLivro)

module.exports = { rotasLivros };