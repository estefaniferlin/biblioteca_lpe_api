const { pool } = require('../config');
const Genero = require('../entities/genero');

const getGenerosDB = async () => {
    try {
        const { rows } = await pool.query('SELECT * FROM generos ORDER BY nome');
        return rows.map((genero) => new Genero(genero.codigo, genero.nome));
    } catch (err) {
        throw "Erro: " + err;
    }
}

const addGeneroDB = async (body) => {
    try {
        const { nome } = body;
        const results = await pool.query(`INSERT INTO generos (nome)
        VALUES ($1) RETURNING codigo, nome`,[nome]);
        const genero = results.rows[0];
        return new Genero(genero.codigo, genero.nome)
    } catch (err) {
        throw "Erro: " + err;
    }
}

const updateGeneroDB = async (body) => {
    try {
        const { codigo, nome } = body;
        const results = await pool.query(`UPDATE generos SET nome = $2
        WHERE codigo = $1 RETURNING codigo, nome`,[codigo, nome]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`
        }
        const genero = results.rows[0];
        return new Genero(genero.codigo, genero.nome)
    } catch (err) {
        throw "Erro ao alterar: " + err;
    }
}

const deleteGeneroDB = async (codigo) => {
    try {        
        const results = await pool.query(`DELETE FROM generos
         WHERE codigo = $1 `,[codigo]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para ser removido`
        } else {
            return "Registro removido com sucesso";
        }
    } catch (err) {
        throw "Erro ao remover: " + err;
    }
}

const getGeneroPorCodigoDB = async (codigo) => {
    try {        
        const results = await pool.query(`SELECT * FROM generos
         WHERE codigo = $1 `,[codigo]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo}`
        } else {
            const genero = results.rows[0];
            return new Genero(genero.codigo, genero.nome)
        }
    } catch (err) {
        throw "Erro ao recuperar: " + err;
    }
}

module.exports = { getGenerosDB, addGeneroDB, updateGeneroDB, deleteGeneroDB, getGeneroPorCodigoDB } 