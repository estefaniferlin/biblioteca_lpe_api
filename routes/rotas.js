const { Router } = require('express');

const { rotasAutores } = require('./rotasAutores');
const { rotasGeneros } = require('./rotasGeneros');
const { rotasLivros } = require('./rotasLivros');
const { login }  = require('../controllers/segurancaController');

const rotas = new Router();

rotas.route("/login").post(login);

rotas.use(rotasAutores);
rotas.use(rotasGeneros);
rotas.use(rotasLivros);

module.exports = rotas;